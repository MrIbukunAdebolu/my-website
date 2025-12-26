let posts = [];

function loadArticles() {
  // Points to the json file inside the Career folder
  fetch("Career/career.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load vacancies index");
      return response.json();
    })
    .then(data => {
      posts = data;
      const urlParams = new URLSearchParams(window.location.search);
      const postFile = urlParams.get('post');

      if (postFile) {
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
      console.error(error);
      document.getElementById("post-list").innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

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
      <p>${post.summary || 'Click below to view details.'}</p>
      <button class="btn primary" onclick="renderPost(${index})">Read More</button>
    `;
    postList.appendChild(li);
  });
}

function renderPost(index) {
  const post = posts[index];
  const contentDiv = document.getElementById("content");
  const postList = document.getElementById("post-list");

  postList.style.display = "none";
  contentDiv.innerHTML = `<p>Loading...</p>`;

  fetch(post.file)
    .then(response => {
      if (!response.ok) throw new Error("Could not find the job description file");
      return response.text();
    })
    .then(markdown => {
      contentDiv.innerHTML = `
        <article class="full-post">
          <div class="post-body">${marked.parse(markdown)}</div>
          <button class="btn secondary" onclick="goBack()" style="margin-top:20px;">← Back to Open Positions</button>
        </article>
      `;
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