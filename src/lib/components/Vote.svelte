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
				uStatus = ""
			}
			else{
				if(ud == -1){
					votes++;
				}
				
				ud = 1;
				uStatus = "<style>#u{color:orange}</style>"
				dStatus = ""
			}
			refreshVotes();
		}

		function dClicked(){
			if(ud === -1){
				votes++;
				ud = 0;
				dStatus = ""
			} else{
				if(ud == 1){
					votes --;
				}

				ud = -1;
				dStatus = "<style> #d{color:blue} </style>"
				uStatus = ""
			}
			refreshVotes();
		}
	
</script>

{@html uStatus}
{@html dStatus}
<button id="u" on:click={uClicked}>U</button> {votes} <button id="d" on:click={dClicked}>D</button>