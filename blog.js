// ──────────────── GLOBAL POST STORAGE ────────────────
let posts = [];

// ──────────────── FETCH ARTICLES INDEX ────────────────
function loadArticles() {
  // Path updated to fetch from the "articles" subfolder
  fetch("articles/articles.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load articles index");
      return response.json();
    })
    .then(data => {
      posts = data;
      
      // Check for a direct link (e.g., blog.html?post=filename.md)
      const urlParams = new URLSearchParams(window.location.search);
      const postFile = urlParams.get('post');

      if (postFile) {
        // Match the filename from the URL to the file path in the JSON
        const postIndex = posts.findIndex(p => p.file.includes(postFile));
        if (postIndex !== -1) {
          renderPost(postIndex);
        } else {
          renderPostList();
        }
      } else {
        renderPostList();
      }
    })
    .catch(error => {
      document.getElementById("post-list").innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

// ──────────────── RENDER POST LIST ────────────────
function renderPostList() {
  const postList = document.getElementById("post-list");
  const contentDiv = document.getElementById("content");
  
  postList.style.display = "flex";
  contentDiv.innerHTML = "";
  postList.innerHTML = "";

  posts.forEach((post, index) => {
    const li = document.createElement("li");
    li.className = "post-preview";
    li.innerHTML = `
      <h2>${post.title}</h2>
      <p class="post-meta">${new Date(post.date).toDateString()}</p>
      <p>${post.summary}</p>
      <button class="btn primary" onclick="renderPost(${index})">Read More</button>
    `;
    postList.appendChild(li);
  });
}

// ──────────────── RENDER FULL POST ────────────────
function renderPost(index) {
  const post = posts[index];
  const contentDiv = document.getElementById("content");
  const postList = document.getElementById("post-list");

  postList.style.display = "none";
  contentDiv.innerHTML = `<p>Loading...</p>`;

  // Fetches the markdown file using the path from articles.json
  fetch(post.file)
    .then(response => {
      if (!response.ok) throw new Error("Could not find the article file");
      return response.text();
    })
    .then(markdown => {
      contentDiv.innerHTML = `
        <article class="full-post">
          <h1>${post.title}</h1>
          <p class="post-meta">${new Date(post.date).toDateString()}</p>
          <div class="post-body">${marked.parse(markdown)}</div>
          <button class="btn secondary" onclick="goBack()" style="margin-top:20px;">← Back to Articles</button>
        </article>
      `;
      // Update browser address bar without reloading
      const fileName = post.file.split('/').pop();
      window.history.pushState({}, '', `?post=${fileName}`);
    })
    .catch(error => {
      contentDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

function goBack() {
  window.history.pushState({}, '', window.location.pathname);
  renderPostList();
}

document.addEventListener("DOMContentLoaded", loadArticles);