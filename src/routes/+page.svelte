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

<div class="wrapper">
    <p>The number of times I've had it is {count}</p>
</div>

<style>

</style>
