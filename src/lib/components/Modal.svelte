<script>
	export let showModal; // boolean
    export let kwarto = "k\\all";
    export let replyTo;

    import Back from '$lib/components/Back.svelte';
    import Text from '$lib/components/Text.svelte';
    import { onMount } from 'svelte';

	let dialog; // HTMLDialogElement
    var selection;

	$: if (dialog && showModal) dialog.showModal();

    function toggle(button){
        if (button.classList.contains("toggled")){
            button.classList.remove("toggled")
        } else {
            button.classList.add("toggled")
        }
    }



    onMount(()=>{
        const normButtons = document.querySelectorAll('.norm');
        console.log(normButtons);
        const txtArea = document.querySelector('.text-area')
        

        normButtons.forEach(button=>{
            
            button.addEventListener('click', ()=> {
                console.log(button.id + " clicked!")
                document.execCommand(button.id, false, null);

        })

        const formButtons = document.querySelectorAll('.wrap');
        formButtons.forEach(button => {

            button.addEventListener('click', () => {
                console.log(button.id + " clicked!")
                        
                document.execCommand('formatBlock', false, button.id)

                })

            })
        })

    })



</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
>
    <div class="richtext-wrapper">
        <div class="exit-submit-wrapper">
            <Back --width="calc(var(--fs-l) * 1.5)" on:click={dialog.close()}/>
            <span>
                {#if kwarto}
                <strong> Write a post to {kwarto} </strong>
                {/if}
                {#if replyTo}
                <strong> Reply to {replyTo}</strong>
                {/if}
            </span>
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="action-button pointer" on:click={dialog.close()}>
                <strong>Post</strong>
            </div>
        </div>

        {#if kwarto}
        <Text placeholder="Write a title..."/>
        {/if}

    <div class="content-writer">

    <div class="format-buttons-holder">
        <button class="norm action-button pointer" id="bold" title="Bold"><strong>B</strong></button>
        <button class="norm action-button pointer" id="italic" title="Italics"><i>I</i></button>
        <button class="norm action-button pointer" id="underline" title="Underline"><u>U</u></button>
        <button class="norm action-button pointer" id="strikeThrough" title="Strike">
            <strike>S</strike>
        </button>

        <button class="wrap action-button pointer" id="h1" title="Add heading">
            <img src="assets/heading.svg">
        </button>

        <button class="action-button pointer" title="Insert image">
            <img src="assets/image.svg" alt="image symbol">
        </button>
        <button class="action-button pointer" title="Insert video">
            <img src="assets/video.svg" alt="video symbol">
        </button>
        <button class="wrap action-button pointer" id="blockquote" title="Add block quote">
            <img src="assets/quote.svg" alt="quote symbol">
        </button>

        <button class="norm action-button pointer" id="indent" title="add indentation">
            <img src="assets/indent.svg" alt="indent symbol">
        </button>

        <button class="norm action-button pointer" id="outdent" title="decrease indentation">
            <img src="assets/outdent.svg" alt="unindent">
        </button>

        <button class="norm action-button pointer" id="insertUnorderedList" title="unordered list"><img src="assets/ol.svg" alt="ordered list"></button>
        <button class="norm action-button pointer" id="insertOrderedList" title="ordered list"><img src="assets/ul.svg" alt="unoredered list"></button>
        <button class="action-button pointer" title="insert hyperlink"><img src="assets/link.svg" alt="link symbol"></button>
    </div>

    <div class="text-area" placeholder=" Write content here..." contenteditable="true">
      
    </div>

    </div>
</dialog>

<style>

    .format-buttons-holder{
        display:flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 2px;
        border-bottom: solid 2px lightgray;

    }

    .format-buttons-holder .action-button{
        border-color: transparent;
    }

    .text-area{

        min-height:90%;

    }

    .text-area:focus-within{
        outline: none;
    }

    .action-button > *{
        background-color: inherit;
        border-color: inherit;
    }


    [contenteditable=true]:empty:before{
    content: attr(placeholder);
    color: var(--text-contrast-color);
    pointer-events: none;
    display: block;
    }


    .exit-submit-wrapper .action-button{
        background-color: var(--accent-color);
        color: var(--background-color);
    }

    .exit-submit-wrapper{
        display: flex; 
        justify-content: space-between;
        align-items: center;
    }

    .richtext-wrapper{
        padding: 0.3em;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--fs-m);
    }

    .content-writer{
        margin-top: 0;
        min-height: 20em;
        padding: var(--fs-m);
        border: 2px lightgray solid;
        border-radius: var(--fs-l);
        display: flex;
        flex-direction: column;
    }

    .content-writer:focus-within{
        border: 2px var(--primary-color) solid;
    }

	dialog {
		width: 50em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
        margin: auto;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>