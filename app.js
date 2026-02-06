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
