export function generateID() {
    let handle = new Date();
    let dateTime = handle.getFullYear().toString() + handle.getMonth().toString() + handle.getDay().toString() + Date.now().toString();
    
    return "1"+Math.floor(Math.random() * 10000).toString() + dateTime;
}