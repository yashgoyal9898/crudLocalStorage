document.addEventListener('DOMContentLoaded', showTask);

let taskList;
if (localStorage.getItem('taskList') === null) {
  taskList = [];
} else {
  taskList = JSON.parse(localStorage.getItem('taskList'));
}

let editingIndex = -1; 

function showTask() {
  let html = "";

  taskList.forEach((element, index) => {
    html += `
      <li class="one-task">
        <span id="task-${index}">${element.Name}</span>
        <div class="actions">
            <button class="actions-btn edit-task" data-index="${index}">Edit</button>
            <button class="actions-btn delete-task" data-index="${index}">X</button>
        </div>
      </li>
    `;
  });

  document.querySelector('.task-list').innerHTML = html;

  const editButtons = document.querySelectorAll('.edit-task');
  editButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const indexToEdit = event.target.dataset.index;
      editTask(indexToEdit);
    });
  });

  const deleteButtons = document.querySelectorAll('.delete-task');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const indexToDelete = event.target.dataset.index;
      deleteTask(indexToDelete);
    });
  });
}

//todo Adding a task
document.getElementById('add-task').addEventListener('click', () => {
  let maintask = document.getElementById('task').value;
  if(maintask == '') {
    alert("write something");
  }
  else {
    if (editingIndex === -1) {
        taskList.push({
          Name: maintask
        });
      } else {
        taskList[editingIndex].Name = maintask;
        editingIndex = -1; 
        document.getElementById('add-task').textContent = 'Add Task'; 
      }
      localStorage.setItem("taskList", JSON.stringify(taskList));
      showTask();
      document.getElementById('task').value = "";
  }
});

function deleteTask(index) {
  taskList.splice(index, 1);
  localStorage.setItem('taskList', JSON.stringify(taskList));
  showTask(); 
}

function editTask(index) {
  const taskInput = document.getElementById('task');
  const addTaskButton = document.getElementById('add-task');
  addTaskButton.textContent = 'Update';
  taskInput.value = taskList[index].Name;
  editingIndex = index;
}
