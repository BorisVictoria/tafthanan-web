<script>
    import '../reset.css'
    import '../app.css'
    import Search from '$lib/components/Search.svelte'
    import Button from '$lib/components/Button.svelte'

    let width = 0;

</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
</svelte:head>

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
        font-size: var(--fs-xl);
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