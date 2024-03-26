<script>

    import { goto } from '$app/navigation'

    let searchTerm = ""

    const handleSubmit = (e) => {
        console.log('im running')

        if(searchTerm === "") return

        goto(`/search/${searchTerm}`)
        searchTerm = ""
    }
    
</script>

<form on:submit|preventDefault={handleSubmit}>
    <div class="search-container">
        <button>
            <img src="/assets/search.svg" alt="search icon">
        </button>
        <input type="search" name="search" placeholder="Search" bind:value={searchTerm}>
    </div>
</form>

<style>

    button {
        border: none;
    }

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