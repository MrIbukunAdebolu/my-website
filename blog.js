// ──────────────── GLOBAL POST STORAGE ────────────────
let posts = [];

// ──────────────── FETCH ARTICLES INDEX ────────────────
function loadArticles() {
  fetch("articles.json") // Ensure this path matches your file structure
    .then(response => {
      if (!response.ok) throw new Error("Failed to load articles index");
      return response.json();
    })
    .then(data => {
      posts = data;
      
      // NEW: Check for a direct link in the URL
      const urlParams = new URLSearchParams(window.location.search);
      const postFile = urlParams.get('post');

      if (postFile) {
        // Find the index of the post that matches the filename in the URL
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
      document.getElementById("post-list").innerHTML = `<p>Error loading articles: ${error.message}</p>`;
    });
}

// ──────────────── RENDER POST LIST ────────────────
function renderPostList() {
  const postList = document.getElementById("post-list");
  const contentDiv = document.getElementById("content");
  
  // Reset visibility
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
      <button onclick="renderPost(${index})">Read More</button>
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

  fetch(post.file)
    .then(response => {
      if (!response.ok) throw new Error("Failed to load post");
      return response.text();
    })
    .then(markdown => {
      contentDiv.innerHTML = `
        <article class="full-post">
          <h1>${post.title}</h1>
          <p class="post-meta">${new Date(post.date).toDateString()}</p>
          <div class="post-body">${marked.parse(markdown)}</div>
          <button onclick="goBack()" class="back-btn">← Back to Articles</button>
        </article>
      `;
      // Optional: Update URL without reloading so 'Back' works better
      const newUrl = window.location.pathname + `?post=${post.file.split('/').pop()}`;
      window.history.pushState({path:newUrl}, '', newUrl);
    })
    .catch(error => {
      contentDiv.innerHTML = `<p>Error loading post: ${error.message}</p>`;
    });
}

// ──────────────── GO BACK TO LIST ────────────────
function goBack() {
  // Clear the URL parameter when going back
  const cleanUrl = window.location.pathname;
  window.history.pushState({path:cleanUrl}, '', cleanUrl);
  
  renderPostList();
}

// ──────────────── INIT ────────────────
document.addEventListener("DOMContentLoaded", loadArticles);