<script>
    import { TodoStorageHandler } from "./../lib/storageHandler.js";
    import { Storage } from "./../lib/storage.js";
    import { onMount } from "svelte";
    import Button from "./../lib/components/Button.svelte";
    import TaskUI from "./../lib/components/Task.svelte";

    const searchParams = new URLSearchParams(window.location.search);
    const ID = searchParams.get("id");
    console.log("id = ",ID);
    const TodoService = new TodoStorageHandler(ID);

    let taskOrder = $state([]);
    let taskList = $state([]); 
    let inputField = $state();

    onMount(()=>{
        function isEnterPressed(e){
            if(e.code === "Enter")
                addTask();
        }
        inputField.addEventListener("keydown", isEnterPressed);
        return () => {
            inputField.removeEventListener("keydown", isEnterPressed);
        }
    });

    class Todo {
        constructor(task) {
            this.task = task;
            this.status = "pending";
        }
    }
    
    function refreshTaskData() {
        let data = Storage.get(ID) || { tasks: {}, order: [] };
        taskOrder = [...data.order];
        taskList = taskOrder.map(id => data.tasks[id]);
    }
    
    function clearAllTasks() {
        TodoService.clearAll();
        refreshTaskData();
    }

    function addTask() {
        const taskText = inputField.value.trim();
        if (!taskText) return;

        inputField.value = ""; 
        const newTodo = new Todo(taskText);
        TodoService.add(newTodo);

        refreshTaskData();
    }

    refreshTaskData();
</script>
<main class="main-content">
    <div class="controls-wrapper">
        <div class="controls-add">
            <Button name="Add" onclick={addTask} />
            <input bind:this={inputField} class="task-input" id="input-field" type="text" placeholder="Write your task:">
        </div>
        <Button name="Clear all" onclick={clearAllTasks}/>
    </div>

    <div class="tasks-wrapper">
        <ul id="tasks">
            {#each taskList as item, i}
                <TaskUI 
                task={item.task} 
                status={item.status} 
                cardID={ID} 
                id={taskOrder[i]} 
                index={i} 
                refresh={refreshTaskData}/>
            {/each}
        </ul>
    </div>
</main>
<style>
    .controls-wrapper{
        display: flex;
        gap: 2rem;
        align-items: center;
    }
    .main-content{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input:focus{
        outline: none;
        border-radius: 0;
    }
    input.task-input{
        height: 1.4rem;
        padding: 0.6rem;
        width: 15.5rem;
        font-size: 1rem;
        font-family: sans-serif;
        border: none;
        border-radius: 0.2rem;
        color: var(--text-color);
        background-color: var(--card-bg-color);
    }
    .tasks-wrapper{
        margin-block-start: 1rem;
        padding: 1rem;
        box-shadow: 0 2px 4px darkslategray;
        min-width: 25rem;  
    }
    
</style>