// ──────────────── GLOBAL POST STORAGE ────────────────
let posts = [];

// ──────────────── FETCH ARTICLES INDEX ────────────────
function loadArticles() {
  fetch("articles/articles.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load articles index");
      return response.json();
    })
    .then(data => {
      posts = data;
      renderPostList();
    })
    .catch(error => {
      document.getElementById("post-list").innerHTML = `<p>Error loading articles: ${error.message}</p>`;
    });
}

// ──────────────── RENDER POST LIST ────────────────
function renderPostList() {
  const postList = document.getElementById("post-list");
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
        <h1>${post.title}</h1>
        <p class="post-meta">${new Date(post.date).toDateString()}</p>
        <div class="post-body">${marked.parse(markdown)}</div>
        <button onclick="goBack()">← Back to Articles</button>
      `;
    })
    .catch(error => {
      contentDiv.innerHTML = `<p>Error loading post: ${error.message}</p>`;
    });
}

// ──────────────── GO BACK TO LIST ────────────────
function goBack() {
  document.getElementById("content").innerHTML = "";
  document.getElementById("post-list").style.display = "flex";
}

// ──────────────── INIT ────────────────
document.addEventListener("DOMContentLoaded", loadArticles);