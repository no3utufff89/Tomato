import {taskCreation} from "./createTask";
import {activeTomato, tomato} from "../main";

export class Controller {



    constructor(tomato) {
        this.tomato = tomato;
    }

    mainControll() {
        this.addTask();
        this.importanceChange();
        this.toActive();
        this.startTimer();
        this.openTaskModal();
        this.taskModal();
    }

    // Добавление задачи
    addTask() {
        const form = document.querySelector('.task-form');
        const input = form['task-name'];
        let inputValue = '';
        input.addEventListener('input', e => {
            inputValue = input.value;
        });
        form.addEventListener('submit', e => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            const importance = form.querySelector('.button-importance').classList[2];
            taskCreation(data['task-name'], 0, importance);
            form.reset();
            console.log(tomato)
        });
    }

    // Смена важности
    importanceChange() {
        document.addEventListener('click', e => {
            const target = e.target;
            if (target.closest('.button-importance')){
                if (target.closest('.default')) {
                    target.classList.remove('default');
                    target.classList.add('so-so');
                } else if (target.closest('.so-so')) {
                    target.classList.remove('so-so');
                    target.classList.add('important');
                } else if (target.closest('.important')) {
                    target.classList.remove('important');
                    target.classList.add('default');
                }
            }
        });
    }

    // Активирование задачи
    toActive() {
        const tasks = document.querySelector('.pomodoro-tasks__quest-tasks');
        tasks.addEventListener('click', e => {
            const target = e.target;
            if (target.closest('.pomodoro-tasks__task-text ')) {
                tomato.tasks.forEach((item, index) => {
                    if (item.name === (target.parentNode.children[1].textContent)) {
                        tomato.activateTask(item.id);
                    }
                });
                target.parentNode.children[1].classList
                    .add('pomodoro-tasks__task-text_active');
                activeTomato.renderApp()
            }
        });
    }

    // Запуск таймера
    startTimer() {
        document.addEventListener('click', e => {
            const target = e.target;
            if (target.closest('.button-start')) {
                tomato.taskTimerRun();
            }
        });
    }

    // Открыть модалку
    openTaskModal() {
        document.addEventListener('click', e => {
            const target = e.target;

            if (target.closest('.pomodoro-tasks__task-button')) {
                target.parentNode.children[3].classList.toggle('burger-popup_active');
            }
        });
    }

    // Кнопки в модалке
    taskModal() {
        document.addEventListener('click', e => {
            const target = e.target;
            const modal = document.querySelector('.modal-overlay');
            if (target.closest('.burger-popup__delete-button')) {
                const taskName = document.querySelector('.burger-popup_active')
                    .parentNode.children[1].textContent;
                tomato.removeTask(taskName)
            }
        });
    }


}