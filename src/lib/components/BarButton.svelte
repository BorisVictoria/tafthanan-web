<script>
    //BUTTON THAT TAKES UP A WHOLE DIV
    export let img = false;
    export let alt = false;
    export let tag = false;

</script>

<button class="pointer">
    {#if img}
    <img src={img} alt={alt}>
    {/if}

    {#if !tag}
    <strong>
    <slot>
    </slot>
    </strong>

    {:else}
    <svelte:element this={tag}>
    <slot>
    </slot>
    </svelte:element>

    {/if}
</button>


<style>
    button *{
        background-color: transparent;
    }

    big{
        font-size: var(--fs-l);
    }

    button img{
        width: calc(var(--fs-l) * 2.25);
        margin: 0;
        padding: 0;
        padding-bottom: calc(var(--fs-m) * 0.5)
    }

    button{
        display: flex;
        justify-content: left;
        align-items: center;
        transition: background-color 0.3s ease;
        background-color: var(--bg-color, var(--primary-color));
       
        min-height: auto;
        width: 90%;

        border-style: none;
        border-radius: 0.1em;


        gap: calc(0.9 * var(--fs-m));
    }

    button:hover{
        background-color: var(--color-hover, var(--accent-color));
    }
    
</style>