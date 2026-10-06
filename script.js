// First commit
// const formSubmit = document.getElementById("submit");
// Listening to the form 'submit' event rather than a button 'click' ensures standard keyboard submission (Enter key) works consistently
const taskForm = document.getElementById("task-form");
const inputName = document.getElementById("input-name");
const inputDescription = document.getElementById("input-description");
const containerList = document.getElementById("list-task");
// Added feedback container for accessible non-blocking error/success announcements (WCAG 3.3.1)
const formFeedback = document.getElementById("form-feedback");

const taskList = [];

// let taskName = null;
// let taskDescription = null;
// let taskDate = null;
// Scoping variables inside the submit handler prevents unnecessary global state leaks

/**
 * Escapes HTML entities to prevent Cross-Site Scripting (XSS) when rendering user input.
 * @param {string} str - Raw user input.
 * @returns {string} Sanitized string safe for DOM rendering.
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Displays an accessible status message to screen readers and visual users.
 * @param {string} message - Message to announce.
 * @param {"error" | "success"} type - Message severity type.
 */
function setFeedback(message, type = "error") {
  formFeedback.textContent = message;
  formFeedback.className = `feedback-message ${type}`;
}

/**
 * Clears the feedback message.
 */
function clearFeedback() {
  formFeedback.textContent = "";
  formFeedback.className = "feedback-message";
}

// formSubmit.addEventListener("click", function (event) {
// Using form 'submit' event guarantees native accessibility and keyboard Enter support
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // taskName = inputName.value;
  // taskDescription = inputDescription.value;
  // Trimming input values prevents whitespace-only inputs from passing validation
  const currentTaskName = inputName.value.trim();
  const currentTaskDescription = inputDescription.value.trim();

  // Reset accessibility invalid flags
  inputName.setAttribute("aria-invalid", "false");
  inputDescription.setAttribute("aria-invalid", "false");
  clearFeedback();

  // if (!taskName || !taskDescription) {
  //   alert("need all fields");
  // } else {
  // Replaced disruptive alert() with accessible inline validation and focus management (WCAG 3.3.1 / 3.3.3)
  if (!currentTaskName) {
    inputName.setAttribute("aria-invalid", "true");
    setFeedback("Please fill in the task name.", "error");
    inputName.focus();
    return;
  }

  if (!currentTaskDescription) {
    inputDescription.setAttribute("aria-invalid", "true");
    setFeedback("Please fill in the task description.", "error");
    inputDescription.focus();
    return;
  }

  taskList.push({
    name: currentTaskName,
    description: currentTaskDescription,
  });

  inputName.value = "";
  inputDescription.value = "";
  setFeedback("Task added successfully!", "success");

  refreshList(taskList);

  // Return focus to the primary input so keyboard users can continue adding tasks effortlessly
  inputName.focus();
});

const refreshList = (list) => {
  // Provide accessible empty-state message when no items exist
  if (list.length === 0) {
    containerList.innerHTML = `<li class="empty-message">No tasks registered yet.</li>`;
    return;
  }

  const htmlList = list
    .map((item, index) => {
      // return `
      // <li class="item-container" id="${index}">
      //     <p>
      //       Task name: <span>${item.name}</span>
      //     </p>
      //     <p>
      //       Description: <span>${item.description}</span>
      //     </p>
      // </li>
      // `;
      // Improved: prefix ID with 'task-', wrap in semantic <article>, use <h3> for screen reader rotor navigation, and escape text
      return `
        <li class="item-container" id="task-${index}">
          <article class="task-card">
            <h3 class="item-title">${escapeHtml(item.name)}</h3>
            <p class="item-description">${escapeHtml(item.description)}</p>
          </article>
        </li>
      `;
    })
    .join("");

  containerList.innerHTML = htmlList;
};

// Initial call to render accessible empty state on page load
refreshList(taskList);
