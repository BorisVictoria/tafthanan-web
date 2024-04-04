<script>

    import Button from '$lib/components/Button.svelte'
    import { page } from '$app/stores'
    import { notifications } from '$lib/notifications'
    
    export let data;

    let username = "n\\" + data.username;
    let pfp = data.pfp;
    let name = data.username;
    let bio = data.bio;


    let hasPendingRequest = false;

    const getPendingRequest = async() => {
        let status = await fetch(`/api/friendRequests/findRequest/${$page.data.user.username}/${name}`)
        hasPendingRequest = await status.json()
        console.log(hasPendingRequest)
    }
    let btnAction = "Add Neighbor"


    $: if($page.data.user.friends !== undefined && $page.data.user.friends.includes(data.username)){
        btnAction = "Remove Neighbor"
    } 
    
    
    $: if(hasPendingRequest === "sentRequest") {
        btnAction = "Cancel"
    } else if(hasPendingRequest === "receivedRequest") {
        btnAction = "Accept Request"
    } 

    const handleButton = async() => {
        if(btnAction == "Add Neighbor"){
            console.log('add')
            await fetch(`/api/friendRequests/send/${$page.data.user.username}/${name}`, {method : 'POST'})
            await getPendingRequest()
            notifications.success('Successfully sent neighbor request!', 1000)
        }
        else if(btnAction == "Remove Neighbor"){
            console.log('remove')
            await fetch(`/api/friendRequests/remove/${$page.data.user.username}/${name}`)
            await getPendingRequest()
        } else if(btnAction == "Cancel"){
            console.log('cancel')
            await fetch(`/api/friendRequests/cancel/${$page.data.user.username}/${name}`) 
            await getPendingRequest()
        } else if(btnAction == "Accept Request"){
            console.log('accept')
            await fetch(`/api/friendRequests/accept/${$page.data.user.username}/${name}`, {method : 'POST'})
            await getPendingRequest();
            btnAction="Remove Neighbor"
            notifications.success('Successfully added as a neighbor!', 1000)
        }
    }


</script>

<article class="full-width profile-header-wrapper">

    <div class="pfp-username-follow">
        <div class="pfp-username-wrapper">
            <div class="profile-pic-wrapper">
                <img src={pfp} alt="{username}'s profile picture">
            </div>
            <div class="name-username-wrapper">
            <h1>{name}</h1>
            <p>{username}</p>
            </div>
        </div>

        {#if $page.data.user.username !== name}
        {#await getPendingRequest()}
        {:then}
        <div class="follow-button-holder">
            <Button --url='url(/assets/add.svg)' on:click={handleButton}> {btnAction} </Button>
        </div>
        {/await}
        {/if}
    </div>

    <div class="bio-holder">
        {@html bio}
    </div>

</article>

<style>
    .profile-header-wrapper{
        gap : calc(var(--fs-m) * 0.75);
        flex-direction: column;
        display: flex;
    }
    
    .name-username-wrapper p{
        color: var(--text-contrast-color);
        line-height: 1;
    }

    .pfp-username-follow{
        display: flex;
        
        align-items: center;    
        justify-content: space-between;
        
    }

    .follow-button-holder{
        display: flex;
        padding-right: calc(var(--fs-m) * 3)
        
    }

    .bio-holder{
        padding-left: var(--fs-xl);
        padding-right: var(--fs-xl);
        text-align: justify;
    }


    .pfp-username-wrapper{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--fs-xxl);
    }

    .pfp-username-wrapper h1{
        font-size: var(--fs-xxl)
    }

    .profile-pic-wrapper{
        height: calc(var(--fs-l) * 8);
        width: calc(var(--fs-l) * 8);
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .profile-header-wrapper img{
        height: 100%;
        width: 100%;
        overflow: hidden;
        object-fit: cover;
        border-radius: 7em;
    }
</style>