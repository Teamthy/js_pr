// render.js
import { saveTasks } from "./storage.js";

export function renderTasks(tasks, list, updateStats) {
  list.innerHTML = "";

  tasks.forEach(task => {
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

  updateStats(tasks);
}
