  <script>

      import Vote from '$lib/components/Vote.svelte';
      import Dropdown from '$lib/components/Dropdown.svelte';
      import { goto } from '$app/navigation';

      export let data;

      //if component is hidden, show only first 150 characters of the post then add like an "ombre" or box-shadow top to the footer so that it looks transparent.
      export let hidden = true;
      let isEdited = data.isEdited;

      let gradient = hidden;
      
      let kwarto = data.kwarto;
      let kwarto_logo = "/assets/logo.svg"
      let author = data.deleted ? "[deleted]" : data.username;
      let timePosted = data.datePosted;
      let time = timeAgo(timePosted);
      let title = data.deleted ? "[deleted]" : data.title;
      let content = data.deleted ? "[deleted]" : data.content;


      export let showModal = false
      export let replyingTo = null

      const vote = {
        isPost: true,
        postID: data._id,
        voteCount: data.voteCount
      }

      // console.log(vote)

  function comment(){

    if(hidden){
      showModal = true
      goto('/k/'+kwarto+'/'+data._id+'/comments?showModal=true')

      
    }else{
      console.log('i was called')
      showModal = true
      replyingTo = null
    }
  
  }

    // TODO: export this function to its separate .js file
  function timeAgo(datetime) {
  const now = new Date();
  const diff = now - datetime;

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



      export let upvote = data.voteCount;

  </script>

  {#if hidden}
  <article class="full-width pointer" 
    on:mouseenter={() => {
      if (hidden) gradient = false}} 
    on:mouseleave={() => {
      if (hidden) gradient = hidden}}>
      <header>
          <div class="logo-kwarto-holder">
          <a href={"/k/"+kwarto} class="logo-kwarto-holder">
            <img class="class-logo" src={kwarto_logo}> <img src="/assets/circle.svg" class="circle"> <small>{kwarto}</small>
          </a>

          <div class="options"> <Dropdown post={data}/> </div>

          </div>

          <a href={'/k/'+kwarto+'/'+data._id+'/comments'}><h1>{title}</h1></a><a href={"/n/"+author}><i>— {"n\\"+author}</i></a>
            
            <small>{time} {#if isEdited} (edited) {/if}</small>
      </header>
      <a href={'/k/'+kwarto+'/'+data._id+'/comments'}>
      <span class:hidden={gradient}>
        {@html content}
      </span>
      </a>
      <footer>
        <Vote data={vote}/> <div class="action-button" on:click={() => {comment()} }> <img src="/assets/comment-icon.svg" alt="reply button">  <b>Comment</b> </div>
         <div class="action-button"> <img src="/assets/share-icon.svg"> <b>Share</b> </div>
      </footer>
  </article>

  {:else}
    <article class="full-width pointer" 
      on:mouseenter={() => {
        if (hidden) gradient = false}} 
      on:mouseleave={() => {
        if (hidden) gradient = hidden}}>
        <header>

            <div class="logo-kwarto-holder">
            
            
            <a href={"/k/"+kwarto} class="logo-kwarto-holder">
              <img class="class-logo" src={kwarto_logo}> <img src="/assets/circle.svg" class="circle"> <small>{kwarto}</small>
            </a>
            <div class="options"> <Dropdown post={data}/> </div>
  
            </div>
  
            <a href={'/k/'+kwarto+'/'+data._id+'/comments'}><h1>{title}</h1></a><a href={"/n/"+author}><i>— {"n\\"+author}</i></a>
            
            <small>{time} {#if isEdited} (edited) {/if}</small>
        </header>
        {#key content}
          <span class:hidden={gradient}>
            {@html content}
          </span>
        {/key}
        <footer>
          <Vote data={vote}/> <div class="action-button" on:click={() => {comment()}}> <img src="/assets/comment-icon.svg" alt="reply button"> <b>Comment</b> </div>
           <div class="action-button"> <img src="/assets/share-icon.svg"> <b>Share</b> </div>
        </footer>
    </article>

  {/if}


 

  <style>

    header > a{
      display: inline
    }


    .action-button-text b{
      background-color: transparent;
    }

    a{
      text-decoration: none;
      color: var(--text-color);
      background-color: transparent;
      display: flex;
    }

  .hidden {
      position: relative;
      max-height: calc(var(--fs-m) * 5);
      overflow: hidden;
  }

  .circle{
    height : calc(var(--fs-m) * 0.5)
  }

  .class-logo{
    height : calc(var(--fs-m) * 1.3);
  }

  .logo-kwarto-holder{
    display: flex;
    gap: calc(var(--fs-m) * 0.4);
    align-items: center;
    width: 100%;
  }

  .hidden::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 50%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75) 30%);
    pointer-events: none;
    overflow: hidden;
    z-index: 1;
  }


  small {
    font-size: calc(0.8 * var(--fs-m));
    opacity: 0.85;
  }

  </style>