<script>

    import Search from '$lib/components/Search.svelte'
    import Button from '$lib/components/Button.svelte'

    import {page} from '$app/stores'

    let width = 0;

</script>

<svelte:window bind:innerWidth={width}/> 

<div class="wrapper navigation">
    <nav>
        <a href="/" data-sveltekit-reload>
        <div class="logo-container"> 
            <img src="/assets/logo.svg" alt="tafthanan logo">
            {#if width > 475}
                <h1>tafthanan</h1>
            {/if}
        </div>
        </a>
        {#if width > 640}
            <Search/>
        {/if}

        {#if !$page.data.user}
        <a href="/login">
            <Button name="login">
                Sign in
            </Button>
        </a>
        {:else}
        <form action="/logout" method="POST">
            <Button name="logout" type="submit">Sign out</Button>
        </form>
        {/if}
    </nav>
    <div class="wrapper">
        <hr class="hr-no-bottom-margin">
    </div>
</div>


<slot>

</slot>

<style>

    a{
        text-decoration: none;
    }

    h1 {
        display: flex;
        align-items: center;
        color: var(--primary-color);
    }

    .sticky {
        position: sticky;
        top: 0;
    }

    slot {
        padding-top: 100rem;
    }

    .hr-no-bottom-margin{
        margin-bottom: 0;
        margin-top: 0;
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--fs-m);
        background-color: var(--background-color);
    }

    .navigation {
        margin-top: 0;
    }

    .logo-container {
        display: flex;
        gap: var(--fs-m);
    }

</style>