<script>

    import Button from '$lib/components/Button.svelte'

    export let data;
    let pfp = data.pfp;
    let kwartoname = 'k\\' + data.name;
    let bio = data.bio

</script>


<article class="full-width profile-header-wrapper">

    <div class="pfp-username-follow">
        <div class="pfp-username-wrapper">
            <div class="profile-pic-wrapper">
                <img src={pfp} alt="{kwartoname}'s profile picture">
            </div>
            <div class="name-wrapper">
            <h1>{kwartoname}</h1>
            </div>
        </div>

        <div class="follow-button-holder">
            <Button --url='url(/assets/add.svg)'> Join </Button>
        </div>

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

    .bio-holder{
        padding-left: var(--fs-xl);
        padding-right: var(--fs-xl);
        text-align: justify;
    }

    .follower-latest-post{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }

    .follower-holder{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    small{
        font-size: calc(var(--fs-m) * 0.9);
    }


    .pfp-username-follow{
        display: flex;
        
        align-items: center;    
        justify-content: space-between;
        
    }

    .follow-button-holder{
        display: flex;
        padding-right: calc(var(--fs-m) * 6)
        
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