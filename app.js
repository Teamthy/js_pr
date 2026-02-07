// --------------------
// State
// --------------------
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// --------------------
// DOM references
// --------------------
const list = document.querySelector("#taskList");
const statsEl = document.querySelector("#stats");

// --------------------
// Persistence
// --------------------
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// --------------------
// Rendering
// --------------------
function renderTasks(taskArray = tasks) {
  list.innerHTML = "";

  taskArray.forEach(task => {
    const li = document.createElement("li");
    li.dataset.id = task.id;
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <div class="actions">
        <button class="toggle-btn">✓</button>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">✕</button>
      </div>
    `;

    list.appendChild(li);
  });

  updateStats();
}

// --------------------
// Stats
// --------------------
function updateStats() {
  const stats = tasks.reduce(
    (acc, task) => {
      acc.total++;
      task.completed ? acc.completed++ : acc.active++;
      return acc;
    },
    { total: 0, completed: 0, active: 0 }
  );

  statsEl.textContent =
    `Total: ${stats.total}, Completed: ${stats.completed}, Active: ${stats.active}`;
}

// --------------------
// Task helpers
// --------------------
function findTaskById(id) {
  return tasks.find(task => task.id === id);
}

// --------------------
// Event delegation
// --------------------
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const taskId = li.dataset.id;
  const task = findTaskById(taskId);
  if (!task) return;

  // Toggle completion
  if (e.target.classList.contains("toggle-btn")) {
    task.completed = !task.completed;
  }

  // Delete task
  if (e.target.classList.contains("delete-btn")) {
    tasks = tasks.filter(t => t.id !== taskId);
  }

  // Edit task
  if (e.target.classList.contains("edit-btn")) {
    const newText = prompt("Edit task:", task.text);
    if (newText && newText.trim()) {
      task.text = newText.trim();
    }
  }

  saveTasks();
  renderTasks();
});

// --------------------
// Add task (example)
// --------------------
function addTask(text) {
  tasks.push({
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
  });

  saveTasks();
  renderTasks();
}

// Initial render
renderTasks();


function getStorage() {
  return document.querySelector("#tempMode").checked ? sessionStorage : localStorage;
}

function saveTasks() {
  getStorage().setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  tasks = JSON.parse(getStorage().getItem("tasks")) || [];
}
loadTasks();
renderTasks();
