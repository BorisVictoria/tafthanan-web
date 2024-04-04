<script>

    import Article from '$lib/components/Article.svelte'
    import Filters from '$lib/components/Filters.svelte'
    import Left from '$lib/components/Left.svelte'
    import Right from '$lib/components/Right.svelte'
    import KwartoHead from '$lib/components/KwartoHead.svelte'
    import Toast from '$lib/components/Toast.svelte'
    import {EJSON} from 'bson'

    export let data
    $: data = EJSON.deserialize(data)
    $: ({kwarto, posts} = data)

    $: neighborlist = EJSON.deserialize(data.neighborlist);
    $: allList = EJSON.deserialize(data.allList);
    $: kwartolist = EJSON.deserialize(data.kwartolist);

    $: console.log(kwarto.name)
    let width = 0;

    $: postlink = '/k/'+ `${kwarto.name}` + '/compose'
    
    $: isLoggedIn = !!(data.user)

    //use this to make modal appear: <button on:click={() => {showModal = true;}}>Write a post</button>

</script> 

<svelte:window bind:innerWidth={width}/>

<div class="wrapper main">

    <Toast/>


    <!-- Left -->
    <div class="left">
        {#key kwartolist}
            <Left kwartos={kwartolist}/>
        {/key}
    </div>

    <!-- Middle -->
    <div class="middle">
    {#key kwarto}
        <KwartoHead data={kwarto}/>
    {/key}

    {#if width < 768}
        <a class="action-button pointer post-button">
            <img src="/assets/add-black.svg">
            <h1>Create Post</h1>
        </a>
    {/if}

    {#if posts.length === 0}
        <article class="full-width">
            <h1>Kwarto is empty, be the first to contribute!</h1>
        </article>

        {:else}
            <Filters/>
    {/if}

    {#key posts}
        {#each posts as post}
            <Article data={post} hidden/>
        {/each}
    {/key}
    </div>

    <!-- Right -->
    <div class="right">
        <a class="action-button pointer post-button full-width" href={postlink}>
            <img alt="add icon" src="/assets/add-black.svg">
            <h1>Create Post</h1>
        </a>
        <Right neighbors={neighborlist} all={allList}/>
    </div>

</div>

<style>

    a {
        text-decoration: none;
        color: var(--font-color)
    }

    .post-button {
        font-size: var(--fs-m);
        margin-bottom: var(--fs-m);
    }

    .right {
        padding-top: calc(var(--fs-xxl) * 1.75);
    }

    .post-button img {
        height: var(--fs-l);
        width: var(--fs-l);
    }


    @media (min-width: 0px) {

        .main {
            display: grid;
            grid-template-columns: 1fr;
        }

        .left, .right{
            display: none;
        }

        .middle {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }   

    @media (min-width: 768px) {

        .main {
            grid-template-columns: 3fr 1fr;
            grid-template-areas: "middle right";
        }

        .right{
            display: flex;
            flex-direction: column;
            align-items: center;
        }

    }

    @media (min-width: 1280px) {

        .main {
            grid-template-columns: 1fr 3fr 1fr;
            grid-template-areas: "left middle right";
        }

        .left {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: var(--background-color);
        }
        
    }

</style>
