<script>
    import {CardStorageHandler} from "./../storageHandler.js";

    let props = $props();
    let card, cardName;
    const CardService = new CardStorageHandler();

    function removeCard(){
        CardService.delete(props.index, props.ID);
        props.refresh();
    }
    function handleName(){
        cardName.contentEditable = "true";
        cardName.focus();
    }
    function setName(){
        CardService.changeName(props.ID, cardName.innerText);
        cardName.contentEditable = "false";
    }
</script>

<div class="card" data-id={props.ID} bind:this={card}>
    <a href="/todo/{props.ID}" class="card-content">
        <span
            bind:this={cardName}
            id="card-name"
            contenteditable="false"
            onfocusout={setName}>
            {props.name}
        </span>
    </a>
    <div class="controls-wrapper">
        <button
            id="button-edit"
            class="card-controls"
            onclick={handleName}>
            Edit
        </button>
        <button 
            id="button-delete" 
            class="card-controls" 
            onclick={removeCard}>
            Delete
        </button>
    </div>
</div>
<style>
    .controls-wrapper{
        display: flex;
        gap: 0.2rem;
        width: 100%;
        height: 28%;
        border-radius: 0 0 4px 4px;
        background-color: var(--card-bg-color);
    }
    .controls-wrapper button{
        text-align: center; 
        color: white;
        font-size: 1.2rem;
        font-weight: 500;
        width: 50%;
        background-color: var(--color-theme);
    }
    #button-edit{
        border-radius: 0 0 0 4px;
    }
    #button-delete{
        border-radius: 0 0 4px 0;
    }
    .card{
        height: 12.75rem;
        width: 21rem;
        border-radius: 4px;
    }
    .card .card-content{
        height: 72%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px 4px 0 0;
        background-color: var(--card-bg-color);
    }
    .card span{
        color: var(--text-color);
        /* width: 60%; */
        overflow:hidden;
        font-size: 1.8rem;
    }
</style>