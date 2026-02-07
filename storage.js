// storage.js
export function getStorage() {
  return document.querySelector("#tempMode").checked ? sessionStorage : localStorage;
}

export function saveTasks(tasks) {
  getStorage().setItem("tasks", JSON.stringify(tasks));
}

export function loadTasks() {
  const raw = JSON.parse(getStorage().getItem("tasks")) || [];
  // rehydrate into Task instances
  return raw.map(t => Object.assign(new Task(t.text, t.priority), t));
}
