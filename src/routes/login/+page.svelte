<script>

    import Text from '$lib/components/Text.svelte';
    import Button from '$lib/components/Button.svelte';
    import Password from '$lib/components/Password.svelte';
    import Back from '$lib/components/Back.svelte';
    import {enhance} from '$app/forms'
    import { page } from '$app/stores'

    let width = 0;

    let toggled = true;

    function toggle(){
        toggled = !toggled
    }
    

</script>

<svelte:head>
    <style>
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.3);
    }
    </style>
</svelte:head>

<svelte:window bind:innerWidth={width}/>

<div class="wrapper">
    <div class="login-container">

        <!-- show poster if screen size is greater than 768px -->
        {#if width > 768}
            <div class="poster-container">
            <img src="assets/login-poster.png" alt="login poster">
            </div>
        {/if}


        <div class="input-container">

            <!-- Tafthanan container -->
            <div class="logo-text-container">
                <img src="../assets/logo.svg" alt="logo"><h2>tafthanan</h2>
            </div>

            <!-- Login Form -->
            <form id="login-form" method="POST" action="?/login" use:enhance
                style:display={toggled ? 'block' : 'none'}>
                <header>
                    <h1>Life is Taft.</h1>
                    <hr>
                    <h2>Let's make it bearable pare.</h2>
                </header>
                <p>Username:</p>
                <Text name="username" placeholder="Username"/>
                <p>Password:</p>
                <Password name="password" placeholder="Password"/>
                <div class="button-container">
                    <Button name="login" type="submit" --width="100%" --display="none">
                        Sign in
                    </Button>

                    <div class="divider">
                        <div class="divider-line">
                            <hr>
                        </div>
                        OR
                        <div class="divider-line">
                            <hr>
                        </div>
                    </div>
                    <Button name="create" --width="100%" --display="none" --primary-color="var(--button-contrast-color)" --contrast-color="var(--text-contrast-color)" --accent-color="hsl(150, 5%, 73%)" on:click={toggle}>
                        Create account
                    </Button>
                </div>
                <footer>
                    <a href="/">continue without an account</a>
                </footer>
            </form>

            <!-- Create Account Form -->
            <form id="create-acc-form" method="POST" action="?/register" use:enhance
                style:display={!toggled ? 'block' : 'none'}>
                <header>
                    <h1><Back --width="calc(var(--fs-l) * 2)" on:click={toggle}/>Welcome to tafthanan</h1>
                    <hr>
                </header>
                <p>
                    Email:
                </p>
                <Text name="email" placeholder="Email"/>
                <p>
                    Username:
                </p>
                <Text name="username" placeholder="Username"/>
                <p>
                    Password:
                </p>
                <Password name="password" placeholder="Password"/>
                <p>
                    Confirm password:
                <Password name="confirmPassword" placeholder="Confirm Password"/>
                
                <div class="button-container">
                    <Button name="createAcc" type="submit" --width="100%" --display="none">
                        Create a new Account
                    </Button>
                </div>
            </form>

        </div>
    </div>
</div>

    
<style>

    #login-form {
        display:block
    } 
    
    #create-acc-form {
        display:none
    }

    h1 {
        font-size: var(--fs-xxl);
    }

    h2 {
        font-size: var(--fs-l);
    }

    a {
        color: var(--accent-color);
        transition: color 0.1s ease;
    }
    a:hover{
        color: hsl(153, 56%, 45%);;
    }

    footer{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--fs-m);
        border-radius: 0.5rem;
        min-width: 80%;
        max-height: 100dvh;
    }

    .poster-container{
        max-height: 95dvh;
        overflow: hidden;
    }

    .login-container {
        display: grid;
        grid-template-columns: 1fr;
        align-items: center;
        gap: var(--fs-m);
        min-width: 100%;
        max-height: 100dvh;
        overflow: auto;
    }

    .input-container {
        display: flex;
        flex-direction: column;
        padding: var(--fs-m);
        margin: calc(var(--fs-m) * 0.5);
        gap: var(--fs-m);
        border-radius: 0.5rem;
        background: var(--background-color);
    }

    .logo-text-container{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
    }

    .logo-text-container > img{
        height: 1rem;
    }

    @media (min-width: 768px) {
        .login-container {
            grid-template-columns: 1fr 1fr;
        }

        .logo-text-container{
            display: none;
        }
    }

    .button-container{
        margin-top: var(--fs-m);
    }

</style>