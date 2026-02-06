// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// DOM elements
const form = document.querySelector("#todo-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");

// Render tasks
function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    // Toggle complete
    li.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // Delete button
    let delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent toggle
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") return;
  tasks.push({ text: input.value, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
});

// Initial render
renderTasks();
// Inside renderTasks, after creating li:
let editBtn = document.createElement("button");
editBtn.textContent = "Edit";
editBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  let newText = prompt("Edit task:", task.text);
  if (newText) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
});
li.appendChild(editBtn);
document.querySelector("#show-all").addEventListener("click", () => renderTasks());
document.querySelector("#show-completed").addEventListener("click", () => {
  renderTasks(tasks.filter(t => t.completed));
});
document.querySelector("#show-active").addEventListener("click", () => {
  renderTasks(tasks.filter(t => !t.completed));
});
function updateCounter() {
  let remaining = tasks.filter(t => !t.completed).length;
  document.querySelector("#counter").textContent = `${remaining} tasks left`;
}
function renderTasks(taskArray = tasks) {
  list.innerHTML = "";
  taskArray.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    // toggle complete
    li.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // delete button
    let delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}
document.querySelector("#show-all").addEventListener("click", () => {
  renderTasks(tasks);
});

document.querySelector("#show-completed").addEventListener("click", () => {
  let completedTasks = tasks.filter(t => t.completed);
  renderTasks(completedTasks);
});

document.querySelector("#show-active").addEventListener("click", () => {
  let activeTasks = tasks.filter(t => !t.completed);
  renderTasks(activeTasks);
});

