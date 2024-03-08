<script>

    import Article from '$lib/components/Article.svelte'
    import Filters from '$lib/components/Filters.svelte'
    import Left from '$lib/components/Left.svelte'
    import Right from '$lib/components/Right.svelte'
    import ProfileHead from '$lib/components/ProfileHead.svelte'

    import {EJSON} from 'bson'
    export let data;
    data = EJSON.deserialize(data)
    const {user, posts} = data

    let articles = 5;
    export let neighborlist = EJSON.deserialize(data.neighborlist)
    export let kwartolist = EJSON.deserialize(data.kwartolist)

    //use this to make modal appear: <button on:click={() => {showModal = true;}}>Write a post</button>

</script> 

<div class="wrapper main">

    <div class="left">
        <Left kwartos={kwartolist}/>
    </div>
    <div class="middle">

    <ProfileHead data={user}/>

    
    {#if posts.length === 0}
    <article class="full-width">
        User has not posted any content.
    </article>

    {:else}
        <Filters/>
    {/if}
    
    {#each posts as post}
        <Article data={post} hidden/>
    {/each}
    </div>
    <div class="right">
        <Right neighbors={neighborlist}/>
    </div>
</div>


<style>


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
