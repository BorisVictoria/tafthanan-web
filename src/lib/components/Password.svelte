<script>
    export let name = 'password';
    export let placeholder = 'placeholder';
</script>

<div class="password-container">
    <input type="password" name={name} placeholder={placeholder}>
</div>

<style>

    .password-container {
        display: flex;
        padding: var(--fs-m);
        border: 2px lightgray solid;
        border-radius: var(--fs-l);
        overflow: hidden;

    }

    .password-container:focus-within {
        border: 2px var(--primary-color) solid;
    }

    input {
        border: 0;
        font-size: var(--fs-m);
    }

    input:focus {
        outline: none;
    }

</style>