<script>

    import { goto } from '$app/navigation'
    import { page } from '$app/stores'

    let searchTerm = ""
    let placeHolder = "Search"

    const handleSubmit = (e) => {
        console.log('im running')

        const pattern = new RegExp("^.*\/(?:[^\/]+\/){0,}search\/[^\/]+\/?$")

        function replacesearchTerm(currentUrl, newTerm){
            console.log(currentUrl, newTerm)
            const urlParts = currentUrl.split('/');
    
            // Find the index of the last term you want to replace
            const lastIndex = urlParts.length - 1; // -2 because we want the second to last part
    
            // Replace the last term with the new term
            urlParts[lastIndex] = newTerm;
            console.log(urlParts)
    
            // Construct the new URL
            const newUrl = urlParts.join('/');
            return newUrl
            }


        if(searchTerm === "") return

        const urlPath = $page.url.pathname

        console.log(urlPath)
        console.log(pattern.test(urlPath))
        if(pattern.test(urlPath)){
            goto(replacesearchTerm(urlPath, searchTerm))
        } else {
            if(urlPath == '/'){
                goto(`/search/${searchTerm}`)
            }
            goto(urlPath+`/search/${searchTerm}`)
        }

        searchTerm = ""
    }

    $: if($page.url.pathname.includes("/k/")){
        const parts = $page.url.pathname.split('/')
        placeHolder = "Search " + "k\\"+parts[2]
    }
    
</script>

<form on:submit|preventDefault={handleSubmit}>
    <div class="search-container">
        <button>
            <img src="/assets/search.svg" alt="search icon">
        </button>
        <input type="search" name="search" placeholder={placeHolder} bind:value={searchTerm}>
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