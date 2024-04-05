<script>
    import { page } from  '$app/stores'
    import { goto } from '$app/navigation'
    import Modal from '$lib/components/Modal.svelte'
    import EditComm from '$lib/components/EditComm.svelte'
    
    export let comment = null;


   
    //console.log($page.data)

    let showDropdown = false;    

    let showModalDelete = false;
    let showModalEdit = false;

    const handleDelete = async(comment) => {
        console.log(comment._id.toString())
        const response = await fetch (`/api/comments/delete/${comment._id.toString()}`)
        console.log('successfully deleted')
        location.reload()

        showModalDelete = false
    }

    const handleEdit = async(comment) => {

    }


</script>

<Modal bind:showModal={showModalDelete}>
    <article class="full-width">
    <h1>Are you sure you want to delete your comment?</h1>
    <button on:click={handleDelete(comment)} class="action-button full-width"> Yes </button>
    <button on:click={() => {showModalDelete = false}} class="action-button full-width"> No </button>
    </article>
</Modal>

{#if showModalEdit}

<Modal bind:showModal={showModalEdit}>
    <EditComm postID={comment._id} content={comment.content}/>

</Modal>

{/if}



<button class="action-button pointer" on:click={() => {showDropdown = !showDropdown;}}><img src="/assets/more-vert.svg"></button>
{#if showDropdown}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="dropdown-content" on:mouseleave={()=>{showDropdown = !showDropdown}}>
        {#if $page.data.user && $page.data.user.username === comment.author}
        <button on:click={() => {showModalEdit = true}}>Edit</button>
        <button on:click={() => {showModalDelete = true}}>Delete</button>
        {/if}
        <button href="#">Share</button>
    </div>
{/if}    

<style>

    article{
        display: flex;
        align-items: center;
        align-self: center;
        min-width: 100%;
    }

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
    .dropdown-content button {
        display: block;
        color: #000000;
        padding: 5px;
        text-decoration: none;
        border: none;
    }

    .dropdown-content button:hover {
        color: #FFFFFF;
        background-color: var(--accent-color);
    }
</style>

    


