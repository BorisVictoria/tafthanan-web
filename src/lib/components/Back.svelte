<button type="button" on:click>
    <img alt="back-button" src="assets/back-button.svg">
</button>

<style>
    
    button {
        opacity: 0.6;
        transition: opacity 0.5s ease;
        border-style: none;
        width: var(--width);
        margin: calc(var(--fs-m) * 0.5);
    }
    
    button:hover{
        opacity: 1.0;
    }
</style>