// Render tasks
function renderTasks(taskArray = tasks) {
  list.innerHTML = "";
  taskArray.forEach((task, index) => {
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
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    // Edit button
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

    li.appendChild(delBtn);
    li.appendChild(editBtn);
    list.appendChild(li);
  });

  updateCounter(); // always update after rendering
}
