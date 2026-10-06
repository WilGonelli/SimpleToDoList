// First commit
const dropboxBtn = document.getElementById("dropbox-btn");
const dropboxList = document.getElementById("dropbox-list");
const formSubmit = document.getElementById("submit");
const inputName = document.getElementById("input-name");
const inputDescription = document.getElementById("input-description");
const inputDate = document.getElementById("input-date");
const containerList = document.getElementById("list-task");

const taskList = [];

let status = null;
let taskName = null;
let taskDescription = null;
let taskDate = null;

dropboxBtn.addEventListener("click", function (event) {
  console.log("aqui");
  event.preventDefault();
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
    refreshList(taskList);
  }
});

window.addEventListener("click", function (event) {
  if (!event.target.matches(".dropbox-btn")) {
    if (dropboxList.classList.contains("show")) {
      dropboxList.classList.remove("show");
    }
  }
});

const refreshList = (list) => {
  const htmlList = list
    .map((item) => {
      return `
      <div class="item-container">
        <div class="name-date">
          <p>
            Task name: <span>${item.name}</span>
          </p>
          <p>
            Due date: <span>${item.date}</span>
          </p>
        </div>
        <div class="name-date">
          <p>
            Description: <span>${item.description}</span>
          </p>
          <p>
            Status: <span>${item.status}</span>
          </p>
        </div>
      </div>
    `;
    })
    .join("");

  containerList.innerHTML = htmlList;
};
