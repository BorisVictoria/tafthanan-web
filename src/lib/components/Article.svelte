  <script>

      import Vote from '$lib/components/Vote.svelte';

      //if component is hidden, show only first 150 characters of the post then add like an "ombre" or box-shadow top to the footer so that it looks transparent.
      export let hidden = true;
      export let comment_count = 10;


      let gradient = hidden;

      let title = 'baka naman pumangit if mahaba-haba yung title...';
      let author = 'n\\eggylord';
      let time = '1d';

      let kwarto_logo = "assets/logo.svg"
      let kwarto = 'k\\all';

      let content = "Hi! I'm an incoming engineering college freshman and during my jhs and shs days, I always consumed coffee. Especially during hell weeks or if may big event that day. Most of my coffees are usually those cheap P30 Lucky day from 7/11 or food panda orders. I don't have a particularly favorite shop I order from since it usually depends what I'm feeling, my budget, and if I think I need a bit more caffeine kick. This summer I've been experimenting and kind of trying to find coffee that works well with what I need and I've come to the conclusion that I really like iced Americano, Caramel Macchiato, and ordinary lattes. I'll be going to an expensive university and I don't want to spend a lot of money on just coffee, maybe the occasional monthly treats but definitely not a regular. I want to know if you guys have any coffee recommendations for students. I plan to make coffee at home then pack them in a different water bottle and take it to school. My family highly discourages those 2-in-1 coffee packets so maybe any recommendations that are a bit more on the healthier side but still affordable for students hehe.";

      //make a media component, either one video or 1-10 pics let's go team!

      if (hidden) {
        content = content.slice(0, 450);
        content += "  ...";
      }

      let upvote = 15;

  </script>

  <article class="pointer" on:mouseenter={() => {if(hidden) gradient = false}} on:mouseleave={() => {if(hidden) gradient = hidden}}>
      <header>
          <div class="logo-kwarto-holder">
          <img class="class-logo" src={kwarto_logo}> <img src="assets/circle.svg" class="circle"> <small>{kwarto}</small>

          <div class="action-button options"> <img src="assets/more-vert.svg"> </div>

          </div>

          <h1>{title}</h1> — <i>{author}</i> <small>{time}</small>
      </header>
      <span class:hidden={gradient}>
        {content}
      </span>
      <footer>
        <Vote/> <div class="action-button"> <img src="assets/comment-icon.svg" alt="reply button"> <div class="action-button-text"> {comment_count} </div> </div>
         <div class="action-button"> <img src="assets/share-icon.svg"> <b>Share</b> </div>
      </footer>
  </article>


  <style>

  .action-button{
    display:flex;
    justify-content: center;
    align-items: center;
    gap: calc(0.3 * var(--fs-m));;
    
    border-style: solid;
    border-width: 1px;
    padding-left: calc(var(--fs-m));
    padding-right: calc(var(--fs-m));
    border-radius: var(--fs-l);
    border-color: lightgray;

    height: auto;
  }

  .options{
    width: auto;
    height: auto;
    padding-left:  0;
    padding-right: 0;

    border-style: none;
    align-self: right;
    margin-left: auto;
    overflow: auto;
  }

  .options > img{
    height: calc(var(--fs-m) * 2);
  }



  .action-button > b{
    background-color: inherit;
  }

  .action-button:hover{
    border-color: var(--accent-color);
    background-color: lightgray;
  }

  .action-button > img{
    width: 60%;
    background-color: inherit;
  }

  .action-button-text{
    text-align: center;
    background-color: inherit;
  }

  .hidden {
      position: relative;
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
    z-index: 1;
  }


  small {
    font-size: calc(0.8 * var(--fs-m));
    opacity: 0.85;
  }

  footer {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: calc(var(--fs-m) * 1.75)
  }

  article {
    display: flex;
    flex-direction: column;
    gap: var(--fs-m);
    margin-bottom: var(--fs-m);
    padding: var(--fs-m);
    border-radius: 0.5rem;
    background: var(--background-color);
    max-width: 90%;
  }

  article > header {
    border-bottom: 1px solid lightgray;
    padding: 0 0 var(--fs-m) 0;
  }

  article > footer {
    border-top: 1px solid lightgray;
    padding: var(--fs-m) 0 0 0; 
  }

  </style>