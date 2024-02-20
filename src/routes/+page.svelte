<script>

    import Text from '$lib/components/Text.svelte';
    import Button from '$lib/components/Button.svelte';
    import Password from '$lib/components/Password.svelte';
    import Back from '$lib/components/Back.svelte';

    import '../login.css'
    import { onMount } from 'svelte';

    let width = 0;

    $: test="<style> #login-form{display:block} #create-acc-form{display:none} </style>"
    function showCreateAcc(){
        test = "<style> #login-form{display:none} #create-acc-form{display:block} </style>"
    }

    function showLogIn(){
        test= "<style> #login-form{display:block} #create-acc-form{display:none} </style>"
    }

</script>

<svelte:window bind:innerWidth={width}/>

<div class="wrapper">
    <div class="login-container">
        {#if width > 768}
            <div class="poster-container">
            <img src="assets/login-poster.png" alt="login poster">
            </div>
        {/if}
        <div class="input-container">

            {@html test}

            <div class="logo-text-container">
                <img src="../assets/logo.svg" alt="logo"><h2>tafthanan</h2>
            </div>

            <form id="login-form">
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

                <div class="divider">
                    <div class="divider-line">
                        <hr>
                    </div>
                    OR
                    <div class="divider-line">
                        <hr>
                    </div>
                </div>

                <Button name="create" text="Create account" --width="100%" --display="none" --primary-color="var(--button-contrast-color" --contrast-color="var(--text-contrast-color)" --accent-color="hsl(150, 5%, 73%)" on:click={showCreateAcc}/>
                
            </div>
            <footer>
                <a data-sveltekit-reload href="home">continue without an account</a>
            </footer>
            </form>

            <form id="create-acc-form">
                <header>
                    
                    <h1><Back --width="calc(var(--fs-l) * 2)" on:click={showLogIn}/>Welcome to tafthanan</h1>
                    <hr>
                </header>
                <p>
                    Email:
                </p>
                <Text name="email" placeholder="Email"/>
                <p>
                    Username:
                </p>
                <Text name="Username" placeholder="Username"/>
                <p>
                    Password:
                </p>
                <Password name="Password" placeholder="Password"/>
                <p>
                    Confirm password:
                <Password name="Password" placeholder="Confirm Password"/>
                
                <div class="button-container">
                    <Button name="createAcc" text="Create a new Account" --width="100%" --display="none"/>
                </div>

            </form>
        </div>
    </div>
</div>

    
<style>
    h1 {
        font-size: var(--fs-xxl);
    }

    h2 {
        font-size: var(--fs-l);
    }

    a {
        color: var(--accent-color);
        transition: color 0.5s ease;
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
        max-height: 100vh;
    }

    .poster-container{
        max-height: 100vh;
        overflow: hidden;
    }

    .login-container {
        display: grid;
        grid-template-columns: 1fr;
        align-items: center;
        gap: var(--fs-m);
        min-width: 100%;
        max-height: 100vh;
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
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        transition: box-shadow 1s ease;
        border: 0px;
    }

    .input-container:hover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
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