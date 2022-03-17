const toDoInputEl = document.getElementById("toDoListInput");
const addBtnEl = document.getElementById("addBtn");
const dueDateInputEl = document.getElementById("dueDateInput");
const ul = document.getElementById("todoUl");
const filterOption = document.querySelector(".filter-todo");
let check = false;
//Date variable
let date = new Date();
//set time is 0
date.setHours(0, 0, 0, 0);
console.log(check);
document.addEventListener("DOMContentLoaded", getTodos);
ul.addEventListener("click", deleteCheck);
addBtnEl.addEventListener("click", addTodoList);
filterOption.addEventListener("click", filterTodo);

function addTodoList(e) {
  e.preventDefault();

  if (dueDateInputEl.value !== "" && toDoInputEl.value !== "") {
    const date1 = new Date(dueDateInputEl.value);
    date1.setHours(24, 0, 0, 0);
    if (date <= date1) {
      newElement(toDoInputEl.value, dueDateInputEl.value, check);

      saveLocalTodos(toDoInputEl.value, dueDateInputEl.value, check);
    } else {
      alert("Sorry, the past date cannot be set.");
    }
  } else {
    alert("You must fill in the date and to-do list.");
  }
  toDoInputEl.value = "";
  dueDateInputEl.value = "";
}

function newElement(toDoInput, dueDateInput, check) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const toDoText = document.createTextNode(toDoInput);
  const dateText = document.createTextNode(dueDateInput);

  li.appendChild(toDoText);

  //check button
  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = '<i class="fas fa-check"></i>';
  completedBtn.classList.add("completeBtn");
  //trash button
  deleteBtn.innerHTML = '<i class = "fas fa-trash"></i>';
  deleteBtn.classList.add("removeBtn");
  console.log(check);
  if (check === false) {
    div.classList.toggle("uncompleted");
    check == false;
  } else {
    div.classList.toggle("completed");
    check = true;
  }

  const divForDueDate = document.createElement("div");
  divForDueDate.classList.add("dueDate");
  divForDueDate.appendChild(dateText);

  div.appendChild(li);
  div.appendChild(divForDueDate);
  div.appendChild(completedBtn);
  div.appendChild(deleteBtn);
  ul.appendChild(div);
}

function deleteCheck(e) {
  const item = e.target;
  //delete todo
  if (item.classList[0] === "removeBtn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
  if (item.classList[0] === "completeBtn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    todo.classList.toggle("uncompleted");
    if (todo.classList.value === "completed") {
      check = true;
    } else {
      check = false;
    }
    saveCheckedLocalTodos(todo, check);
  }
}

function filterTodo(e) {
  const completed = document.querySelectorAll(".completed");
  const uncompleted = document.querySelectorAll(".uncompleted");

  switch (e.target.value) {
    case "all":
      completed.forEach((complete) => complete.classList.remove("hide"));
      uncompleted.forEach((uncomplete) => uncomplete.classList.remove("hide"));
      break;
    case "uncompleted":
      completed.forEach((complete) => complete.classList.add("hide"));
      uncompleted.forEach((uncomplete) => uncomplete.classList.remove("hide"));
      break;
    case "completed":
      uncompleted.forEach((uncomplete) => uncomplete.classList.add("hide"));
      completed.forEach((complete) => complete.classList.remove("hide"));
      break;
  }
}
function saveLocalTodos(toDoInput, dueDateInput, check) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push({ date: dueDateInput, toDo: toDoInput, checked: check });
  console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    newElement(todo.toDo, todo.date, todo.checked);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;

  console.log(todos);
  console.log(todoIndex);
  todos.forEach((todo, index) => {
    todo.toDo === todoIndex ? todos.splice(index, 1) : "";
  });
  console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function saveCheckedLocalTodos(todo, check) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;

  todos.forEach((todo, index) => {
    console.log(check);
    todo.toDo === todoIndex
      ? (todos[index].checked = check)
      : todos[index].checked;
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
