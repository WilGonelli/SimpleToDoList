// First commit
const dropboxBtn = document.getElementById("dropbox-btn");
const dropboxList = document.getElementById("dropbox-list");
const formSubmit = document.getElementById("submit");
const inputName = document.getElementById("input-name");
const inputDescription = document.getElementById("input-description");
const inputDate = document.getElementById("input-date");

const taskList = [];

let status = null;
let taskName = null;
let taskDescription = null;
let taskDate = null;

dropboxBtn.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  dropboxList.classList.toggle("show");
});

dropboxList.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.localName === "li") {
    status = event.target.textContent;
    dropboxBtn.innerText = status;
  }
});

formSubmit.addEventListener("click", function (event) {
  event.preventDefault();
  taskName = inputName.value;
  taskDescription = inputDescription.value;
  taskDate = inputDate.value;

  if (!taskName || !taskDescription || !taskDate || !status) {
    alert("need all fields");
  } else {
    taskList.push({
      name: taskName,
      description: taskDescription,
      date: taskDate,
      status: status,
    });

    inputName.value = "";
    inputDescription.value = "";
    inputDate.value = "";
    dropboxBtn.innerText = "Select";
  }
  console.log(taskList);
});

window.addEventListener("click", function (event) {
  if (!event.target.matches(".dropbox-btn")) {
    if (dropboxList.classList.contains("show")) {
      dropboxList.classList.remove("show");
    }
  }
});
