<script>
    export let votes = 10;

		const upUnclicked = "/assets/up-unclicked.svg";
		const downUnclicked = "/assets/down-unclicked.svg";
		const upClicked = "/assets/up-clicked.svg";
		const downClicked = "/assets/down-clicked.svg";

		export let uStatus = upUnclicked
		export let dStatus = downUnclicked

		//if upvoted, ud == 1, if downvoted ud == -1, else ud == 0 
		let ud = 0;

		function refreshVotes(){
			votes += ud;
		}

		function uClicked(){
			if(ud === 1){
				votes--;
				ud = 0;
				uStatus = upUnclicked
			}
			else{
				if(ud == -1){
					votes++;
				}
				
				ud = 1;
				uStatus = upClicked
				dStatus = downUnclicked
			}
			refreshVotes();
		}

		function dClicked(){
			if(ud === -1){
				votes++;
				ud = 0;
				dStatus = downUnclicked
			} else{
				if(ud == 1){
					votes --;
				}

				ud = -1;
				dStatus = downClicked
				uStatus = upUnclicked
			}
			refreshVotes();
		}


	
</script>

<div class ="votes-container">
    <button class="vote pointer" on:click={uClicked}><img src={uStatus} alt="upvote button"></button> <div class="vote-count-container"> {votes} </div> <button class="vote pointer" on:click={dClicked}> <img src={dStatus} alt="downvote"> </button>
</div>

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