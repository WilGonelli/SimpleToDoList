// First commit
const formSubmit = document.getElementById("submit");
const inputName = document.getElementById("input-name");
const inputDescription = document.getElementById("input-description");
const containerList = document.getElementById("list-task");

const taskList = [];

let taskName = null;
let taskDescription = null;
let taskDate = null;

formSubmit.addEventListener("click", function (event) {
  event.preventDefault();
  taskName = inputName.value;
  taskDescription = inputDescription.value;

  if (!taskName || !taskDescription) {
    alert("need all fields");
  } else {
    taskList.push({
      name: taskName,
      description: taskDescription,
    });

    inputName.value = "";
    inputDescription.value = "";
    refreshList(taskList);
  }
});

const refreshList = (list) => {
  const htmlList = list
    .map((item, index) => {
      return `
      <li class="item-container" id="${index}">
          <p>
            Task name: <span>${item.name}</span>
          </p>
          <p>
            Description: <span>${item.description}</span>
          </p>
      </li>
    `;
    })
    .join("");

  containerList.innerHTML = htmlList;
};
