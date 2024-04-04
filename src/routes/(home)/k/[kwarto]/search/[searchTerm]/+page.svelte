<script>

    import Article from '$lib/components/Article.svelte'
    import Filters from '$lib/components/Filters.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import Left from '$lib/components/Left.svelte'
    import Right from '$lib/components/Right.svelte'
    import { onMount } from 'svelte'
    import {EJSON} from 'bson'
    
    let width = 0;

    export let data
    $: data = EJSON.deserialize(data)
    $: ({posts} = data)

    $: neighborlist = data.neighborlist
    $: kwartolist = data.kwartolist
    $: allList = data.allList;
    //use this to make modal appear: <button on:click={() => {showModal = true;}}>Write a post</button>



</script> 

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
        {#if posts.length == 0}
            <article class="full-width">
                <h1>No posts found for '{data.query}' in {data.kwarto}  try broadening your search or searching another kwarto.</h1>
            </article>
        {:else}
            <article class="full-width">
                <h2>{posts.length} result{#if posts.length > 1}s{/if} found for '{data.query}' in {data.kwarto}</h2>
            </article>

            <Filters/>

            {#key posts}
                {#each posts as post}
                    <Article data={post} hidden/>
                {/each}
            {/key}

        {/if}
    </div>

    <!-- Right -->
    <div class="right">
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
