<script>

    import Article from '$lib/components/Article.svelte'
    import Filters from '$lib/components/Filters.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import Left from '$lib/components/Left.svelte'
    import Right from '$lib/components/Right.svelte'
    import { onMount } from 'svelte'
    import {EJSON} from 'bson'
    
    let showModal = false;
    let width = 0;

    export let data
    $: data = EJSON.deserialize(data)
    $: ({posts} = data)

    $: neighborlist = EJSON.deserialize(data.neighborlist);
    $: allList = EJSON.deserialize(data.allList);
    $: kwartolist = EJSON.deserialize(data.kwartolist);
    //use this to make modal appear: <button on:click={() => {showModal = true;}}>Write a post</button>

    $: console.log(posts)



</script> 

<Modal bind:showModal/>

<svelte:window bind:innerWidth={width}/>

<div class="wrapper main">

    <!-- Left -->
    <div class="left">
        {#key kwartolist}
            <Left kwartos={kwartolist}/>
        {/key}
    </div>

    <!-- Middle -->
    <div class="middle">
        <Filters/>
        {#if width < 768}
            <button class="action-button pointer post-button"><img src="/assets/add-black.svg"><h1>Create Post</h1></button>
        {/if}

        {#key posts}
            {#each posts as post}
                <Article data={post} hidden/>
            {/each}
        {/key}
    </div>

    <!-- Right -->
    <div class="right">
        <a class="action-button pointer post-button full-width" href="k/tafthanan/compose">
            <img src="/assets/add-black.svg"><h1>Create Post</h1>
        </a>
        {#key neighborlist}
            <Right neighbors={neighborlist} all={allList}/>
        {/key}
    </div>
</div>


<style>

    a{
        text-decoration: none;
        color: var(--font-color)
    }

    .right{
        height: 80vh;
        justify-content: center;
        align-items: center;
        position: sticky;
        top: 0;
    }

    .fixed {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 100;
    }
    
    .post-button img{
            height: var(--fs-l);
            width: var(--fs-l);
        }

    .post-button{
            font-size: var(--fs-m);
            margin-bottom: var(--fs-m);
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
            height: 100vh;
            flex-direction: column;
            align-items: center;
            background-color: var(--background-color);
            position: sticky;
            top: 0;
        }
        
    }

</style>
