<script>
    import {EJSON} from 'bson'
    import Comment from '$lib/components/Comment.svelte'
    
    import Article from '$lib/components/Article.svelte'
    import Left from '$lib/components/Left.svelte'
    import Right from '$lib/components/Right.svelte'
    import Filters from '$lib/components/Filters.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import Back from '$lib/components/Back.svelte'
    import { onMount } from 'svelte';

    let replies = [];
    let showModal = false;

    export let data
    $: data = EJSON.deserialize(data)
    $: ({post} = data)

    $: postID = post._id
    $: replyingTo = null

    $: neighborlist = EJSON.deserialize(data.neighborlist)
    $: kwartolist = EJSON.deserialize(data.kwartolist)

</script>

<Modal bind:showModal replyingTo={replyingTo} postID={postID}/>

<div class="wrapper main">

<!-- Left -->
<div class="left">
    {#key kwartolist}
        <Left kwartos={kwartolist}/>
    {/key}
</div>

<!-- Middle -->
<div class="middle">
    <article class="full-width heading">
        <a href={"/k/"+post.kwarto} data-sveltekit-reload><Back --width="var(--fs-xxl)"/></a> <h1>Post</h1>
    </article>

    <Article data={post} hidden={false} bind:showModal/>

    {#if post.parentComments == undefined}

    <article class="full-width">
    <h1>    No comments yet, be the first to comment! </h1>
    </article>

    {:else}
        <Filters/>
        {#each post.parentComments as parentComment}
        <article class="comments-label full-width">
        <Comment comment={parentComment} bind:showModal bind:parentComment bind:replyingTo/>
        </article>
    {/each}
    {/if}

</div>

<!-- Right -->
<div class="right">
    {#key neighborlist}
        <Right neighbors={neighborlist}/>
    {/key}
</div>

</div>


<style>

.heading{
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
}

.comments-label{
    padding-top: 0.2em;
    padding-bottom: 0.2em;
}

.back-button-holder{
    height: auto;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
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