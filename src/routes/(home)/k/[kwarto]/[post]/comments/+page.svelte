<script>
    import {EJSON} from 'bson'
    import Comment from '$lib/components/Comment.svelte'
    
    import Article from '$lib/components/Article.svelte'
    import Left from '$lib/components/Left.svelte'
    import Right from '$lib/components/Right.svelte'
    import Filters from '$lib/components/Filters.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import Back from '$lib/components/Back.svelte'
    import TextEditor from '$lib/components/TextEditor.svelte'
    import { onMount } from 'svelte';

    let replies = [];
    let showModal = false;

    export let data
    $: data = EJSON.deserialize(data)
    $: ({post} = data)

    $: postID = post._id
    export let replyingTo = null

    $: console.log(replyingTo)

    $: neighborlist = EJSON.deserialize(data.neighborlist);
    $: allList = EJSON.deserialize(data.allList);
    $: kwartolist = EJSON.deserialize(data.kwartolist);

    $: comment = true

    onMount(() => {
        const params = new URLSearchParams(window.location.search)
        console.log(params)
        showModal = params.get('showModal')
    })

</script>

<Modal bind:showModal replyingTo={replyingTo} postID={postID}>
    <TextEditor backFunction={() => dialog.close()} bind:postID bind:replyingTo comment={comment}/>
</Modal>

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

    {#key post}
        <Article data={post} hidden={false} bind:replyingTo bind:showModal/>
    {/key}

    {#if post.parentComments == undefined}

    <article class="full-width">
    <h1>    No comments yet, be the first to comment! </h1>
    </article>

    <!--IDK BAKIT SIYA NULL IF comment={parentComment lang} pero if may kasamang commentID kahit di naman ginagamit nagttrue siya that's wild-->
    {:else}
        <Filters/>
        {#key post}
            {#each post.parentComments as parentComment}
        
                <Comment isReply={false} comment={parentComment} bind:showModal bind:replyingTo commentID={parentComment._id.toString()}/>

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