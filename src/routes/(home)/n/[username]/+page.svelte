<script>

    import Article from '$lib/components/Article.svelte'
    import Filters from '$lib/components/Filters.svelte'
    import Left from '$lib/components/Left.svelte'
    import Right from '$lib/components/Right.svelte'
    import ProfileHead from '$lib/components/ProfileHead.svelte'
    import Toast from '$lib/components/Toast.svelte'
    import {EJSON} from 'bson'

    export let data;
    $: data = EJSON.deserialize(data)
    $: ({userProfile, posts} = data)

    $: neighborlist = data.neighborlist
    $: kwartolist = data.kwartolist

    console.log(data)

    //use this to make modal appear: <button on:click={() => {showModal = true;}}>Write a post</button>

</script> 

<div class="wrapper main">

    <Toast/>

    <!-- Left -->
    <div class="left">
        {#key kwartolist}
            <Left kwartos={kwartolist}/>
        {/key}
    </div>
    <div class="middle">
    
    <!-- Middle -->
    {#key userProfile}
        <ProfileHead data={userProfile}/>
    {/key}

    {#if posts.length === 0}
        <article class="full-width">
            User has not posted any content.
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
        {#key neighborlist}
            <Right neighbors={neighborlist}/>
        {/key}
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
