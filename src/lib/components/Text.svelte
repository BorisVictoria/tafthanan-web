<script>
    export let name = 'text';
    export let placeholder = 'placeholder';
    export let value = ''
    export let type = 'text'
</script>

<div class="text-container">
    <input type={type} name={name} placeholder={placeholder} value={value} required>
</div>

<style>

    .text-container {
        display: flex;
        padding: var(--fs-m);
        border: 2px lightgray solid;
        border-radius: var(--fs-l);
       overflow: hidden;

    }

    .text-container:focus-within {
        border: 2px var(--primary-color) solid;
    }

    input {
        border: 0;
        font-size: var(--fs-m);
        width: 100%;

    }

    input:focus {
        outline: none;
    }

</style>