<script>
    import {EJSON} from 'bson'
    import Comment from '$lib/components/Comment.svelte'
    
    export let data
    data = EJSON.deserialize(data)
    const {post} = data

</script>

<h1>Title: {post.title}</h1>
<p>PostID: {post._id}</p>
<p>Content: {post.content}</p>
{#each post.tags as tag}
<h2>Tag: {tag}</h2>
{/each}
<p>Votes: {post.voteCount}</p>
<p>Date Posted: {post.datePosted}</p>
<hr>
{#each post.parentComments as parentComment}
    <Comment comment={parentComment} margin={0}/>
{/each}

<style>
    p {
        color: black
    }
</style>