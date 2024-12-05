<script>
    let themeColors = ["#0FA4AF", "#E97000", "#2D79BF", "#ECAE00"];

    function handleChange(){
        // @ts-ignore
        const isCheck = document.getElementById("switch").checked;

        if(isCheck)
            window.document.body.classList.add("dark");
        else
            window.document.body.classList.remove("dark");
    }
    function handleClick(e){
        const index = e.target.dataset.index;
        const root = document.documentElement.style;
        root.setProperty("--color-theme", themeColors[index]);

        setActiveTab(e.target);
    }
    function setActiveTab(tab){
        const tabs = document.querySelectorAll(".theme-color");

        tabs.forEach(element => {element.classList.remove("active");});
        tab.classList.add("active");
    }
</script>

<nav class="universal-padding">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="theme-toggle">
        <input id="switch" type="checkbox" onchange={handleChange}>
        <label for="switch"></label>
    </div>
    <div class="theme-colors-wrapper">
        {#each themeColors as Color, i (i)}
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button data-index={i} onclick={(e) => handleClick(e)} class:active={false} class="theme-color" style="background-color:{Color};"></button>
        {/each}
    </div>
</nav>

<style>
    nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-block: 1rem;
        background-color: var(--color-black);
    }
    .theme-colors-wrapper{
        display:flex;
        gap: 1.25rem;
        align-items: center;
    }
    .active{
        border: 2px solid white;
    }
    .theme-color{
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
    }
    #switch{
        position: absolute;
        top: -1000000px;
        left: -1000000px;
    }
    label{
        --before-width: 4rem;
        --after-width: calc(0.35 * var(--before-width));
        --left-shift: calc(var(--before-width) - var(--after-width) - 0.2rem);
        
        gap: 10px;
        display: flex;
        width: fit-content;
        position: relative;
        align-items: center;
        justify-content: center;
    }
    label::before{
        content: "";
        height: 1.7rem;
        border-radius: 100px;
        display: inline-block;
        box-shadow: inset 5px 12px 23px -16px rgba(0,0,0,0.75);
        width: var(--before-width);
        background-color: var(--color-white);
    }
    label::after{
        content: "";
        height: 80%;
        left: 0.2rem;
        position: absolute;
        border-radius: 100px;
        box-shadow: 0.5px 0.5px 5px rgb(70, 70, 70);
        width: var(--after-width);
        transition: left .3s ease-in-out;
        background-color: var(--color-theme);
    }
    #switch:checked + label{
        color: white;
    }
    #switch:checked + label::after{
        left: var(--left-shift);
    }
</style>