<script>

    import Article from '$lib/components/Article.svelte'
    import Filters from '$lib/components/Filters.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import Left from '$lib/components/Left.svelte'
    import Right from '$lib/components/Right.svelte'
    import {EJSON} from 'bson'
    
    let articles = 5;

    let showModal = false;
    let width = 0;

    export let data
    data = EJSON.deserialize(data)
    const {posts} = data
    console.log(posts)
    //use this to make modal appear: <button on:click={() => {showModal = true;}}>Write a post</button>

</script> 

<Modal bind:showModal/>

<svelte:window bind:innerWidth={width}/>

<div class="wrapper main">

    <div class="left">
        <Left />
    </div>
    <div class="middle">

    <Filters/>

    {#if width < 768}
    <button class="action-button pointer post-button"><img src="/assets/add-black.svg"><h1>Create Post</h1></button>
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

    .right{
        height: 80vh;
        justify-content: center;
        align-items: center;
        position: sticky;
        top: 0;
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
