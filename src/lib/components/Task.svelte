<script>
    import { TodoStorageHandler } from "./../storageHandler.js";

    let props = $props();
    const TaskService = new TodoStorageHandler(props.cardID);

    let taskText = $state();
    let checkbox = $state();

    function toggleStatus(){
        let status = "pending";
        (checkbox.checked) && (status = "done");

        TaskService.changeStatus(status, props.id);
        props.refresh();
    }
    function removeTask(){
        props.refresh();
        TaskService.deleteTask(props.id, props.index);
        props.refresh();
    }
    function enableEdit(){
        taskText.contentEditable = "true";
        taskText.focus();
    }
    function setTask(){
        TaskService.changeTask(taskText.innerText, props.id);
        taskText.contentEditable = "false";
        props.refresh();
    }
</script>
<li data-id={props.id}>
    <input class="checkbox" type="checkbox" checked={(props.status === "done")} onchange={toggleStatus} bind:this={checkbox}> 
    <span id="task" contenteditable="false" bind:this={taskText} onfocusout={setTask}>{props.task}</span>
    <div class="control-icons">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <i id="edit-icon" class="fa-solid fa-pencil" onclick={enableEdit}></i>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <i class="fa-solid fa-xmark" id="remove-icon" onclick={removeTask}></i>
    </div>
</li>

<style>
    li{
        display: flex;
        align-items: center;
    }
    li{
        display: flex;
        gap: clamp(0.8rem, 1vw + 0.1rem, 1.5rem);
        background-color: var(--theme-color);
        padding: 0.5rem;
        align-items: center;
    }
    span{
        width: 25rem;
        white-space: nowrap;
        color: var(--card-bg-color);
        font-family: verdana;
        font-size: 1.1rem;
        overflow: hidden;
    }
    input[type="checkbox"]{
        accent-color: var(--color-theme);
        height: 1.2rem;
        width: 1.2rem;
    }
    input[type="checkbox"]:checked + #task{
        text-decoration: line-through;
    }
    .control-icons{
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }
    #edit-icon{
        color: #289BDE;
        font-size: 1.2rem;
        padding: 3px;
    }
    #remove-icon{
        color: red;
        font-size: 1.5rem;
        padding: 3px;
    }
    #edit-icon:hover,
    #remove-icon:hover{
        background-color:rgb(219, 219, 219);
        border-radius: 3px;
    }
    @media (max-width: 480px){
        span{
            width: 60%;
        }
    }
        /*
    @media (max-width: 615px)
    and (min-width: 481px){
        span{
            width: 18.75rem;
        }
    }*/
</style>