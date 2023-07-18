import {activeTomato} from "../main";
import {tomato} from "../main";

export class Timer {
    constructor(taskTime, pauseTime, bigPauseTime) {
        this.taskTime = taskTime;
        this.pauseTime = pauseTime;
        this.bigPauseTime = bigPauseTime;
    }

    startTimer() {
        const timerText = document.querySelector('.window__timer-text');
        let time = this.taskTime * 60 * 1000;
        timerText.textContent = `00:00`;

        const mainTimer = setInterval(() => {
            const minutes = Math.floor(time / 1000 / 60 % 60);
            const seconds = Math.floor(time / 1000 % 60);
            time -= 10000;
            if (minutes < 10) timerText.textContent = `0${minutes}:${seconds}`;
            if (seconds < 10) timerText.textContent = `${minutes}:0${seconds}`;
            if (minutes < 10 && seconds < 10) {
                timerText.textContent = `0${minutes}:0${seconds}`;
            }
            if (minutes >= 10 && seconds >= 10) {
                timerText.textContent = `${minutes}:${seconds}`;
            }
            if (minutes <= 0 && seconds <= 0) {
                activeTomato.renderTasksList();
                document.querySelector('.window__panel-task-text').textContent =
                    tomato.activeTask.count;
                clearTimeout(mainTimer);
                if (tomato.activeTask.count % 3 === 0) {
                    time = this.bigPauseTime * 60 * 1000;
                } else {
                    time = this.pauseTime * 60 * 1000;
                }
                const pauseTimer = setInterval(() => {
                    const minutes = Math.floor(time / 1000 / 60 % 60);
                    const seconds = Math.floor(time / 1000 % 60);
                    time -= 10000;
                    if (minutes < 10) timerText.textContent = `0${minutes}:${seconds}`;
                    if (seconds < 10) timerText.textContent = `${minutes}:0${seconds}`;
                    if (minutes < 10 && seconds < 10) {
                        timerText.textContent = `0${minutes}:0${seconds}`;
                        timerText.style.cssText = 'color:green'
                    }
                    if (minutes >= 10 && seconds >= 10) {
                        timerText.textContent = `${minutes}:${seconds}`;
                    }
                    if (minutes <= 0 && seconds <= 0) {
                        timerText.style.cssText = 'color:#333333'
                        clearTimeout(pauseTimer);
                    }
                }, 1000);
                document.addEventListener('click', e => {
                    const target = e.target;

                    if (target.closest('.button-stop')) {
                        timerText.textContent = `00:00`;
                        clearTimeout(pauseTimer);
                    }
                });
            }
        }, 1000);
        document.addEventListener('click', e => {
            const target = e.target;

            if (target.closest('.button-stop')) {
                timerText.textContent = `00:00`;
                clearTimeout(mainTimer);
            }
        });
    }
}