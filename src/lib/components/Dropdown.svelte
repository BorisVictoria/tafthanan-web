<script>
    import { page } from  '$app/stores'
    export let post;

    let showDropdown = false;    

    console.log($page.data.user.username) 
    console.log(post.username)

</script>

<button class="action-button pointer" on:click={() => {showDropdown = !showDropdown;}}><img src="/assets/more-vert.svg"></button>
{#if showDropdown}
    <div class="dropdown-content" on:mouseleave={()=>{showDropdown = !showDropdown}}>
        {#if $page.data.user.username === post.username}
        <a href="#">Edit</a>
        <a href="#">Delete</a>
        {/if}
        <a href="#">Share</a>
    </div>
{/if}    

<style>
    .dropdown {
        display: inline-block;
        position: relative;
        width: 10%;
    }

    .dropdown-content {
        position: absolute;
        width: 5rem;
        overflow: auto;
        border-radius: 0.5em;
    }
    .dropdown-content a {
        display: block;
        color: #000000;
        padding: 5px;
        text-decoration: none;
    }

    .dropdown-content a:hover {
        color: #FFFFFF;
        background-color: var(--accent-color);
    }
</style>

    


