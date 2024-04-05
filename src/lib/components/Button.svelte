<script>
    export let name = 'name'
    export let type = 'button'

</script>

<button type={type} name={name} on:click>
    <slot>
    </slot>
</button>

<style>

    button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: calc(var(--fs-l) * 0.25) calc(var(--fs-l) * 0.5);
        width: var(--width);
        gap: calc(var(--fs-m) * 0.75);
        cursor: pointer;
        text-decoration: none;
        border: 0;
        border-radius: 0.25rem;
        background-color: var(--primary-color);
        color: var(--contrast-color);
        transition: background-color 0.1s ease;
    }

    button:hover {
        background-color: var(--accent-color);
    }

</style>