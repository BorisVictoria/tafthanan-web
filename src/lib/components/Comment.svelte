<script>

    import Vote from '$lib/components/Vote.svelte'

    export let isEdited = false;

    export let pfp = '/assets/login-poster.png';
    export let author = "n\\eggylord"
    export let time = '1d'
    export let message = 'Ang galing galing mo!'
    export let replies = [
                        {author : 'n\\eggylord', time: '1d', message: 'Ang galing galing mo nga!', replies: [
                            {author : 'n\\eggylord', time: '1d', message: 'NESTED!!!', replies: [
                                {author : 'n\\eggylord', time: '1d', message: 'Can\'t believe it!!!', replies: [], votes: 15},
                                {author : 'n\\eggylord', time: '1d', message: 'Okay na muna \'to', replies: [], votes: 15}

                            ], votes: 15}
                        ], votes: 15},
                        {author : 'n\\eggylord', time: '1d', message: 'Ang galing galing mo nga!', replies: [], votes: 15},
                    ]
    export let votes = 15
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
         <div class="action-button"> <img src="/assets/share-icon.svg"> <b>Share</b> </div>
    </footer>

    <div class="replies-holder">
    {#each replies as reply}
        <svelte:self author={reply.author} time={reply.time} replies={reply.replies} message={reply.message} votes={reply.votes}/>
    {/each}
    </div>
   
</article>

<style>

    article{
        gap: calc(var(--fs-m) * 0.8);
    }

    .replies-holder{
        border-left: solid lightgray;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }


    .pfp-name-time img{
        height: calc(var(--fs-l) * 2);
        width: calc(var(--fs-l) * 2);
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