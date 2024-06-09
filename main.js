/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@fortawesome/fontawesome-free/js/all.js":
/*!**************************************************************!*\
  !*** ./node_modules/@fortawesome/fontawesome-free/js/all.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities */ \"./src/utilities.js\");\n/* harmony import */ var _fortawesome_fontawesome_free_js_all__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/fontawesome-free/js/all */ \"./node_modules/@fortawesome/fontawesome-free/js/all.js\");\n/* harmony import */ var _fortawesome_fontawesome_free_js_all__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_js_all__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nconst projectsContainer = document.querySelector('.projects-list');\nconst projectForm = document.querySelector('.projects-form');\nconst projectInput = document.querySelector('.projects-form-input');\nconst tasksContainer = document.querySelector('.todos');\nconst projectTitle = document.querySelector('.todos-title');\nconst pendingTasksCounter = document.querySelector('.todos-count');\nconst projectDeleteButton = document.querySelector('.projects--delete-button');\n\nconst taskTemplate = document.getElementById('task-template');\nconst projectTasks = document.querySelector('.todos-all-tasks');\nconst taskForm = document.getElementById('todos-form');\nconst newTaskButton = document.querySelector('.todos-new-task-button');\nconst taskTitleElement = document.querySelector('.todos-input');\nconst taskDescriptionElement = document.getElementById('description');\nconst taskDueDateElement = document.getElementById('due-date');\nconst taskPriorityElement = document.getElementById('priority');\nconst taskCreatorElement = document.querySelector('.todos-creator');\nconst editTaskFormElement = document.getElementById('todos-edit-form');\nconst taskEditTitleElement = document.getElementById('title2');\nconst taskEditDescriptionElement = document.getElementById('description2');\nconst taskEditDueDateElement = document.getElementById('due-date2');\nconst taskEditPriorityElement = document.getElementById('priority2');\n\nconst projectsKey = 'myProjects';\nconst selectedProjectIdKey = 'mySelectedProjectId';\nconst selectedTaskIdKey = 'mySelectedTaskId';\n\nlet projects = JSON.parse(localStorage.getItem(projectsKey)) || [{ id: Date.now().toString(), name: 'General', tasks: [] }];\n\nlet selectedProjectId = JSON.parse(localStorage.getItem(selectedProjectIdKey));\nlet selectedTaskId = JSON.parse(localStorage.getItem(selectedTaskIdKey));\n\n// Utility Functions\nconst showError = (input) => {\n  const parent = input.parentElement;\n  const small = parent.querySelector('small');\n  small.innerText = `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} is required`;\n};\n\nconst renderProjects = () => {\n  projects.forEach((project) => {\n    const projectItem = document.createElement('li');\n    projectItem.classList.add('projects__item');\n    projectItem.setAttribute('id', `${project.id}`);\n    if (project.id === selectedProjectId) {\n      projectItem.classList.add('projects__item--active');\n    }\n    projectItem.innerText = project.name;\n    projectsContainer.appendChild(projectItem);\n  });\n};\n\nconst renderTasks = (selectedProject) => {\n  selectedProject.tasks.forEach((task) => {\n    const taskElement = document.importNode(taskTemplate.content, true);\n    const checkBox = taskElement.querySelector('.todos-item');\n    checkBox.id = task.id;\n    checkBox.checked = task.completed;\n    const taskLabel = taskElement.querySelector('.todos-label');\n    taskLabel.innerHTML = task.name;\n    // taskLabel.innerHTML = `${task.name}  &nbsp; - &nbsp;  due on ${task.dueDate}`;\n    taskLabel.style.fontWeight = 'bold';\n    if (task.priority === 1) {\n      taskLabel.style.color = '#ff0000';\n    } else if (task.priority === 2) {\n      taskLabel.style.color = '#f5f50f';\n    } else {\n      taskLabel.style.color = '#61f30d';\n    }\n    const editButton = taskElement.querySelector('.todos-edit');\n    editButton.setAttribute('data-code', `${task.id}`);\n    const descriptP = taskElement.querySelector('.descrip');\n    descriptP.innerText = task.description;\n    const priorityP = taskElement.querySelector('.prio');\n    if (task.priority === 1) {\n      priorityP.innerText = 'Priority : High';\n    } else if (task.priority === 2) {\n      priorityP.innerText = 'Priority : Medium';\n    } else {\n      priorityP.innerText = 'Priority : Low';\n    }\n    const taskDue = taskElement.querySelector('.task-due-date');\n    taskDue.innerText = `due date ${task.dueDate}`;\n    const taskDetails = taskElement.querySelector('.todos-task-details');\n    (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.removeDisplay)(taskDetails);\n    projectTasks.appendChild(taskElement);\n  });\n};\n\nconst renderPendingTasksCount = (selectedProject) => {\n  const pendingTasksCount = selectedProject.tasks.filter((task) => !task.completed).length;\n  const pendingTasksDescription = pendingTasksCount === 1 ? 'task' : 'tasks';\n  pendingTasksCounter.innerText = `${pendingTasksCount} ${pendingTasksDescription} pending.`;\n};\n\nconst renderProjectsAndTasks = () => {\n  (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.removeElements)(projectsContainer);\n  renderProjects();\n  if (selectedProjectId === null) {\n    (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.removeDisplay)(tasksContainer);\n  } else {\n    (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(tasksContainer);\n    const selectedProject = projects.find((project) => project.id === selectedProjectId);\n    projectTitle.innerText = selectedProject.name;\n    renderPendingTasksCount(selectedProject);\n    (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.removeElements)(projectTasks);\n    renderTasks(selectedProject);\n  }\n};\n\nconst save = () => {\n  localStorage.setItem(projectsKey, JSON.stringify(projects));\n  localStorage.setItem(selectedProjectIdKey, JSON.stringify(selectedProjectId));\n  localStorage.setItem(selectedTaskIdKey, JSON.stringify(selectedTaskId));\n};\n\nconst saveRender = () => {\n  save();\n  renderProjectsAndTasks();\n};\n// Event Listeners\nprojectForm.addEventListener('submit', (e) => {\n  e.preventDefault();\n  const newProjectValue = projectInput.value;\n  if (newProjectValue === null || newProjectValue === '') return;\n  const newProject = (0,_project__WEBPACK_IMPORTED_MODULE_0__.default)(newProjectValue);\n  projects.push(newProject);\n  projectInput.value = null;\n  saveRender();\n});\n\nprojectsContainer.addEventListener('click', (e) => {\n  if (e.target.tagName === 'LI') {\n    selectedProjectId = e.target.id;\n    (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(projectTasks);\n    (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(newTaskButton);\n    taskCreatorElement.classList.add('hide');\n    saveRender();\n  }\n});\n\nprojectDeleteButton.addEventListener('click', () => {\n  projects = projects.filter((project) => project.id !== selectedProjectId);\n  selectedProjectId = null;\n  saveRender();\n});\n\ntaskForm.addEventListener('submit', (e) => {\n  e.preventDefault();\n  const taskName = taskTitleElement.value;\n  if (taskName === null || taskName === '') {\n    showError(taskTitleElement);\n    return;\n  }\n\n  const taskDescription = taskDescriptionElement.value;\n  if (taskDescription === null || taskDescription === '') {\n    showError(taskDescriptionElement);\n    return;\n  }\n\n  const taskDueDate = taskDueDateElement.value;\n  if (taskDueDate === null || taskDueDate === '') {\n    showError(taskDueDateElement);\n    return;\n  }\n\n  const taskPriority = parseInt(taskPriorityElement.value, 10);\n  if (taskPriority === null || taskPriority === '') {\n    showError(taskPriorityElement);\n    return;\n  }\n\n  const newTask = (0,_task__WEBPACK_IMPORTED_MODULE_1__.Task)(taskName, taskDescription, taskDueDate, taskPriority);\n  taskTitleElement.value = null;\n  taskDescriptionElement.value = null;\n  taskDueDateElement.value = null;\n  taskPriorityElement.value = null;\n  const selectedProject = projects.find((project) => project.id === selectedProjectId);\n  selectedProject.tasks.push(newTask);\n  (0,_task__WEBPACK_IMPORTED_MODULE_1__.sortTasks)(selectedProject.tasks);\n  saveRender();\n\n  taskCreatorElement.classList.add('hide');\n  (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(newTaskButton);\n  (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(editTaskFormElement);\n  (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(taskForm);\n  (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(projectTasks);\n});\n\neditTaskFormElement.addEventListener('submit', (e) => {\n  e.preventDefault();\n  const selectedProject = projects.find((project) => project.id === selectedProjectId);\n  const selectedTask = selectedProject.tasks.find((task) => task.id === selectedTaskId);\n  const taskName = taskEditTitleElement.value;\n  const taskDescription = taskEditDescriptionElement.value;\n  const taskDueDate = taskEditDueDateElement.value;\n  const taskPriority = parseInt(taskEditPriorityElement.value, 10);\n  selectedTask.name = taskName;\n  selectedTask.description = taskDescription;\n  selectedTask.dueDate = taskDueDate;\n  selectedTask.priority = taskPriority;\n  (0,_task__WEBPACK_IMPORTED_MODULE_1__.sortTasks)(selectedProject.tasks);\n  saveRender();\n\n  (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(editTaskFormElement);\n  (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(taskForm);\n  taskCreatorElement.classList.add('hide');\n  (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(projectTasks);\n  (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(newTaskButton);\n});\n\nprojectTasks.addEventListener('click', (e) => {\n  const selectedProject = projects.find((project) => project.id === selectedProjectId);\n  if (e.target.tagName === 'INPUT') {\n    const selectedTask = selectedProject.tasks.find((task) => task.id === e.target.id);\n    selectedTaskId = selectedTask.id;\n    selectedTask.completed = e.target.checked;\n    save();\n    renderPendingTasksCount(selectedProject);\n  } else if (e.target.dataset.id === 'deleteSelectedTask') {\n    const activeCheckBox = e.target.parentNode.firstChild.firstChild;\n    selectedProject.tasks = selectedProject.tasks.filter((tsk) => !(tsk.id === activeCheckBox.id));\n    saveRender();\n  } else if (e.target.tagName === 'LABEL') {\n    const taskDetails = e.target.parentNode.parentNode.parentNode.lastChild;\n    (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(taskDetails);\n  } else if (e.target.dataset.code === e.target.parentNode.firstChild.firstChild.id) {\n    const taskToEditId = e.target.dataset.code;\n    selectedTaskId = taskToEditId;\n    save();\n    taskCreatorElement.classList.remove('hide');\n    (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(editTaskFormElement);\n    (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.removeDisplay)(taskForm);\n    (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.removeDisplay)(projectTasks);\n    (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.removeDisplay)(newTaskButton);\n    const activeTask = selectedProject.tasks.find((task) => task.id === taskToEditId);\n    taskEditTitleElement.value = `${activeTask.name}`;\n    taskEditDescriptionElement.value = `${activeTask.description}`;\n    taskEditPriorityElement.value = activeTask.priority;\n    taskEditDueDateElement.value = activeTask.dueDate;\n  }\n});\n\nnewTaskButton.addEventListener('click', () => {\n  (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(taskForm);\n  taskCreatorElement.classList.remove('hide');\n  (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.removeDisplay)(editTaskFormElement);\n  (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.removeDisplay)(projectTasks);\n  (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.removeDisplay)(newTaskButton);\n});\n\ntaskCreatorElement.addEventListener('click', (e) => {\n  if (e.target.id === 'close') {\n    (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(taskForm);\n    (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(editTaskFormElement);\n    taskCreatorElement.classList.add('hide');\n    (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(projectTasks);\n    (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayElement)(newTaskButton);\n  }\n});\nrenderProjectsAndTasks();\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\nconst Project = (name) => ({ id: Date.now().toString(), name, tasks: [] });\n\n\n\n//# sourceURL=webpack://todo-list/./src/project.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Task\": () => (/* binding */ Task),\n/* harmony export */   \"sortTasks\": () => (/* binding */ sortTasks)\n/* harmony export */ });\nconst Task = (name, description, dueDate, priority) => ({\n  id: `task-${Date.now().toString()}`, name, description, dueDate, priority, completed: false,\n});\n\nconst sortTasks = (taskList) => {\n  taskList.sort((a, b) => {\n    const priorityA = a.priority;\n    const priorityB = b.priority;\n    if (priorityA < priorityB) {\n      return -1;\n    }\n    if (priorityA > priorityB) {\n      return 1;\n    }\n\n    return 0;\n  });\n};\n\n\n\n//# sourceURL=webpack://todo-list/./src/task.js?");

/***/ }),

/***/ "./src/utilities.js":
/*!**************************!*\
  !*** ./src/utilities.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"removeElements\": () => (/* binding */ removeElements),\n/* harmony export */   \"displayElement\": () => (/* binding */ displayElement),\n/* harmony export */   \"removeDisplay\": () => (/* binding */ removeDisplay)\n/* harmony export */ });\nconst removeElements = (parent) => {\n  while (parent.lastChild) {\n    parent.removeChild(parent.lastChild);\n  }\n};\n\nconst displayElement = (element) => {\n  element.style.display = '';\n};\n\nconst removeDisplay = (element) => {\n  element.style.display = 'none';\n};\n\n\n\n//# sourceURL=webpack://todo-list/./src/utilities.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;