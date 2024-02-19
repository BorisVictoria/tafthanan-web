<script>
    export let name = 'name'
    export let text = 'Button'
</script>

<button type="button" name={name}>{text}</button>

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

    }

    button::before {
        display: var(--display, block);
        content: "";
        width: var(--fs-m);
        height: var(--fs-m);
        background-image: var(--url, url("assets/search.svg"));
        background-size: contain;
    } 

    button:hover {
        background-color: var(--accent-color);
    }

</style>