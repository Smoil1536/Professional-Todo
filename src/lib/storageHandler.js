import { generateID } from "./id.js";
import { Storage } from "./storage.js";

export class TodoStorageHandler{
    constructor(id) {
        this.cardID = id;
    }
    add(taskTemplate) {
        const ID = generateID();
        let data = Storage.get(this.cardID);

        data.tasks[ID] = taskTemplate;
        data.order.push(ID);

        Storage.save(this.cardID, data);
    }
    clearAll() {
        let data = Storage.get(this.cardID) || { tasks: {}, order: [] };
        data.tasks = {};
        data.order = [];
        Storage.save(this.cardID, data);
    }
    deleteTask(taskId, index) {
        let data = Storage.get(this.cardID) || { tasks: {}, order: [] };
        delete data.tasks[taskId];

        data.order.splice(index, 1);
        Storage.save(this.cardID, data);
    }
    changeTask(newTask, taskId) {
        let data = Storage.get(this.cardID) || { tasks: {}, order: [] };
        data.tasks[taskId].task = newTask;
        Storage.save(this.cardID, data);
    }
    changeStatus(status, taskId) {
        let data = Storage.get(this.cardID) || { tasks: {}, order: [] };
        data.tasks[taskId].status = status;
        Storage.save(this.cardID, data);
    }
}
export class CardStorageHandler{
    add(card) {
        const ID = generateID();
        Storage.save(ID, card);

        return ID;
    }
    changeName(ID, name = "Set name") {
        let data = Storage.get(ID);
        data.name = name;
        Storage.save(ID, data);
    }
    delete(index, ID) {
        let order = Storage.get("order") || [];

        order.splice(index, 1);
        Storage.save("order", order);
        Storage.remove(ID);
    }
    updateOrder(key, ID) {
        let order = Storage.get(key) || [];
        order.push(ID);
        Storage.save(key, order);
    }
}