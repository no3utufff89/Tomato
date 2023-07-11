export class Tomato {
    #taskTime = 25;
    #pauseTime = 5;
    #bigPauseTime = 15;
    constructor(tasks = []) {
        this.tasks = tasks;
        this.activeTask = null;
    }
    // Добавление задачи
    addTask(task) {
        this.tasks.push(task)
    }

    // Активировать задачу
    activateTask(id) {
        this.tasks.forEach(item => {
            if (item.id === id) {
                this.activeTask = item;
            }
        });
    }

    //Увеличить счетчик
    taskCount(id) {
        this.tasks.forEach(item => {
            if (item.id === id) {
                item.count++;
            }
        });
    }

}