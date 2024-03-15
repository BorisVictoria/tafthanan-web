<script>
    import TextEditor from '$lib/components/TextEditor.svelte';
    
	export let showModal; // boolean
	export let postID
	export let comment = true;
	export let replyingTo
	let dialog;
   
	$: if (dialog && showModal) dialog.showModal();
	

</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close={() => (showModal = false)}>
    <TextEditor backFunction={() => dialog.close()} postID={postID} replyingTo={replyingTo} comment={comment}/>
</dialog>

<style>

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