import Project from './project';
import { Task, sortTasks } from './task';
import {
  removeElements, displayElement, removeDisplay,
} from './utilities';
import '@fortawesome/fontawesome-free/js/all';

const projectsContainer = document.querySelector('.projects-list');
const projectForm = document.querySelector('.projects-form');
const projectInput = document.querySelector('.projects-form-input');
const tasksContainer = document.querySelector('.todos');
const projectTitle = document.querySelector('.todos-title');
const pendingTasksCounter = document.querySelector('.todos-count');
const projectDeleteButton = document.querySelector('.projects--delete-button');

const taskTemplate = document.getElementById('task-template');
const projectTasks = document.querySelector('.todos-all-tasks');
const taskForm = document.getElementById('todos-form');
const newTaskButton = document.querySelector('.todos-new-task-button');
const taskTitleElement = document.querySelector('.todos-input');
const taskDescriptionElement = document.getElementById('description');
const taskDueDateElement = document.getElementById('due-date');
const taskPriorityElement = document.getElementById('priority');
const taskCreatorElement = document.querySelector('.todos-creator');
const editTaskFormElement = document.getElementById('todos-edit-form');
const taskEditTitleElement = document.getElementById('title2');
const taskEditDescriptionElement = document.getElementById('description2');
const taskEditDueDateElement = document.getElementById('due-date2');
const taskEditPriorityElement = document.getElementById('priority2');

const projectsKey = 'myProjects';
const selectedProjectIdKey = 'mySelectedProjectId';
const selectedTaskIdKey = 'mySelectedTaskId';

let projects = JSON.parse(localStorage.getItem(projectsKey)) || [{ id: Date.now().toString(), name: 'General', tasks: [] }];

let selectedProjectId = JSON.parse(localStorage.getItem(selectedProjectIdKey));
let selectedTaskId = JSON.parse(localStorage.getItem(selectedTaskIdKey));

const showError = (input) => {
  const parent = input.parentElement;
  const small = parent.querySelector('small');
  small.innerText = `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} is required`;
};

const renderProjects = () => {
  projects.forEach((project) => {
    const projectItem = document.createElement('li');
    projectItem.classList.add('projects__item');
    projectItem.setAttribute('id', `${project.id}`);
    if (project.id === selectedProjectId) {
      projectItem.classList.add('projects__item--active');
    }
    projectItem.innerText = project.name;
    projectsContainer.appendChild(projectItem);
  });
};

const renderTasks = (selectedProject) => {
  selectedProject.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkBox = taskElement.querySelector('.todos-item');
    checkBox.id = task.id;
    checkBox.checked = task.completed;
    const taskLabel = taskElement.querySelector('.todos-label');
    taskLabel.innerHTML = task.name;
    taskLabel.style.fontWeight = 'bold';
    if (task.priority === 1) {
      taskLabel.style.color = '#ff0000';
    } else if (task.priority === 2) {
      taskLabel.style.color = '#f5f50f';
    } else {
      taskLabel.style.color = '#61f30d';
    }
    const editButton = taskElement.querySelector('.todos-edit');
    editButton.setAttribute('data-code', `${task.id}`);
    const descriptP = taskElement.querySelector('.descrip');
    descriptP.innerText = task.description;
    const priorityP = taskElement.querySelector('.prio');
    if (task.priority === 1) {
      priorityP.innerText = 'Priority : High';
    } else if (task.priority === 2) {
      priorityP.innerText = 'Priority : Medium';
    } else {
      priorityP.innerText = 'Priority : Low';
    }
    const taskDue = taskElement.querySelector('.task-due-date');
    taskDue.innerText = `due date ${task.dueDate}`;
    const taskDetails = taskElement.querySelector('.todos-task-details');
    removeDisplay(taskDetails);
    projectTasks.appendChild(taskElement);
  });
};

const renderPendingTasksCount = (selectedProject) => {
  const pendingTasksCount = selectedProject.tasks.filter((task) => !task.completed).length;
  const pendingTasksDescription = pendingTasksCount === 1 ? 'task' : 'tasks';
  pendingTasksCounter.innerText = `${pendingTasksCount} ${pendingTasksDescription} pending.`;
};

const renderProjectsAndTasks = () => {
  removeElements(projectsContainer);
  renderProjects();
  if (selectedProjectId === null) {
    removeDisplay(tasksContainer);
  } else {
    displayElement(tasksContainer);
    const selectedProject = projects.find((project) => project.id === selectedProjectId);
    projectTitle.innerText = selectedProject.name;
    renderPendingTasksCount(selectedProject);
    removeElements(projectTasks);
    renderTasks(selectedProject);
  }
};

const save = () => {
  localStorage.setItem(projectsKey, JSON.stringify(projects));
  localStorage.setItem(selectedProjectIdKey, JSON.stringify(selectedProjectId));
  localStorage.setItem(selectedTaskIdKey, JSON.stringify(selectedTaskId));
};

const saveRender = () => {
  save();
  renderProjectsAndTasks();
};

projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newProjectValue = projectInput.value;
  if (newProjectValue === null || newProjectValue === '') return;
  const newProject = Project(newProjectValue);
  projects.push(newProject);
  projectInput.value = null;
  saveRender();
});

projectsContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    selectedProjectId = e.target.id;
    displayElement(projectTasks);
    displayElement(newTaskButton);
    taskCreatorElement.classList.add('hide');
    saveRender();
  }
});

projectDeleteButton.addEventListener('click', () => {
  projects = projects.filter((project) => project.id !== selectedProjectId);
  selectedProjectId = null;
  saveRender();
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskName = taskTitleElement.value;
  if (taskName === null || taskName === '') {
    showError(taskTitleElement);
    return;
  }

  const taskDescription = taskDescriptionElement.value;
  if (taskDescription === null || taskDescription === '') {
    showError(taskDescriptionElement);
    return;
  }

  const taskDueDate = taskDueDateElement.value;
  if (taskDueDate === null || taskDueDate === '') {
    showError(taskDueDateElement);
    return;
  }

  const taskPriority = parseInt(taskPriorityElement.value, 10);
  if (taskPriority === null || taskPriority === '') {
    showError(taskPriorityElement);
    return;
  }

  const newTask = Task(taskName, taskDescription, taskDueDate, taskPriority);
  taskTitleElement.value = null;
  taskDescriptionElement.value = null;
  taskDueDateElement.value = null;
  taskPriorityElement.value = null;
  const selectedProject = projects.find((project) => project.id === selectedProjectId);
  selectedProject.tasks.push(newTask);
  sortTasks(selectedProject.tasks);
  saveRender();

  taskCreatorElement.classList.add('hide');
  displayElement(newTaskButton);
  displayElement(editTaskFormElement);
  displayElement(taskForm);
  displayElement(projectTasks);
});

editTaskFormElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const selectedProject = projects.find((project) => project.id === selectedProjectId);
  const selectedTask = selectedProject.tasks.find((task) => task.id === selectedTaskId);
  const taskName = taskEditTitleElement.value;
  const taskDescription = taskEditDescriptionElement.value;
  const taskDueDate = taskEditDueDateElement.value;
  const taskPriority = parseInt(taskEditPriorityElement.value, 10);
  selectedTask.name = taskName;
  selectedTask.description = taskDescription;
  selectedTask.dueDate = taskDueDate;
  selectedTask.priority = taskPriority;
  sortTasks(selectedProject.tasks);
  saveRender();

  displayElement(editTaskFormElement);
  displayElement(taskForm);
  taskCreatorElement.classList.add('hide');
  displayElement(projectTasks);
  displayElement(newTaskButton);
});

projectTasks.addEventListener('click', (e) => {
  const selectedProject = projects.find((project) => project.id === selectedProjectId);
  if (e.target.tagName === 'INPUT') {
    const selectedTask = selectedProject.tasks.find((task) => task.id === e.target.id);
    selectedTaskId = selectedTask.id;
    selectedTask.completed = e.target.checked;
    save();
    renderPendingTasksCount(selectedProject);
  } else if (e.target.dataset.id === 'deleteSelectedTask') {
    const activeCheckBox = e.target.parentNode.firstChild.firstChild;
    selectedProject.tasks = selectedProject.tasks.filter((tsk) => !(tsk.id === activeCheckBox.id));
    saveRender();
  } else if (e.target.tagName === 'LABEL') {
    const taskDetails = e.target.parentNode.parentNode.parentNode.lastChild;
    displayElement(taskDetails);
  } else if (e.target.dataset.code === e.target.parentNode.firstChild.firstChild.id) {
    const taskToEditId = e.target.dataset.code;
    selectedTaskId = taskToEditId;
    save();
    taskCreatorElement.classList.remove('hide');
    displayElement(editTaskFormElement);
    removeDisplay(taskForm);
    removeDisplay(projectTasks);
    removeDisplay(newTaskButton);
    const activeTask = selectedProject.tasks.find((task) => task.id === taskToEditId);
    taskEditTitleElement.value = `${activeTask.name}`;
    taskEditDescriptionElement.value = `${activeTask.description}`;
    taskEditPriorityElement.value = activeTask.priority;
    taskEditDueDateElement.value = activeTask.dueDate;
  }
});

newTaskButton.addEventListener('click', () => {
  displayElement(taskForm);
  taskCreatorElement.classList.remove('hide');
  removeDisplay(editTaskFormElement);
  removeDisplay(projectTasks);
  removeDisplay(newTaskButton);
});

taskCreatorElement.addEventListener('click', (e) => {
  if (e.target.id === 'close') {
    displayElement(taskForm);
    displayElement(editTaskFormElement);
    taskCreatorElement.classList.add('hide');
    displayElement(projectTasks);
    displayElement(newTaskButton);
  }
});
renderProjectsAndTasks();
