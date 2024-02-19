<script>
    let title = 'this is a test title';
    let author = 'n\\eggylord';
    let time = '1d';

    let content = "Hi! I'm an incoming engineering college freshman and during my jhs and shs days, I always consumed coffee. Especially during hell weeks or if may big event that day. Most of my coffees are usually those cheap P30 Lucky day from 7/11 or food panda orders. I don't have a particularly favorite shop I order from since it usually depends what I'm feeling, my budget, and if I think I need a bit more caffeine kick. This summer I've been experimenting and kind of trying to find coffee that works well with what I need and I've come to the conclusion that I really like iced Americano, Caramel Macchiato, and ordinary lattes. I'll be going to an expensive university and I don't want to spend a lot of money on just coffee, maybe the occasional monthly treats but definitely not a regular. I want to know if you guys have any coffee recommendations for students. I plan to make coffee at home then pack them in a different water bottle and take it to school. My family highly discourages those 2-in-1 coffee packets so maybe any recommendations that are a bit more on the healthier side but still affordable for students hehe.";

    let upvote = 15;

</script>

<article>
    <header>
        <strong>{title}</strong> — <i>{author}</i> <small>{time}</small>
    </header>
    <p>
      {content}
    </p>
    <footer>
        {upvote}
    </footer>
</article>


<style>

article {
  display: flex;
  flex-direction: column;
  gap: var(--fs-m);
  margin-bottom: var(--fs-m);
  padding: var(--fs-m);
  border-radius: 0.5rem;
  background: var(--background-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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