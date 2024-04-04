<script>

    export let neighbors;
    export let all;
    import { page } from '$app/stores'
    import { onMount } from 'svelte'
    import { notifications} from '$lib/notifications'

    console.log(neighbors)
    console.log(all)
    
    $: friendRequests = []
    $: console.log(friendRequests)

    var username
    if($page.data.user == undefined){
        username = null
    } else {
        username = $page.data.user.username
    }
    console.log(username)



    const fetchRequests = async() => {
        let res = await fetch(`/api/friendRequests/${username}`)
        friendRequests = await res.json()
    }

    const handleAccept = async(name) => {
        await fetch(`/api/friendRequests/accept/${$page.data.user.username}/${name}`, {method : 'POST'})
        notifications.success('Successfully added as a neighbor!', 5000)
        await fetchRequests()
        
    }

    const handleDecline = async(name) => {
        await fetch(`/api/friendRequests/decline/${$page.data.user.username}/${name}`, {method : 'POST'})
        notifications.success('Successfully declined request!', 5000)
        await fetchRequests()
        
    }


</script>


<div class="kwarto-list-holder full-width">
    <div class="icon-title-holder">
        <img src="/assets/neighbors.svg" alt="apartments icon"><big>neighbors</big>
        </div>

    <div class="neighbor-list">

        {#await fetchRequests()}
        {:then}
        {#key friendRequests}
        {#if friendRequests.length > 0}
        <h3>Friend Requests ({friendRequests.length})</h3>
            {#each friendRequests as request}
            <span class="friend-req">
                <a href={'/n/'+request.username} >
                    <span class="pointer"> 
                        <img src={request.pfp} alt="profile picture"> 
                        <p>{request.username} </p> 
                    </span>
                </a> 
                
                <div class="button-holder">
                <button class="action-button pointer" on:click={handleAccept(request.username)}><img src="/assets/check.svg"></button> <button on:click={handleDecline(request.username)} class="action-button pointer"><img src="/assets/cross-out.svg"></button></div></span>
            {/each}
            <hr>
        {/if}
        {/key}
        {/await}

        {#if $page.data.user}

            {#if neighbors && neighbors.length > 0}
            <h3>Your neighbors ({neighbors.length})</h3>
                {#each neighbors as neighbor}
                <a href={'/n/'+neighbor.username} ><span class="pointer"> <img src={neighbor.pfp} alt="profile picture"> <p>{neighbor.username} </p> </span></a>
                {/each}

            {:else}
            <h3>Your neighbors (0)</h3>
                Add more neighbors!
            {/if}

            {:else}
            Sign in to see your neighbors!

        {/if}

        <hr>

        <h3>All users</h3>
        {#each all as user}
        <a href={'/n/'+user.username} ><span class="pointer"> <img src={user.pfp} alt="profile picture"> <p>{user.username} </p> </span></a>
        {/each}
    </div>

</div>

<style>

    a{
        color: black;
        text-decoration: none;
    }

    big{
        font-size: var(--fs-l);
    }

    .neighbor-list{
        max-height: 23rem;
        overflow: auto;  
    }

    ::-webkit-scrollbar{
        background: transparent;
        width: 10px;
        
    }

    .friend-req{
        display: flex;
        justify-content:space-between;
    }

    .neighbor-list::-webkit-scrollbar-thumb{
        background-color: transparent;
        border-radius: 1em;
        width: 10px;
        transition: background-color 0.3s ease-out;
        
        
    }

    .neighbor-list:hover::-webkit-scrollbar-thumb{
        background-color: lightgray;
        border-radius: 1em;
        width: 10px;
        
        
    }
        

     .kwarto-list-holder{
        background-color: var(--background-color);
        padding: var(--fs-m);
        padding-left: calc(var(--fs-m) * 1.0);
        border-radius: 1em;

        text-align: left;

        display: flex;
        flex-direction: column;
        gap: calc(var(--fs-m))
    }

    .button-holder{
        justify-self: end;
        display: flex;
        justify-content: space-between;
        gap: 1em;
    }

    span span:hover{
        background-color: transparent;
    }

    .action-button{
        object-fit: contain;
        overflow: hidden;
        height: calc(var(--fs-l) * 1.0);
        width: calc(var(--fs-l) * 1.0);
        padding: 0px;
    }

    .action-button img{
        height: 90%;
    }

    .kwarto-list-holder span:hover{
        background-color: var(--button-contrast-color);
    }

    .kwarto-list-holder *{
        background-color: transparent;
    }

    span{
        display: flex;
        align-items: center;
        justify-content: left;
        line-height: auto;
        gap: var(--fs-l);
        padding: 3px;
        border-radius: 1em;

        transition: background-color 1s ease;
    }

    span img{
        height: calc(var(--fs-m) * 3);
        width: calc(var(--fs-m) * 3);
        object-fit: cover;
        border-radius: 3em;
    }

    .icon-title-holder{
        display: flex;
        justify-content: left;
        align-items: center;
        min-height: auto;
        width: 90%;

        border-style: none;
        border-radius: 0.1em;

        gap: calc(0.9 * var(--fs-m));
    }

    .icon-title-holder img{
        width: calc(var(--fs-l) * 1.5);
        padding-bottom: calc(var(--fs-m) * 0.5);

    }

</style>