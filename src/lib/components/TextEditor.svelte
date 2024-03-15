<script>
    import { onMount } from 'svelte';
    import Text from '$lib/components/Text.svelte'
    import Back from '$lib/components/Back.svelte'

    export let backFunction;
    export let kwarto;
    export let replyingTo;
    export let postID;
    export let comment = false;

    let show='none'

    var btn = ''
    var url = ''

    function linkButton(button, url){

        if(/http/i.test(url)){
        document.execCommand(button, false, url)
        } else{
        url = "http://" + url;
        document.execCommand(button, false, url)
        }

        show = 'none'

        if(button == 'insertImage'){
            const textArea = document.querySelector('.text-area')
            textArea.querySelectorAll('img').forEach(element => {
                element.style = 'display: block; margin-left: auto; margin-right: auto'
            })
        }
    }

    let innerHTML

    onMount(()=>{
        const normButtons = document.querySelectorAll('.norm');
        console.log(normButtons);
        

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

        document.getElementById('submitUrl').addEventListener('click', () =>{
            console.log('submit clicked.')
            linkButton(btn, url)
        })

        const linkButtons = document.querySelectorAll('.link')
        linkButtons.forEach(button => {

            button.addEventListener('click', () => {

                if(show == 'none'){
                    show = 'flex'
                    btn = button.id
                    url = document.getElementById('url-place').value
                } else {
                    show = 'none'
                }

            })
        })
        

    })
</script>
<form method=POST action="?/submit">

    {#if comment}
        <textarea disabled name="replyingTo" style:display="none">{replyingTo}</textarea>
        <textarea disabled name="postID" style:display="none">{postID}</textarea>
    {/if}

<div class="richtext-wrapper">
    <div class="exit-submit-wrapper">
        {#if kwarto}
        <a href={"/k/"+kwarto}><Back --width="calc(var(--fs-l) * 1.5)"/></a>
        {/if}
        <span>
            {#if kwarto}
            <strong> Write a post to {"k\\"+kwarto} </strong>
            {/if}
        </span>

        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <button class="action-button pointer">
            <strong>Post</strong>
        </button>
    </div>

    {#if kwarto}
        <Text name="title" placeholder="Write a title..."/>
    {/if}

<div class="content-writer">

<div class="format-buttons-holder">
    <button type="button" class="norm action-button pointer" id="bold" title="Bold"><strong>B</strong></button>
    <button type="button" class="norm action-button pointer" id="italic" title="Italics"><i>I</i></button>
    <button type="button" class="norm action-button pointer" id="underline" title="Underline"><u>U</u></button>
    <button type="button" class="norm action-button pointer" id="strikeThrough" title="Strike">
        <strike>S</strike>
    </button>

    <button type="button" class="wrap action-button pointer" id="h1" title="Add heading">
        <img src="/assets/heading.svg" alt="heading symbol">
    </button>

    <button type="button" class="link action-button pointer" id="insertImage" title="Insert image">
        <img src="/assets/image.svg" alt="symbol for adding a pic">
    </button>

    <button type="button" class="wrap action-button pointer" id="blockquote" title="Add block quote">
        <img src="/assets/quote.svg" alt="quote symbol">
    </button>

    <button type="button" class="norm action-button pointer" id="indent" title="add indentation">
        <img src="/assets/indent.svg" alt="indent symbol">
    </button>

    <button type="button" class="norm action-button pointer" id="outdent" title="decrease indentation">
        <img src="/assets/outdent.svg" alt="unindent">
    </button>

    <button type="button" class="norm action-button pointer" id="insertUnorderedList" title="unordered list"><img src="/assets/ol.svg" alt="ordered list"></button>
    <button type="button" class="norm action-button pointer" id="insertOrderedList" title="ordered list"><img src="/assets/ul.svg" alt="unoredered list"></button>
    <button type="button" class="link action-button pointer" id="createLink" title="insert hyperlink"><img src="/assets/link.svg" alt="link symbol"></button>

</div>
<div bind:innerHTML class="text-area" placeholder=" Write content here..." contenteditable="true">
  
</div>

<input name="content" bind:value={innerHTML} type="text" placeholder="text" style="display:none"/>

</div>
<div id="url-prompt-holder" style="display:{show}">
    <input id="url-place" placeholder="Insert URL here:"/> <button class="action-button pointer" type="button" id="submitUrl"> <strong> Submit </strong> </button>
</div>

</div>
</form>

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

</style>