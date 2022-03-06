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
                               <div class="status">
                                <i class="fa-solid fa-check ${!task.completed ? "hidden" : ""}"></i>
                               </div>
                               <div class="task-text ${task.completed ? "completed" : ""}">${task.taskName}</div>
                             </div>
                             <div class="task-controls">
                              <div class="save hidden">
                                <span>save</span>
                              </div>
                              <div class="edit ${task.completed ? "non-active" : ""}">
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
    else if(e.target.classList.contains("status")) completeTask(e);
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
    const taskTextElement = e.target.parentElement.parentElement.children[0].children[1];
    if(!taskTextElement.classList.contains("completed")) {
      makeTaskEditable(e, true);
      showSaveBtn(e);
    }
  }

  function makeTaskEditable(e, editable) {
    const task = e.target.parentElement.parentElement;
    const taskTextField = task.firstChild.children[1];
    taskTextField.setAttribute("contenteditable", `${editable}`);
    // make the cursor at the end of the task text on edit
    const inputText = taskTextField.innerText;
    const range = document.createRange();
    const selection = document.getSelection();
    range.setStart(taskTextField.childNodes[0], inputText.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);

    taskTextField.focus();
  }

  function showSaveBtn(e) {
    e.target.parentElement.children[0].classList.remove("hidden");
  }

  /* Function factory to implement/mimic function overloading*/

  function createUpdateTaskInLocalStorageFunction(propertyName) {
    return function(taskId, propertyValue) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      if(propertyName == "taskName") {
        for(let i = 0; i < tasks.length; i++) {
          if(tasks[i].id == taskId)
            tasks[i].taskName = propertyValue;
        }
      }
      else if(propertyName == "taskStatus") {
        for(let i = 0; i < tasks.length; i++) {
          if(tasks[i].id == taskId)
            tasks[i].completed = propertyValue;
        }
      }
      localStorage.setItem("tasks", JSON.stringify(tasks));  
    }
  }

  let updateTaskNameInLocalStorage = createUpdateTaskInLocalStorageFunction("taskName");
  let updateTaskStatusInLocalStorage = createUpdateTaskInLocalStorageFunction("taskStatus");

  /* Save Task Logic */
  
  function saveTask(e) {
    const taskElement = e.target.parentElement.parentElement;
    makeTaskEditable(e, false);
    const newTaskName = taskElement.children[0].children[1].innerText;
    updateTaskNameInLocalStorage(taskElement.dataset.id, newTaskName);
    hideSaveBtn(e);
  }

  function hideSaveBtn(e) {
    e.target.parentElement.children[0].classList.add("hidden")
  }

  /* Complete Task Logic*/

  function completeTask(e) {
    const taskElement = e.target.parentElement.parentElement;
    const editBtn = e.target.parentElement.parentElement.children[1].children[1];
    disableBtn(editBtn);
    checkTask(e);
    updateTaskStatusInLocalStorage(taskElement.dataset.id, true);
    
  }

  function checkTask(e) {
    const checkMark = e.target.children[0];
    checkMark.classList.remove("hidden");
    const taskTextElement = e.target.parentElement.children[1];
    taskTextElement.classList.add("completed");
  }

  function disableBtn(btn) {
    btn.classList.add("non-active");
  }

})();
