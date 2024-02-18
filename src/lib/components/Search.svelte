<script>


</script>

<div class="search-container">
    <img src="/assets/search.svg" alt="search icon">
    <input type="search" name="search" placeholder="Search">
</div>

<style>

    .search-container {
        display: flex;
        padding-left: var(--fs-m);
        gap: var(--fs-m);
        border: 2px lightgray solid;
        border-radius: var(--fs-l);
        overflow: hidden;
        
    }

    .search-container:focus-within {
        border: 2px var(--primary-color) solid;
    }

    input {
        border: 0;
        font-size: var(--fs-m);
    }

    input:focus {
        outline: none;
    }

</style>