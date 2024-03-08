<script>
    import Vote from '$lib/components/Vote.svelte'


    export let comment;

    

    const fetchChildrenComments = async(id) => {

        const stringify = id.toString()
        const response = await fetch(`/api/comments/${stringify}`)
        const children = await response.json()
        return children
    }

    export let pfp = '/assets/login-poster.png';
    export let author = "n\\eggylord"
    let message = comment.content;
    let votes = comment.voteCount;
    let isEdited = comment.isEdited;
    let time = timeAgo(comment.timePosted);


    function timeAgo(datetime) {
  const now = new Date();
  const diff = now - datetime;

  console.log(datetime)
  console.log(now)
  console.log(diff)

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return 'just now';
  } else if (minutes === 1) {
    return '1m';
  } else if (minutes < 60) {
    return `${minutes}m`;
  } else if (hours === 1) {
    return '1h';
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days === 1) {
    return '1d';
  } else if (days < 7) {
    return `${days}d`;
  } else if (weeks === 1) {
    return '1w';
  } else if (weeks < 4) {
    return `${weeks}w`;
  } else if (months === 1) {
    return '1mo';
  } else if (months < 12) {
    return `${months}mo`;
  } else if (years === 1) {
    return '1y';
  } else {
    return `${years}y`;
  }
}

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