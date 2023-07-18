import {tomato} from "../main";

export class Task {
    #name;
    #count;
    #id;
    constructor(name, count = 0) {
        this.#name = name;
        this.#count = tomato.tasks.length+1
        // this.#count = count
        this.#id = Math.floor(Math.random() * 10000);
    }
    // Методы
    changeCount() {
        this.#count--;
        if (this.#count === 0) this.#count = 1
    }
    changeName(newName) {
        return this.#name = newName;
    }
    // Геттеры
    get name() {
        return this.#name;
    }
    get count() {
        return this.#count;
    }
    get id() {
        return this.#id;
    }
    // Сеттеры
    set name(data) {
        console.log('Нельзя менять данные');
    }
    set count(data) {
        console.log('Нельзя менять данные');
    }
    set id(data) {
        console.log('Нельзя менять данные');
    }
}
export class CommonTask extends Task {
    constructor(name, count, importance = 'default') {
        super(name, count);
        this.importance = importance;
    }
}

export class NormalTask extends Task {
    constructor(name, count, importance = 'so-so') {
        super(name, count);
        this.importance = importance;
    }
}

export class ImportantTask extends Task {
    constructor(name, count, importance = 'important') {
        super(name, count);
        this.importance = importance;
    }
}



