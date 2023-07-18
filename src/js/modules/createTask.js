import {tomato} from "../main";
import {CommonTask, NormalTask, ImportantTask} from './task';
class TaskCreationCommand {
    constructor(name, count, importance) {
        this.name = name;
        this.count = count;
        this.importance = importance;
    }

    execute() {
        throw new Error('Not implemented');
    }
}

class ToCommon extends TaskCreationCommand {
    execute() {
        const newTask = new CommonTask(this.name, this.count);
        tomato.addTask(newTask);
    }
}

class ToNormal extends TaskCreationCommand {
    execute() {
        const newTask = new NormalTask(this.name, this.count);
        tomato.addTask(newTask);
    }
}

class ToImportant extends TaskCreationCommand {
    execute() {
        const newTask = new ImportantTask(this.name, this.count);
        tomato.addTask(newTask);
    }
}

export class TaskCreation {
    constructor() {
        this.commands = [];
    }

    operation(name, count, importance) {
        let Command;
        if (importance === 'default') {
            Command = ToCommon;
        } else if (importance === 'so-so') {
            Command = ToNormal;
        } else {
            Command = ToImportant;
        }
        const command = new Command(name, count, importance);
        if (command.execute()) {
            this.commands.push(command);
        }
    }
}

export const taskCreation = (name, count, importance) => {
    const task = new TaskCreation(name, count);
    task.operation(name, count, importance);
};