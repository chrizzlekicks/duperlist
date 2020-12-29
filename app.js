// Global Variables
const enterBtn = document.querySelector(".enter-btn");
const clearBtn = document.querySelector(".clear-btn");
const ul = document.querySelector(".list-group");
let input = document.getElementById("userinput");
let todos = [];

// Event Listeners
enterBtn.addEventListener("click", addAfterCheckBtnValid);
clearBtn.addEventListener("click", clearList);
input.addEventListener("keypress", addAfterCheckInputValid);
window.addEventListener("DOMContentLoaded", getLocalStorage);

// Functions
function resetInput() {
    return input.value = "";
}

function inputLength() {
    return input.value.length;
}

function addAfterCheckBtnValid() {
    if(inputLength() > 0) {
        addToDo();
        resetInput();
    }
}

function addAfterCheckInputValid(e) {
    if(inputLength() > 0 && e.which === 13) {
        addToDo();
        resetInput();
    } 
}

function clearList() {
    ul.innerHTML = "";
    localStorage.clear("Duperlist");
}

function createListItem(item) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.append(document.createTextNode(item));
    li.onclick = () => li.classList.toggle("done");
    const btn = document.createElement("button");
    btn.className = "deleteBtn";
    const bin = document.createElement("i");
    bin.className = "material-icons";
    bin.textContent = "delete";
    btn.append(bin);
    li.append(btn);
    ul.append(li);
    btn.addEventListener("click", deleteItem);
}

function addToDo() {
    let todo = input.value;
    createListItem(todo);
    addLocalStorage(todo);
}

function deleteItem(e) {
    let todo = e.currentTarget.parentElement;
    todo.remove();
    removeLocalStorage(todo);
}

function getLocalStorage() {
    let ls = localStorage.getItem("Duperlist");
    if(!ls) {
        todos = [];
    } else {
        todos = JSON.parse(ls);
        todos.forEach(item => createListItem(item))
    }
}

function addLocalStorage(item) {
    todos.push(item);
    localStorage.setItem("Duperlist", JSON.stringify(todos));
}

function removeLocalStorage(item) {
    let itemValue = item.firstChild.textContent;
    todos = todos.filter(element => itemValue != element);
    localStorage.setItem("Duperlist", JSON.stringify(todos));
}