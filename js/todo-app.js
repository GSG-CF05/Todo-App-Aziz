(function() {
	const addTaskBtn = document.querySelector('.add-task-btn');
	const inputField = document.querySelector('.task-input-field');
	const tasksList = document.querySelector('.tasks-list');

	/* Read Tasks from Local Storage on Page Load */

	document.addEventListener('DOMContentLoaded', readLocalStorage);

	function readLocalStorage() {
		if (localStorage.getItem('tasks')) {
			let tasks = JSON.parse(localStorage.getItem('tasks'));
			tasks.forEach((task) => appendTaskToPage(task));
		}
	}

	/* Add Task Logic */

	addTaskBtn.addEventListener('click', (e) => {
		e.preventDefault();
		if (inputField.value) {
			const taskName = inputField.value;
			inputField.value = '';
			addTask(taskName);
		}
	});

	function addTask(taskName) {
		const task = createTask(taskName);
		appendTaskToPage(task);
		saveTasktoLocalStorage(task);
	}

	function createTask(taskName) {
		return {
			taskName,
			id: Date.now(),
			completed: false
		};
	}

	function appendTaskToPage(task) {
		const taskElement = document.createElement('div');
		taskElement.classList.add('task');
		taskElement.innerHTML = `<div class="task-content">
                               <div class="status"></div>
                               <div class="task-text">${task.taskName}</div>
                             </div>
                             <div class="task-controls">
                              <div class="edit">
                                <i class="fa-solid fa-pen"></i>
                              </div>
                              <div class="delete">
                                <i class="fa-solid fa-trash"></i>
                              </div>
                           </div>`;
    taskElement.dataset.id = task.id;
		tasksList.appendChild(taskElement);
	}

	function saveTasktoLocalStorage(task) {
		let tasks = [];
		if (localStorage.getItem('tasks')) tasks = JSON.parse(localStorage.getItem('tasks'));
		tasks.push(task);
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

  /* Delete Task Logic */

  tasksList.addEventListener("click", (e) => {
    if(e.target.classList.contains("delete")) deleteTask(e);
    else if(e.target.classList.contains("edit")) editTask(e);
  });

  function deleteTask(e) {
    removeTaskFromPage(e);
    removeTaskFromLocalStorage(e.target.parentElement.parentElement.dataset.id);
  }

  function removeTaskFromPage(e) {
    e.target.parentElement.parentElement.remove();
  }

  function removeTaskFromLocalStorage(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter((task) => task.id != taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

})();
