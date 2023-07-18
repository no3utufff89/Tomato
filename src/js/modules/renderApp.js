import {tomato} from "../main";

export class RenderApp {
    constructor(target, app) {
        this.target = target;
        this.app = app;
    }

    init() {

        this.leftSide = document.createElement('div');
        this.leftSide.classList.add('pomodoro-form', 'window');
        this.reightSide = document.createElement('div');
        this.reightSide.classList.add('pomodoro-form', 'window');
        this.wrapper = document.createElement('div');

        this.tasksListWraper = document.createElement('div');
        this.tasksListWraper.className = 'pomodoro-tasks';
        this.tasksList = document.createElement('ul');
        this.tasksList.className = 'pomodoro-tasks__quest-tasks';
        this.renderApp()
    }

    //Главный рендер метод(сборка)
    renderApp() {
        this.leftSide.innerHTML = '';
        const activeTitle = this.renderTitle();
        const activeWindow = this.renderMainWindow();

        this.leftSide.append(activeTitle, activeWindow);
        if (!document.querySelector('.task-form')) {
            const taskForm = this.renderForm();
            this.reightSide.append(taskForm);
        }
        this.wrapper.append(this.leftSide, this.reightSide);
        this.renderTasksList();
        this.tasksListWraper.append(this.tasksList);
        if (!document.querySelector('.pomodoro-tasks__quest-list')) {
            const instructions = this.renderInstructions();
            this.tasksListWraper.insertBefore(instructions[0], this.tasksList);
            this.tasksListWraper.insertBefore(instructions[1], this.tasksList);
        }
        this.tasksListWraper.append(this.tasksList);
        document.querySelector(this.target).append(this.wrapper,
            this.tasksListWraper);
    }

    // Создаем форму
    renderForm() {
        const taskForm = document.createElement('form');
        taskForm.className = 'task-form';
        taskForm.insertAdjacentHTML('afterbegin',
            `
                  <input type="text" class="task-name input-primary"
                    name="task-name" id="task-name" placeholder="название задачи" required>
                  <button type="button" class="button button-importance default"
                    aria-label="Указать важность"></button>
                  <button type="submit" class="button button-primary task-form__add-button">
                    Добавить</button>
                `);
        return taskForm;
    }

    // Создаем инструкцию
    renderInstructions() {
        const instructionTitle = document.createElement('p');
        instructionTitle.className = 'pomodoro-tasks__header-title';
        instructionTitle.textContent = 'Инструкция:';
        const instructions = document.createElement('ul');
        instructions.className = 'pomodoro-tasks__quest-list';
        instructions.insertAdjacentHTML('afterbegin', `
      <li class="pomodoro-tasks__list-item">
        Напишите название задачи чтобы её добавить
      </li>
      <li class="pomodoro-tasks__list-item">
        Чтобы задачу активировать, выберите её из списка
      </li>
      <li class="pomodoro-tasks__list-item">
        Запустите таймер
      </li>
      <li class="pomodoro-tasks__list-item">
        Работайте пока таймер не прозвонит
      </li>
      <li class="pomodoro-tasks__list-item">
        Сделайте короткий перерыв (5 минут)
      </li>
      <li class="pomodoro-tasks__list-item">
        Продолжайте работать, пока задача не будет выполнена.
      </li>
      <li class="pomodoro-tasks__list-item">
        Каждые 4 периода таймера делайте длинный перерыв (15-20 минут).
      </li>
    `);
        return [instructionTitle, instructions];
    }

    //Создаем главной окно с таймером
    renderMainWindow() {
        const activeWindow = document.createElement('div');
        activeWindow.className = 'window__body';
        activeWindow.insertAdjacentHTML('afterbegin', `
      <p class="window__timer-text">00:00</p>
      <div class="window__buttons">
        <button class="button button-primary button-start">Старт</button>
        <button class="button button-secondary button-stop">Стоп</button>
      </div>
    `);
        return activeWindow;
    }

    //Создаем заголовок
    renderTitle() {
        const titleWraper = document.createElement('div');
        titleWraper.className = 'window__panel';
        if (!this.app.activeTask) {

            titleWraper.insertAdjacentHTML('afterbegin', `
        <p class="window__panel-title">Выберите задачу из списка </p>
        <p class="window__panel-task-text"></p>
    `);
        } else {
            titleWraper.insertAdjacentHTML('afterbegin', `
        <p class="window__panel-title">${this.app.activeTask.name}</p>
        <p class="window__panel-task-text">${this.app.activeTask.count}</p>
    `);
        }
        return titleWraper;
    }

    renderTasksList() {
        this.tasksList.innerHTML = '';
        //Если важен порядок задач
        // const defaultList = [];
        // const soSo = [];
        // const important = [];
        // this.app.tasks.forEach(item => {
        //     if (item.importance === 'default') defaultList.push(item);
        //     if (item.importance === 'important') soSo.push(item);
        //     if (item.importance === 'so-so') important.push(item);
        // });
        // const tasks = [ ...defaultList, ...soSo, ...important];

        // если все по порядку

        const tasks = tomato.tasks
        if (tasks.length < 1) {
            const warn = document.createElement('li');
            warn.style.cssText = 'color: black; font-weight: bold;'
            warn.textContent = 'Нет задач';
            this.tasksList.append(warn)
        }

        tasks.forEach((item, index) => {
            const task = document.createElement('li');
            task.classList.add(`pomodoro-tasks__list-task`, `${item.importance}`);
            task.insertAdjacentHTML('afterbegin', `
      <span class="count-number">${item.count}</span>
      <button class="pomodoro-tasks__task-text">${item.name}</button>
      <button class="pomodoro-tasks__task-button"></button>
      <div class="burger-popup">
        <button class="popup-button burger-popup__edit-button">
          Редактировать</button>
        <button class="popup-button burger-popup__delete-button">
          Удалить</button>
      </div>
    `);
            if (this.app.activeTask !== null) {
                if (item.id === this.app.activeTask.id) {
                    task.children[1].classList.add('pomodoro-tasks__task-text_active');
                }
            }
            this.tasksList.append(task);
        });
    }


}