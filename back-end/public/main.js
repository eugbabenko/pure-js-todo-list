const formElement = document.querySelector("#form");
const inputElement = document.querySelector("#input");
const msgElement = document.querySelector("#msg");
const postsElement = document.querySelector("#posts");


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
    sendPostToServer();
  }
};

const sendPostToServer = () => {
  sendHttpRequest("http://localhost:3001/todos/", "POST", JSON.stringify({ title: inputElement.value })).then(
    () => loadPosts());
};


const displayPosts = (todos = []) => {
  postsElement.innerHTML = "";
  todos.map((x) => {
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
  makeDeletePostRequest(id);
};

let setDonePost = (e) => {
  const id = e.parentElement.parentElement.id;
  const checked = e.parentElement.previousElementSibling.classList.contains('task-title--done');
  makeChangePostRequest(id, {isCompleted:!checked})
  
};

const sendHttpRequest = (url, method = "GET", body) => {
  return fetch(url, { 
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body}).then((response) => {
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

const makeDeletePostRequest = (id) => {
  sendHttpRequest(`http://localhost:3001/todos/${id}`, "DELETE").then(() =>
    loadPosts()
  );
};

const makeChangePostRequest = (id, post) => {
  sendHttpRequest(`http://localhost:3001/todos/${id}`, "PUT", JSON.stringify(post)).then(() =>
    loadPosts()
  );
};

loadPosts();
