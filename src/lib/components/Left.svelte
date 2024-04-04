<script>
    import BarButton from '$lib/components/BarButton.svelte'

    export let kwartos
    export let icons = '/assets/logo.svg'

    export let username
    
    if($page.data.user){
        username = "n\\"+$page.data.user.username
    }

    import {page} from '$app/stores'

    // console.log('kwartos')
    // console.log(kwartos)

</script>


<div class="left-wrapper">
    <a href="/" data-sveltekit-reload>
        <div class="no-border home-button-holder">
            <BarButton tag='big' img="/assets/home.svg" --bg-color="transparent" --color-hover="var(--button-contrast-color)">Home</BarButton>
        </div>
    </a>

    <div class="top-border kwarto-holder">
        
        <div class="kwarto-list-holder">
            <div class="icon-title-holder">
                <img src="/assets/attr.svg" alt="apartments icon">
                <big>kwartos</big>
            </div>

            {#each kwartos as kwarto (kwarto.name)}
            <span> 
                <img src={icons} alt="kwarto icon"> 
                <p>
                    <a href={"/k/"+kwarto.name}> 
                        <u> {kwarto.name} </u> 
                    </a> 
                </p> 
            </span>
            {/each}

        </div>
    </div>
    {#if $page.data.user}
        <a href={"/n/"+$page.data.user.username+"/settings"}>
            <div class="top-border settings-holder">
                <BarButton tag='big' img="/assets/settings.svg" --bg-color="transparent" --color-hover="var(--button-contrast-color)">{username}</BarButton>
            </div>
        </a>
    {/if}
</div>

<style>

    a {
        text-decoration: none;
        color: var(--text-color);
    }

    big {
        font-size: var(--fs-l);
    }

    * {
        background-color: inherit;
    }

    .kwarto-list-holder {
        background-color: var(--background-color);
        width: auto;
        padding: var(--fs-m);
        padding-left: calc(var(--fs-m) * 1.0);
        border-radius: 1em;
        
        line-height: 1.2;

        text-align: left;
    }

    span {
        display: flex;
        align-items: center;
        justify-content: left;
        line-height: 2.3;
        gap: var(--fs-l);
    }

    span img {
        height: calc(var(--fs-m) * 2);
    }

    /* .kwarto-list-holder > p{
        line-height: 2.3;
    } */

    .kwarto-list-holder a {
        transition: background-color 0.3s ease;
    }

    .kwarto-list-holder a:hover {
        background-color: var(--button-contrast-color);
    }

    .icon-title-holder img {
        width: calc(var(--fs-l) * 1.5);
        padding-bottom: calc(var(--fs-m) * 0.5);

    }

    .icon-title-holder {
        display: flex;
        justify-content: left;
        align-items: center;
        min-height: auto;
        width: 90%;

        border-style: none;
        border-radius: 0.1em;

        gap: calc(0.9 * var(--fs-m));
    }

    .left-wrapper {
        display: flex;
        flex-direction: column;
        height: 90vh;
        width: 100%;
        background-color: var(--background-color);
        justify-content: flex-start;
        align-items: center;
        
    }

    .left-wrapper > * {
        margin-top: calc(var(--fs-m) * -1);
        width: 100%;
    }

    .top-border {
        border-top: solid lightgray 1px;
        align-items: center;
        justify-content: baseline;
        display: flex;
        padding-left: var(--fs-l);
        padding-top: var(--fs-l);
    }

    .no-border {
        align-items: center;
        justify-content: baseline;
        display: flex;
        padding-left: var(--fs-l);
        padding-top: var(--fs-l);
        padding-bottom: var(--fs-l);
    }

    .home-button-holder {
        height: auto;
        flex-grow: 1;
    }

    .kwarto-holder {
        height: auto;
        display: flex;
        align-items: baseline;
    
        padding-bottom: var(--fs-m);
        flex-grow: 3;
    }

    .settings-holder {
        height: auto;
        display: flex;
        align-items: baseline;
        flex-grow: 1
    }

</style>