// app.js
import Task from "./Task.js";
import { saveTasks, loadTasks } from "./storage.js";
import { renderTasks } from "./render.js";

// State
let tasks = loadTasks();

// DOM references
const list = document.querySelector("#taskList");
const statsEl = document.querySelector("#stats");
const form = document.querySelector("#todo-form");
const input = document.querySelector("#task-input");

// Stats
function updateStats(tasks) {
  const stats = tasks.reduce(
    (acc, task) => {
      acc.total++;
      task.completed ? acc.completed++ : acc.active++;
      return acc;
    },
    { total: 0, completed: 0, active: 0 }
  );
  statsEl.textContent = `Total: ${stats.total}, Completed: ${stats.completed}, Active: ${stats.active}`;
}

// Add task
function addTask(text, priority = "low") {
  tasks.push(new Task(text, priority));
  saveTasks(tasks);
  renderTasks(tasks, list, updateStats);
}

// Form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") return;
  addTask(input.value);
  input.value = "";
});

// Initial render
renderTasks(tasks, list, updateStats);
