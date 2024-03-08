<script>

    import Modal from '$lib/components/Modal.svelte'
    import Left from '$lib/components/Left.svelte'
    import TextEditor from '$lib/components/TextEditor.svelte';
    import {EJSON} from 'bson'
    
    let articles = 5;

    let showModal = false;

    export let kwartolist = EJSON.deserialize(kwartolist)

    //use this to make modal appear: <button on:click={() => {showModal = true;}}>Write a post</button>

</script> 

<div class="wrapper main">

    <div class="left">
        <Left kwartos={kwartolist}/>
    </div>
    <div class="middle">

        <article class="full-width">
            <h1>Create A Post</h1>
        </article>

        <article class="full-width">
        <TextEditor/>
        </article>

    </div>
</div>


<style>


    @media (min-width: 0px) {

        .main {
            display: grid;
            grid-template-columns: 1fr;
        }

        .left, .right{
            display: none;
        }

        .middle {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }   

    @media (min-width: 768px) {

        .main {
            grid-template-columns: 3fr 1fr;
            grid-template-areas: "middle right";
        }

        .right{
            display: flex;
            flex-direction: column;
            align-items: center;
        }

    }

    @media (min-width: 1280px) {

        .main {
            grid-template-columns: 1fr 4fr;
            grid-template-areas: "left middle";
        }

        .left {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: var(--background-color);
        }
        
    }

</style>
