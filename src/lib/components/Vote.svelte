<script>
    export let data;

	// console.log(data)
	let votes = data.voteCount
	

	const upUnclicked = "/assets/up-unclicked.svg";
	const downUnclicked = "/assets/down-unclicked.svg";
	const upClicked = "/assets/up-clicked.svg";
	const downClicked = "/assets/down-clicked.svg";

	let uStatus = upUnclicked
	let dStatus = downUnclicked

	//if upvoted, ud == 1, if downvoted ud == -1, else ud == 0 
	let ud = 0;

	const uClicked = async() => { 

		if (ud === 1){
			votes--
			ud = 0
			uStatus = upUnclicked
		}
		else if (ud === 0) {
			votes++
			ud = 1
			uStatus = upClicked
			
		} else {
			votes += 2
			ud = 1
			uStatus = upClicked
			dStatus = downUnclicked
		}
		data.vote = "upvote"
		await doVote()
	}

	const dClicked = async() => {
		if (ud === 1){
			votes -= 2
			ud = -1
			uStatus = upUnclicked
			dStatus = downClicked
		} else if (ud === 0) {
			votes--
			ud = -1
			dStatus = downClicked
		} else {
			votes++
			ud = 0
			dStatus = downUnclicked
		}
		data.vote = "downvote";
		await doVote()
	}

	let vote
	let success

	const doVote = async() => {

		if (data.isPost) {
			const stringify = data.postID.toString()
			success = await fetch(`/api/posts/votes/${stringify}`, {
				method: "POST",
				body: JSON.stringify(data)
			})
			if (success === null) {
				redirect(303, "/login")
			}
		} else {
			const stringify = data.commentID.toString()
			success = await fetch(`/api/comments/votes/${stringify}`, {
				method: "POST",
				body: JSON.stringify(data)
			})
			if (success === null) {
				redirect(303, "/login")
			}
		}
	}

	const fetchVote = async() => {
		if (data.isPost) {
			const stringify = data.postID.toString()
			const response = await fetch(`/api/posts/votes/${stringify}`)
			vote = await response.json()
			
		} else {
			const stringify = data.commentID.toString()
			const response = await fetch(`/api/comments/votes/${stringify}`)
			vote = await response.json()
		}

		if (vote === null) {
			ud = 0
		} else {
			if (vote.vote === null) {
				ud = 0
			} else if (vote.vote === true) {
				ud = 1
			} else {
				ud = -1
			}
		}

	}


	
</script>


{#await fetchVote()}

{:then vote}
<div class ="votes-container">
    <button class="vote pointer" on:click={uClicked}>
		<img src={uStatus} alt="upvote button">
	</button> 
	<div class="vote-count-container"> 
		{votes} 
	</div> 
	<button class="vote pointer" on:click={dClicked}> 
		<img src={dStatus} alt="downvote"> 
	</button>
</div>
{/await}

<style>
    .votes-container {
        display:flex;
        justify-content: center;
        align-items: center;
        gap: calc(0.5 * var(--fs-m));
    }

	.vote{
		border-style: none;
	}

    .vote-count-container {
        width: var(--fs-m);
        text-align: center;
    }

</style>