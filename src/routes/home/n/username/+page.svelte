<script>

    import Article from '$lib/components/Article.svelte'
    import Filters from '$lib/components/Filters.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import Left from '$lib/components/Left.svelte'
    import Right from '$lib/components/Right.svelte'
    import ProfileHead from '$lib/components/ProfileHead.svelte'
    
    let articles = 5;

    let showModal = false;

    //use this to make modal appear: <button on:click={() => {showModal = true;}}>Write a post</button>

</script> 

<Modal bind:showModal/>

<div class="wrapper main">

    <div class="left">
        <Left />
    </div>
    <div class="middle">

    <ProfileHead/>

    <Filters/>
    
    {#each {length: articles} as _, i}
        <Article hidden/>
    {/each}
    </div>
    <div class="right">
        <Right/>
    </div>
</div>


<style>


    @media (min-width: 0px) {

        .main {
            display: grid;
            grid-template-columns: 1fr;
        }

        .left, .right{
            display: none;
        }

        .middle {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }   

    @media (min-width: 768px) {

        .main {
            grid-template-columns: 3fr 1fr;
            grid-template-areas: "middle right";
        }

        .right{
            display: flex;
            flex-direction: column;
            align-items: center;
        }

    }

    @media (min-width: 1280px) {

        .main {
            grid-template-columns: 1fr 3fr 1fr;
            grid-template-areas: "left middle right";
        }

        .left {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: var(--background-color);
        }
        
    }

</style>
