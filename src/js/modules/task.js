class Task { #name; #count; #id;
    constructor(name, count =0) {
        this.#name = name.toString();
        this.#count = Number(count);
        this.#id = Number(Math.floor(Math.random() * 100))
    }
    changeCount() {
        this.#count++;
    }
    changeName(newName) {
        return this.#name = newName;
    }
    get name() {
        return this.#name;
    }
    get count() {
        return this.#count;
    }
    get id() {
        return this.#id;
    }

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
// Создаем
const item = new Task('Почистить апельсин', );

// Пробуем менять, получаем фигу
item.name = 'dsfsdfsdfsdfsdf'
console.log(item)
console.log(item.id);
console.log(item.name);
console.log(item.count);
