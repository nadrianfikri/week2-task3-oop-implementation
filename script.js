const showTodo = document.getElementById('show-todo');
const inputTask = document.getElementById('input-task');

const todos = [];

class Todos {
  constructor(id, taskName, isDone, doneBtn, doneText, display) {
    this.id = id;
    this.taskName = taskName;
    this.isDone = isDone;
    this.doneBtn = doneBtn;
    this.doneText = doneText;
    this.display = display;
  }
  //   method
  renderElements() {
    return `
      <div class="todo">
        <div class="wraper done ">
          <button class="btn ${this.doneBtn}" onclick="doneTodo(${this.id})"><img src="images/icon-check.svg" alt="check-btn" /></button>
        </div>
        <p class="todo-name ${this.doneText}">${this.taskName}</p>
        <div class="wraper undo ${this.display}">
          <button class="btn" onclick="undoTodo(${this.id})"><img src="images/icon-undo.svg" alt="undo-btn" /></button>
        </div>
        <div class="wraper delete">
          <button class="btn" onclick="removeTodo(${this.id})"><img src="images/icon-cross.svg" alt="delete-btn" /></button>
        </div>
      </div>
    `;
  }
}

function addTodo() {
  if (inputTask.value === '') {
    alert("The field can't be empty");
    return;
  }

  const todo = new Todos(Date.now(), inputTask.value, false, '', '', '');

  todos.push(todo);
  inputTask.value = '';

  renderTodo();
}

function removeTodo(id) {
  for (let i = 0; i < todos.length; i++) {
    if (id == todos[i].id) {
      todos.splice(i, 1);
    }
  }
  renderTodo();
}
function doneTodo(id) {
  for (let todo of todos) {
    if (id == todo.id) {
      todo.isDone = true;
    }
  }
  renderTodo();
}
function undoTodo(id) {
  for (let todo of todos) {
    if (id == todo.id) {
      todo.isDone = false;
    }
  }
  renderTodo();
}

function renderTodo() {
  let HTMLElements = '';

  if (todos.length < 1) {
    HTMLElements += `
        <div class="img-cont">
            <img class="img" src="images/undraw_attached_file_re_0n9b.svg" alt="empty" />
        </div>
        `;
  } else {
    for (let todo of todos) {
      if (todo.isDone) {
        todo.doneBtn = 'done-btn';
        todo.doneText = 'done-text';
        todo.display = '';
      } else {
        todo.doneBtn = '';
        todo.doneText = '';
        todo.display = 'display';
      }

      HTMLElements += todo.renderElements();
    }
  }
  showTodo.innerHTML = HTMLElements;
}

// trigger button on enter keyup
inputTask.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    document.getElementById('btn-submit').click();
  }
});

renderTodo();
