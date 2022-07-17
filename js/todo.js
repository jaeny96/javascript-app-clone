const todoForm = document.querySelector("#todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector("#todo-list");

let todos = [];
const TODOS_KEY = "todos";

const saveTodos = () => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};

const deleteTodo = (e) => {
  const li = e.target.parentElement;
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodos();
};

const paintTodo = (newTodo) => {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
};

const handlerTodoSubmit = (event) => {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
};

todoForm.addEventListener("submit", handlerTodoSubmit);

if (localStorage.getItem(TODOS_KEY) != null) {
  const parsedTodos = JSON.parse(localStorage.getItem(TODOS_KEY));
  todos = parsedTodos;
  parsedTodos.forEach(paintTodo);
}
