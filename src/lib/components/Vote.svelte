<script>
    export let votes = 10;

		let uStatus = ""
		let dStatus = ""

		//if upvoted, ud == 1, if downvoted ud == -1, else ud == 0 
		let ud = 0;

		function refreshVotes(){
			votes += ud;
		}

		function uClicked(){
			if(ud === 1){
				votes--;
				ud = 0;
				uStatus = "u"
			}
			else{
				if(ud == -1){
					votes++;
				}
				
				ud = 1;
				uStatus = "u-clicked"
				dStatus = "d"
			}
			refreshVotes();
		}

		function dClicked(){
			if(ud === -1){
				votes++;
				ud = 0;
				dStatus = "d"
			} else{
				if(ud == 1){
					votes --;
				}

				ud = -1;
				dStatus = "d-clicked"
				uStatus = "u"
			}
			refreshVotes();
		}
	
</script>

<div class ="votes-container">
    <button class={uStatus} on:click={uClicked}>U</button> <div class="vote-count-container"> {votes} </div> <button class={dStatus} on:click={dClicked}>D</button>
</div>

<style>
    .votes-container {
        display:flex;
        justify-content: center;
        align-items: center;
        gap: calc(0.5 * var(--fs-m));
    }

    .vote-count-container {
        width: var(--fs-m);
        text-align: center;
    }

    .u-clicked{
        color: orange;
    }

    .d-clicked{
        color: blue;
    }

</style>