  <script>

      import Vote from '$lib/components/Vote.svelte';



      //if component is hidden, show only first 150 characters of the post then add like an "ombre" or box-shadow top to the footer so that it looks transparent.
      export let hidden = false;

      let title = 'baka naman pumangit if mahaba-haba yung title...';
      let author = 'n\\eggylord';
      let time = '1d';

      let content = "Hi! I'm an incoming engineering college freshman and during my jhs and shs days, I always consumed coffee. Especially during hell weeks or if may big event that day. Most of my coffees are usually those cheap P30 Lucky day from 7/11 or food panda orders. I don't have a particularly favorite shop I order from since it usually depends what I'm feeling, my budget, and if I think I need a bit more caffeine kick. This summer I've been experimenting and kind of trying to find coffee that works well with what I need and I've come to the conclusion that I really like iced Americano, Caramel Macchiato, and ordinary lattes. I'll be going to an expensive university and I don't want to spend a lot of money on just coffee, maybe the occasional monthly treats but definitely not a regular. I want to know if you guys have any coffee recommendations for students. I plan to make coffee at home then pack them in a different water bottle and take it to school. My family highly discourages those 2-in-1 coffee packets so maybe any recommendations that are a bit more on the healthier side but still affordable for students hehe.";

      //make a media component, either one video or 1-10 pics let's go team!

      if(hidden){
        content = content.slice(0, 450);
        content += "  ...";
      }

      let upvote = 15;

  </script>

  <article>
      <header>
          <h1>{title}</h1> — <i>{author}</i> <small>{time}</small>
      </header>
      <p  class:hidden={hidden}>
        {content}
      </p>
      <footer>
          <Vote/>
      </footer>
  </article>


  <style>

  .hidden {
      position: relative;
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

  small{
    font-size: calc(0.8 * var(--fs-m));
    opacity: 0.85;
  }

  footer{
    display: flex;
    justify-content: right;
  }

  article {
    display: flex;
    flex-direction: column;
    gap: var(--fs-m);
    margin-bottom: var(--fs-m);
    padding: var(--fs-m);
    border-radius: 0.5rem;
    background: var(--background-color);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease;
    max-width: 90%;
  }

  article:hover {
    box-shadow: 0 0 10px rgba(0, 100, 0, 0.5)
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