<script>

    import Search from '$lib/components/Search.svelte'
    import Button from '$lib/components/Button.svelte'

    let width = 0;

</script>

<svelte:window bind:innerWidth={width}/> 

<div class="wrapper navigation">
    <nav>
        <div class="logo-container"> 
            <img src="/assets/logo.svg" alt="tafthanan logo">
            {#if width > 475}
                <h1>tafthanan</h1>
            {/if}
        </div>
        {#if width > 640}
            <Search/>
        {/if}
        <Button name="login" text="Sign in"/>
    </nav>
</div>
<div class="wrapper">
    <hr class="hr-no-bottom-margin">
</div>

<slot>

</slot>

<style>

    h1 {
        display: flex;
        align-items: center;
        color: var(--primary-color);
    }

    .hr-no-bottom-margin{
        margin-bottom: 0;
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .navigation {
        margin-top: var(--fs-m);
    }

    .logo-container {
        display: flex;
        gap: var(--fs-m);
    }

</style>