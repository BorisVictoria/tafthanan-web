<script>
    
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
</div>

<style>
    .main {
        display: grid;
        grid-template-columns: 1fr;
    }

    @media (min-width: 768px) {
        .main {
            grid-template-columns: 3fr 1fr;
            grid-template-areas: "middle right";
        }

    }

    @media (min-width: 1280px) {
        .main {
            grid-template-columns: 1fr 3fr 1fr;
            grid-template-areas: "left middle right";
        }
        
    }

</style>
