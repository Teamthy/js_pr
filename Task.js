// Task.js
export default class Task {
  constructor(text, priority = "low") {
    this.id = crypto.randomUUID();
    this.text = text.trim();
    this.completed = false;
    this.priority = priority;
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
