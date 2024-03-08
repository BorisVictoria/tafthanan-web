<script>

    import Article from '$lib/components/Article.svelte'
    import Filters from '$lib/components/Filters.svelte'
    import Left from '$lib/components/Left.svelte'
    import Right from '$lib/components/Right.svelte'
    import KwartoHead from '$lib/components/KwartoHead.svelte'
    import {EJSON} from 'bson'
    export let data
    data = EJSON.deserialize(data)
    const {kwarto, posts} = data
    
    let articles = 5;

    let width = 0;

    //use this to make modal appear: <button on:click={() => {showModal = true;}}>Write a post</button>

</script> 

<svelte:window bind:innerWidth={width}/>

<div class="wrapper main">

    <div class="left">
        <Left />
    </div>
    <div class="middle">

    <KwartoHead data={kwarto}/>

    {#if width < 768}
    <button class="action-button pointer post-button"><img src="/assets/add-black.svg"><h1>Create Post</h1></button>
    {/if}

    {#if posts.length === 0}
        <article class="full-width">
            <h1>Kwarto is empty, be the first to contribute!</h1>
        </article>

        {:else}
            <Filters/>
    {/if}

    {#each posts as post}
        <Article data={post} hidden/>
    {/each}
    </div>
    <div class="right">
        <button class="action-button pointer post-button full-width"><img src="/assets/add-black.svg"><h1>Create Post</h1></button>
            <Right/>
    </div>
</div>


<style>

    .post-button{
        font-size: var(--fs-m);
        margin-bottom: var(--fs-m);
    }

    .right{
        padding-top: calc(var(--fs-xxl) * 1.75);
    }

    .post-button img{
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
