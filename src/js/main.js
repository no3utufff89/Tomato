import './modules/task.js'
import {Task} from "./modules/task";
import {Tomato} from "./modules/tomato";
import {RenderApp} from "./modules/renderApp";
import {Controller} from "./modules/controller";
import {Timer} from "./modules/timer";

export const tomato = new Tomato([]);
export const activeTomato = new RenderApp('.main__container', tomato)
export const controller = new Controller(tomato);
export const timer = new Timer(tomato.taskTime, tomato.pauseTime, tomato.bigPauseTime);
activeTomato.init()
controller.mainControll()