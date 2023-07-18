import {activeTomato, timer} from "../main";

export class Tomato {
    #taskTime = 0.5;
    #pauseTime = 1;
    #bigPauseTime = 2;
    count = 0;
    constructor(tasks = []) {
        if (Tomato.instance) {
            return Tomato.instance;
        }
        this.tasks = tasks;
        this.activeTask = null;
        Tomato.instance = this;
    }

    get taskTime() {
        return this.#taskTime;
    }

    get pauseTime() {
        return this.#pauseTime;
    }

    get bigPauseTime() {
        return this.#bigPauseTime;
    }

    // Добавление задачи
    addTask(task) {
        this.tasks.push(task)
        this.count++;
        activeTomato.renderApp()
    }

    // Активировать задачу
    activateTask(id) {
        this.tasks.forEach(item => {
            if (item.id === id) {
                this.activeTask = item;
            }
        });
        activeTomato.renderApp()
    }

    //Увеличить счетчик
    taskCount(id) {
        this.tasks.forEach(item => {
            if (item.id === id) {
                item.count++;
            }
        });
    }

    taskTimerRun() {
        if (this.activeTask === null) {
            alert('Нет активной задачи');
            return;
        }
        timer.startTimer();
    }

    removeTask(task) {
        const index = this.tasks.findIndex(item => item.name === task);
        this.tasks.splice(index, 1);
        this.count--;
        this.tasks.forEach(item => item.changeCount())
        activeTomato.renderApp()
    }

}