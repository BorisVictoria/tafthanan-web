<script>

    import Text from '$lib/components/Text.svelte';
    import Button from '$lib/components/Button.svelte';
    import Password from '$lib/components/Password.svelte';

    import '../login.css'
    import { onMount } from 'svelte';

    let width = 0;

</script>

<svelte:window bind:innerWidth={width}/>

<div class="wrapper">
    <div class="login-container">
        {#if width > 768}
            <img src="assets/login-poster.png" alt="login poster">
        {/if}
        <form class="input-container">
            <header>
                <h1>Life is Taft.</h1>
                <hr>
                <h2>Let's make it bearable pare.</h2>
            </header>
            <p>
                Username:
            </p>
            <Text name="Username" placeholder="Username"/>
            <p>
                Password:
            </p>
            <Password name="Password" placeholder="Password"/>
            <div class="button-container">
                <Button name="login" text="Sign in" --width="100%" --display="none"/>
                <hr>
                <Button name="create" text="Create account" --width="100%" --display="none" --primary-color="var(--button-contrast-color" --contrast-color="var(--text-contrast-color)"/>
                <p class="text-align">continue without an account</p>
            </div>
        </form>
    </div>
</div>

    
<style>

    h1 {
        font-size: var(--fs-xxl);
    }

    h2 {
        font-size: var(--fs-l);
    }

    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--fs-m);
        border-radius: 0.5rem;
        min-width: 80%;
    }

    .login-container {
        display: grid;
        grid-template-columns: 1fr;
        align-items: center;
        gap: var(--fs-m);
        min-width: 100%;
    }

    .input-container {
        display: flex;
        flex-direction: column;
        padding: var(--fs-m);
        gap: var(--fs-m);
        border-radius: 0.5rem;
        background: var(--background-color);
    }

    .input-container:hover {
        border: 2px var(--primary-color) solid;
    }

    @media (min-width: 768px) {
        .login-container {
            grid-template-columns: 1fr 1fr;
        }
    }

</style>