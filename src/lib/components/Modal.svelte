<script>
	export let showModal; // boolean
    export let kwarto = "k\\all";
    export let replyTo;

    import Back from '$lib/components/Back.svelte';
    import Text from '$lib/components/Text.svelte';

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
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
        <div class="action-button pointer" title="bold"><strong>B</strong></div>
        <div class="action-button pointer" title="italics"><i>I</i></div>
        <div class="action-button pointer" title="underline"><u>U</u></div>
        <div class="action-button pointer" title="Strike">
            <strike>S</strike>
        </div>
        <div class="action-button pointer" title="Insert image">
            <img src="assets/image.svg">
        </div>
        <div class="action-button pointer" title="Insert video">
            <img src="assets/video.svg">
        </div>
        <div class="action-button pointer" title="Add block quote">
            <img src="assets/quote.svg">
        </div>
        <div class="action-button pointer" title="ordered list"><img src="assets/ol.svg" alt="ordered list"></div>
        <div class="action-button pointer" title="unordered list"><img src="assets/ul.svg" alt="unoredered list"></div>
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
	button {
		display: block;
	}
</style>