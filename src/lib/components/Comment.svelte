<script>
    export let comment
    export let margin;
    console.log(margin)

    const fetchChildrenComments = async(id) => {

        const stringify = id.toString()
        console.log(stringify)
        const response = await fetch(`/api/comments/${stringify}`)
        const children = await response.json()
        return children
    }
    
</script>

<h3>{#each {length: margin} as _, i}={/each}Comment</h3>
<p>{#each {length: margin} as _, i}={/each}CommentID: {comment._id}</p>
<p>{#each {length: margin} as _, i}={/each}PostID: {comment.postID}</p>
<p>{#each {length: margin} as _, i}={/each}Parent Comment: {comment?.parentComment}</p>
<p>{#each {length: margin} as _, i}={/each}Content: {comment.content} </p>
<p>{#each {length: margin} as _, i}={/each}Votes: {comment.voteCount} </p>
<p>{#each {length: margin} as _, i}={/each}isEdited: {comment.isEdited}</p>

{#await fetchChildrenComments(comment._id)}
    <p>Fetching</p>
{:then children}
    {#if (children !== null)}
    {#each children as child}
        <svelte:self comment={child} margin={margin + 1}/>
    {/each}
    {/if}
{:catch error}
    <p style="color: red">error.message</p>
{/await}

<style>
    p {
        color: black
    }
</style>