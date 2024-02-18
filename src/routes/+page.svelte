<script>

    import Article from '$lib/components/Article.svelte'
    
    let count = 0;
    $: double = count * 2;

    function increment() {
        count++;
        
    }

    setInterval(() => {
        count++;
       
    }, 2000)

</script> 

<div class="wrapper main">
    <div class="left">
        dito pala dapat nilalagay
    </div>
    <div class="middle">
        <Article>
        </Article>

        <hr>

        <Article>
        </Article>
    </div>
    <div class="right">
        Test
    </div>
</div>


<style>

    @media (min-width: 475px){
        .main {
            display: grid;
            grid-template-columns: 1fr;
        }

        .left, .right{
            display: none;
        }

        .middle{
            display: block;
        }
    }   

    @media (min-width: 768px) {
        .main {
            grid-template-columns: 3fr 1fr;
            grid-template-areas: "middle right";
        }

        .left{
            display: none;
        }

        .middle, .right{
            display: flex;
            align-items: center;
            justify-content: center;
        }

    }

    @media (min-width: 1280px) {
        .main {
            grid-template-columns: 1fr 3fr 1fr;
            grid-template-areas: "left middle right";
        }

        .left, .middle, .right{
            display: block;
        }
        
    }

</style>
