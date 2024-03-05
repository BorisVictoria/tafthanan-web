<script>

    import Button from '$lib/components/Button.svelte'

    export let pfp = "/assets/login-poster.png";
    export let username = 'n\\eggylord';

    export let name = 'eggylord';

    export let bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate veaborum.";

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

        <div class="follow-button-holder">
            <Button>Follow</Button>
        </div>

    </div>


    <div class="bio-holder">
        {bio}
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