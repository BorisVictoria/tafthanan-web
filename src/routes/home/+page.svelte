<script>

    import Article from '$lib/components/Article.svelte'
    
    let articles = 5;

</script> 

<div class="wrapper main">
    <div class="left">
        
    </div>
    <div class="middle">
    {#each {length: articles} as _, i}
        <Article hidden/>
    {/each}
    </div>
    <div class="right">
        
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
        }
        
    }

</style>
