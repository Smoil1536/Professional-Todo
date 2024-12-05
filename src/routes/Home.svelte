<script>
    import {CardStorageHandler} from "./../lib/storageHandler.js";
    import {Storage} from "./../lib/storage.js";
    import CardUI from "./../lib/components/Card.svelte";
    import Button from "./../lib/components/Button.svelte";

    let values = $state([]);
    let keys = $state([]);

    const CardService = new CardStorageHandler();
    allStorage();


    function allStorage(){
        let data = Storage.get("order") || [];
        keys = [...data];
        values = data.map(id => Storage.get(id));

        console.log("order = ", $state.snapshot(keys));
        console.log("values = ", $state.snapshot(values));
    }
    class Card{
        constructor(){
            this.name = "Set Name";
            this.order = [];
            this.tasks = {};
        }
    }
    function addCard(){
        const card = new Card();
        const ID = CardService.add(card);
        
        CardService.updateOrder("order", ID);
        allStorage();
    }
</script>
<main class="universal-padding">
    <div class="cards-wrapper">
        {#each values as value, i}
            <CardUI name={value.name} index={i} ID={keys[i]} refresh={allStorage}/>
        {/each}

    </div>
    <div class="add-button-wrapper">
        <Button name="Add" onclick={addCard}/>
    </div>
</main>
<style>
    .cards-wrapper{
        display: flex;
        flex-wrap: wrap; 
        gap: 5rem;
        justify-content: space-between; 
    }
</style>