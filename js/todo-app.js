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
                              <div class="save hidden">
                                <span>save</span>
                              </div>
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
    else if(e.target.classList.contains("save")) saveTask(e);
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

  /* Edit Task Logic */ 

  function editTask(e) {
    makeTaskEditable(e, true);
    // updateTaskInLocalStorage(e, taskName); // use closue and function factories lesson concepts for function overloading (one for name and another for completed) 
    // the updateTaskInLocalStorage(e, taskName) function should be invoked inside saveTask(e) function
    showSaveBtn(e);
  }

  function makeTaskEditable(e, editable) {
    const task = e.target.parentElement.parentElement;
    const taskTextField = task.firstChild.children[1];
    taskTextField.setAttribute("contenteditable", `${editable}`);
    task.firstChild.children[1].focus();
    document.querySelector('.task').focus();
  }

  function showSaveBtn(e) {
    e.target.parentElement.children[0].classList.remove("hidden");
  }

  /* Save Task Logic */
  
  function saveTask(e) {
    const taskElement = e.target.parentElement.parentElement;
    makeTaskEditable(e, false);
    const newTaskName = taskElement.children[0].children[1].innerText;
    updateTaskInLocalStorage(taskElement.dataset.id, newTaskName);
    hideSaveBtn(e);
  }

  function updateTaskInLocalStorage(taskId, taskName) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for(let i = 0; i < tasks.length; i++) {
      if(tasks[i].id == taskId)
        tasks[i].taskName = taskName;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function hideSaveBtn(e) {
    e.target.parentElement.children[0].classList.add("hidden")
  }

})();
