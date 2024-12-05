export class Storage{
    static save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static get(key) {
        let data = localStorage.getItem(key);
        return JSON.parse(data);
    }
    static remove(key) {
        localStorage.removeItem(key);
    }
    static clear() {
        localStorage.clear();
    }
    // static updateOrder(key, ID) {
    //     let order = this.get(key) || [];
    //     order.push(ID);
    //     this.save(key, order);
    // }
}