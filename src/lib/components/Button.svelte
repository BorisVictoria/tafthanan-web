<script>

    export let name = 'name'
    export let width = 'auto';
    export let text = 'Button'
</script>

<button type="button" style="width:{width}" name={name}>{text}</button>

<style>

    button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: calc(var(--fs-l) * 0.25) calc(var(--fs-l) * 0.5) ;

        cursor: pointer;
        text-decoration: none;
        font-size: var(--fs-l);
        border: 0;
        border-radius: 0.25rem;
        background-color: var(--primary-color);
        color: var(--contrast-color);
    }

</style>