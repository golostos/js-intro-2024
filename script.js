let inputForm = document.getElementById("input-form");
const taskList = document.getElementById("task-list");

/** @type {{id: number; name: string; done: boolean;}[]} */
let taskListData = [];

function start() {
  const taskListDataFromStorage = JSON.parse(
    localStorage.getItem("task-list-data")
  );
  if (Array.isArray(taskListDataFromStorage)) {
    taskListData = taskListDataFromStorage;
  }
  taskListData.forEach((element) => {
    // createElem(element);
    createElemHtml(element);
  });
}

start();

function saveData() {
  localStorage.setItem("task-list-data", JSON.stringify(taskListData));
}

/**
 * @param {{id: number; name: string; done: boolean;}} taskElem
 */
function createElem(taskElem) {
  const listWrapper = document.createElement("li");
  const listItem = document.createElement("div");
  listItem.className = "list-item";
  listWrapper.dataset.id = taskElem.id;
  const nameElem = document.createElement("div");
  nameElem.textContent = taskElem.name;
  nameElem.style.textDecoration = taskElem.done ? "line-through" : "none";
  const doneBtn = document.createElement("button");
  doneBtn.textContent = taskElem.done ? "Undone" : "Done";
  doneBtn.addEventListener("click", () => {
    taskElem.done = !taskElem.done;
    doneBtn.textContent = taskElem.done ? "Undone" : "Done";
    nameElem.style.textDecoration = taskElem.done ? "line-through" : "none";
    saveData();
  });
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
    taskListData = taskListData.filter((data) => data.id !== taskElem.id);
    listWrapper.remove();
    saveData();
  });
  listItem.append(nameElem, doneBtn, removeBtn);
  listWrapper.append(listItem);
  taskList.append(listWrapper);
}

/**
 * @param {{id: number; name: string; done: boolean;}} taskElem
 */
function createElemHtml(taskElem) {
  const elem = `
    <li data-id=${taskElem.id}>
        <div class="list-item">
            <div class="task-name" style="text-decoration: ${
              taskElem.done ? "line-through" : "none"
            }">
                ${taskElem.name}
            </div>
            <button class="done-btn">${
              taskElem.done ? "Undone" : "Done"
            }</button>
            <button class="remove-btn">Remove</button>
        </div>
    </li>
    `;
  taskList.insertAdjacentHTML("beforeend", elem);
}

taskList.addEventListener("click", (event) => {
  const doneBtn = event.target.closest(".done-btn");
  if (doneBtn) {
    const closestLi = event.target.closest("li");
    const id = closestLi.dataset?.id;
    if (id && Number.isInteger(+id)) {
      const parsedId = +id;
      const elem = taskListData.find((elem) => elem.id === parsedId);
      if (elem) {
        elem.done = !elem.done;
        const taskNameElem = closestLi.querySelector(".task-name");
        if (taskNameElem) {
          taskNameElem.style.textDecoration = elem.done
            ? "line-through"
            : "none";
        }
        doneBtn.textContent = elem.done ? "Undone" : "Done";
      }
    }
  }
});

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const taskName = formData.get("task-name");
  const id = Math.max(taskListData?.map((data) => data.id)) + 1;
  const newTask = {
    id,
    name: taskName,
    done: false,
  };
  taskListData.push(newTask);
  //   createElem(newTask);
  createElemHtml(newTask);
  const input = document.getElementById("input");
  input.value = "";
  saveData();
});

// DOM - document object model
// const h1 = document.querySelector('h1');
// h1.innerText = 'Hello, Jo';
// // const btnMinus = document.querySelector('.clicker button:first-child');
// // const btnPlus = document.querySelector('.clicker button:last-child');
// const btnMinus = document.getElementById('btn-minus');
// const btnPlus = document.querySelector('#btn-plus');
// const counter = document.querySelector('.counter');

// btnMinus.onclick = function (event) {
//     counter.textContent -= 1;
// }

// btnPlus.onclick = function (event) {
//     counter.textContent = parseInt(counter.textContent) + 1;
// }
