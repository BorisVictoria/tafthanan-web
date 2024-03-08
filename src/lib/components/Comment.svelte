<script>
    import Vote from '$lib/components/Vote.svelte'


    export let comment;

    const fetchChildrenComments = async(id) => {

        const stringify = id.toString()
        console.log(stringify)
        const response = await fetch(`/api/comments/${stringify}`)
        const children = await response.json()
        return children
    }

    export let pfp = '/assets/login-poster.png';
    export let author = "n\\eggylord"
    export let time = '1d'
    let message = comment.content;
    let votes = comment.voteCount;
    let isEdited = comment.isEdited;
</script>

<article class="full-width reply-container">
      <header>
        <div class="pfp-name-time">
           <img src={pfp}> <i>{author}</i> <small>{time} {#if isEdited} (edited) {/if}</small> 
        </div>
           <div class="action-button pointer"> <img src="/assets/more-vert.svg"> </div>
      </header>

    {@html message}
    <footer>
        <Vote votes={votes}/> <div class="action-button"> <img src="/assets/comment-icon.svg" alt="reply button"> </div>
         <div class="action-button"> <img src="/assets/share-icon.svg"></div>
    </footer>


    {#await fetchChildrenComments(comment._id)}
    {:then children}
    <div class="replies-holder">
    {#each children as child}
        <svelte:self comment={child}/>
    {/each}
    </div>
    {/await}
   
</article>

<style>

    article{
        gap: calc(var(--fs-m) * 0.8);
    }

    .replies-holder{
        border-left: solid lightgray 2px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }


    .pfp-name-time img{
        height: calc(var(--fs-l) * 1.5);
        width: calc(var(--fs-l) * 1.5);
        object-fit: cover;
        
        border-radius: 3em;
    }

    small{
        font-size: 0.7rem;
    }



    .pfp-name-time{
        display: flex;
        align-items: center;
        gap: calc(var(--fs-l));
    }

    header{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>