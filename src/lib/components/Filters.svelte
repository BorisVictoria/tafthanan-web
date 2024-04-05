
<!-- This component is a radio input that should allow the user to select whether they want the posts to be sorted by top, new, default-->
<!-- Should also contain a hamburger on mobile view to show settings/left div-->

<script>
    import { goto } from "$app/navigation"
    import { onMount } from 'svelte'

    let newChecked = false
    let topChecked = false

    let sortBy = 'new';
    onMount(() => {
        const params = new URLSearchParams(window.location.search)
        console.log(params)

        if(params.has('sortBy')){
            sortBy = params.get('sortBy')
        }

        console.log(topChecked)
        console.log(newChecked)
        
    })




</script>

<article class="full-width filter">
    <form name="filter" class="filter">
        
        <strong>Sort by:</strong>

        
        <input type="radio" id="top" name="filter-by" value="top" bind:group={sortBy} on:click={() => {goto('?sortBy=top')}}>
        <div class="action-button pointer">
        <label for="top"><strong>Top<strong></label>
        </div>

        <input type="radio" id="new" name="filter-by" value="new" bind:group={sortBy} on:click={() => {goto('?sortBy=new')}}>
        <div class="action-button pointer">
        <label for="new"><strong>New</strong></label>
        </div>

    </form>
</article>

<style>
    .filter{
        gap : calc(var(--fs-m) * 0.75);
        flex-direction: row;
        display: flex;
    }

    label, input, strong{
        background-color: inherit;
        cursor: inherit;
    }

    .filter .action-button{
        height: auto;
        width: auto;
        overflow: hidden;
    }

    .filter input{
        display: none;
    }

    .action-button label{
        margin: 0 calc(var(--fs-m) * -1);
        padding: 0 calc(var(--fs-m));
    }

    .filter input:checked + .action-button{
        background-color: var(--accent-color); /* Change background color when checked */
        color: var(--background-color); /* Change text color when checked */
    }

</style>