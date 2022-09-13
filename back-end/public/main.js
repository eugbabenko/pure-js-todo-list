const getTodoList = () => {
  return fetch("http://localhost:3001/todos").then((r) => r.json());
};

//________________________________________________________

const formElement = document.querySelector("#form");
const inputElement = document.querySelector("#input");
const msgElement = document.querySelector("#msg");
const postsElement = document.querySelector("#posts");

let posts = [];

formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  formValidation();
  inputElement.value = "";
  inputElement.focus();
});

const formValidation = () => {
  if (inputElement.value === "") {
    msgElement.innerHTML = "Post cannot be blank";
  } else {
    msgElement.innerHTML = "";
    acceptData();
  }
};

const acceptData = () => {
  return fetch("http://localhost:3001/todos", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: inputElement.value }),
  }).then(() => loadPosts());
};

const displayPosts = (posts) => {
  postsElement.innerHTML = "";
  posts.map((x) => {
    return (postsElement.innerHTML += `
    <li id=${x.id} class="action">
      <p class="${x.isCompleted === true ? "task-title--done" : ""}">${
      x.title
    }</p>
      <span class="options">
        <img onClick="setDonePost(this)" src="img/check.png" alt="done">
        <img onClick="deletePost(this)" src="img/x.png" alt="delete">
      </span>
    </li>`);
  });
};

let deletePost = (e) => {
  const id = e.parentElement.parentElement.id;
  posts = posts.filter((el) => id !== el.id);
  deleteData(id);
};

let setDonePost = (e) => {
  const id = e.parentElement.parentElement.id;
  const post = posts.find((el) => el.id === id);
  post.isCompleted = !post.isCompleted;
  changeData(id, post);
};

const sendHttpRequest = (url, method = "GET", body) => {
  return fetch(url, { method, body }).then((response) => {
    return response.json();
  });
};

const loadPosts = () => {
  sendHttpRequest("http://localhost:3001/todos/", "GET").then(
    (responseData) => {
      posts = responseData;
      displayPosts(responseData);
    }
  );
};

const deleteData = (id) => {
  sendHttpRequest(`http://localhost:3001/todos/${id}`, "DELETE").then(() =>
    displayPosts(posts)
  );
};

const changeData = (id, post) => {
  fetch(`http://localhost:3001/todos/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then(() => displayPosts(posts));
};

loadPosts();
