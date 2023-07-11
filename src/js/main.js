import './modules/task.js'
import {Tomato} from "./modules/tomato";
import {Task} from "./modules/task";

let count = 0;
const imp = ['default', 'important', 'so-so']
document.querySelector('.button-importance').addEventListener('click', ({target}) => {
  count += 1;
  if (count >= imp.length) {
    count = 0
  }

  for (let i = 0; i < imp.length; i++) {
    if (count === i) {
      target.classList.add(imp[i])
    } else {
      target.classList.remove(imp[i])
    }
  }
})

const tomato = new Tomato([]);

const taskForm = document.querySelector('.task-form');
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTask = new Task(taskForm['task-name'].value);
  console.log(newTask);
  tomato.addTask(newTask);
  console.log(`tomato`,tomato)
})


