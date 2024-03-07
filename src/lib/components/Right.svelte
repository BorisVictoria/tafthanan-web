<script>

export let neighbors = [{username: "n\\eggylord", pfp: "/assets/default-pfp.png"}, {username: "n\\eggylord", pfp: "/assets/default-pfp.png"}, {username: "n\\eggylord", pfp: "/assets/default-pfp.png"}, {username: "n\\eggylord", pfp: "/assets/default-pfp.png"}, {username: "n\\eggylord", pfp: "/assets/default-pfp.png"}, {username: "n\\eggylord", pfp: "/assets/default-pfp.png"}, {username: "n\\eggylord", pfp: "/assets/default-pfp.png"}, {username: "n\\eggylord", pfp: "/assets/default-pfp.png"}, {username: "n\\eggylord", pfp: "/assets/default-pfp.png"}, {username: "n\\eggylord", pfp: "/assets/default-pfp.png"}, {username: "n\\eggylord", pfp: "/assets/default-pfp.png"}, {username: "n\\eggylord", pfp: "/assets/default-pfp.png"}, {username: "n\\eggylord", pfp: "/assets/default-pfp.png"}, {username: "n\\eggylord", pfp: "/assets/default-pfp.png"}, {username: "n\\eggylord", pfp: "/assets/default-pfp.png"}, {username: "n\\eggylord", pfp: "/assets/default-pfp.png"}, {username: "n\\eggylord", pfp: "/assets/default-pfp.png"}]

</script>


<div class="kwarto-list-holder full-width">
    <div class="icon-title-holder">
        <img src="/assets/neighbors.svg" alt="apartments icon"><big>neighbors</big>
        </div>

    <div class="neighbor-list">
        {#if neighbors.length == 0}
        <div><u>Follow people as neighbors.</u></div>
        {/if}

        {#each  neighbors as neighbor}
        <span class="pointer"> <img src={neighbor.pfp}> <p><a> <u> {neighbor.username} </u> </a> </p> </span>
        {/each}
    </div>

</div>

<style>

    big{
        font-size: var(--fs-l);
    }

    .neighbor-list{
        max-height: 23rem;
        overflow: hidden;   
    }

    .neighbor-list:hover{
        overflow: auto;
    }

    ::-webkit-scrollbar{
        background: transparent;
        width: 10px;
        
    }

    ::-webkit-scrollbar-thumb{
        background-color: lightgray;
        border-radius: 1em;
        width: 10px;
        
    }

     .kwarto-list-holder{
        background-color: var(--background-color);
        padding: var(--fs-m);
        padding-left: calc(var(--fs-m) * 1.0);
        border-radius: 1em;

        text-align: left;

        display: flex;
        flex-direction: column;
        gap: calc(var(--fs-m))
    }

    .kwarto-list-holder span:hover{
        background-color: var(--button-contrast-color);
    }

    .kwarto-list-holder *{
        background-color: transparent;
    }

    span{
        display: flex;
        align-items: center;
        justify-content: left;
        line-height: auto;
        gap: var(--fs-l);
        padding: 3px;
        border-radius: 1em;

        transition: background-color 1s ease;
    }

    span img{
        height: calc(var(--fs-m) * 3);
        border-radius: 3em;
    }

    .icon-title-holder{
        display: flex;
        justify-content: left;
        align-items: center;
        min-height: auto;
        width: 90%;

        border-style: none;
        border-radius: 0.1em;

        gap: calc(0.9 * var(--fs-m));
    }

    .icon-title-holder img{
        width: calc(var(--fs-l) * 1.5);
        padding-bottom: calc(var(--fs-m) * 0.5);

    }

</style>