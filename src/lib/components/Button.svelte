<script>
    let {name, ...rest} = $props();
</script>
<button {...rest}>{name}</button>
<style>
    button{
        padding: 0.6rem 1.5rem;
        cursor: pointer;
        color: white;
        border: none;
        border-radius: 0.2rem;
        background-color:var(--color-theme);
        box-shadow: 0 0.1rem 0.2rem darkslategray;
    }
    button:active{
        box-shadow: 0 0 0.4rem darkslategray;
        transform: translateY(0.1rem);
    }
</style>