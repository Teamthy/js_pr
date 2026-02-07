// --------------------
// State
// --------------------
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


class Task {
  constructor(text, priority = "low") {
    this.id = crypto.randomUUID();
    this.text = text.trim();
    this.completed = false;
    this.priority = priority; // "low", "medium", "high"
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  editText(newText) {
    if (newText && newText.trim()) {
      this.text = newText.trim();
    }
  }

  setPriority(newPriority) {
    const valid = ["low", "medium", "high"];
    if (valid.includes(newPriority)) {
      this.priority = newPriority;
    }
  }
}

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
  <span class="priority">[${task.priority}]</span>
  <div class="actions">
    <button class="toggle-btn">${task.completed ? "Undo" : "✓"}</button>
    <button class="edit-btn">Edit</button>
    <button class="priority-btn">Priority</button>
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
  if (e.target.classList.contains("toggle-btn")) {
  task.toggleComplete();
}

if (e.target.classList.contains("edit-btn")) {
  const newText = prompt("Edit task:", task.text);
  task.editText(newText);
}

if (e.target.classList.contains("priority-btn")) {
  const newPriority = prompt("Set priority: low, medium, or high", task.priority);
  task.setPriority(newPriority);
}

  saveTasks();
  renderTasks();
});

// --------------------
// Add task (example)
// --------------------
function addTask(text, priority = "low") {
  tasks.push(new Task(text, priority));
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

document.querySelector("#show-high").addEventListener("click", () => {
  renderTasks(tasks.filter(t => t.priority === "high"));
});

document.querySelector("#show-medium").addEventListener("click", () => {
  renderTasks(tasks.filter(t => t.priority === "medium"));
});

document.querySelector("#show-low").addEventListener("click", () => {
  renderTasks(tasks.filter(t => t.priority === "low"));
});

loadTasks();
renderTasks();
