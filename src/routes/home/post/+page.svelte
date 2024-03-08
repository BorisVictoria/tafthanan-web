<script>
    import Comment from '$lib/components/Comment.svelte'
    import Article from '$lib/components/Article.svelte'
    import Left from '$lib/components/Left.svelte'
    import Right from '$lib/components/Right.svelte'
    import Filters from '$lib/components/Filters.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import Back from '$lib/components/Back.svelte'

    let replies = [];
    let showModal = false;
</script>


<Modal bind:showModal/>

<div class="wrapper main">

    <div class="left">
        <Left />
    </div>
    <div class="middle">

        <article class="back-button-holder full-width">
            <Back --width="calc(var(--fs-xl) * 2)"/>
            <div><h1>Post</h1></div>
        </article>

        

        <Article hidden={false}/>

        <article class="comments-label full-width">
            <h1>Comments</h1>
        </article>

        <Filters/>

        

        <Comment/>
        <Comment/>

    </div>
    <div class="right">
        <Right/>
    </div>
</div>



<style>

    .comments-label{
        padding-top: 0.2em;
        padding-bottom: 0.2em;
    }

    .back-button-holder{
        height: auto;
        padding: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
    }


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
            grid-template-columns: 1fr 3fr 1fr;
            grid-template-areas: "left middle right";
        }

        .left {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: var(--background-color);
        }
        
    }

</style>
