<script>
    import {onMount} from 'svelte'
    import Password from '$lib/components/Password.svelte'
    import Text from '$lib/components/Text.svelte'
    import {enhance} from '$app/forms'

    let show = 'none'
    let bioDiv

    var url = ''
    var btn = ''

    function linkButton(button, url){

        if(/http/i.test(url)){
            document.execCommand(button, false, url)
        } else{
            url = "http://" + url;
            document.execCommand(button, false, url)
        }   

        show = 'none'
    }

    onMount(()=>{
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            form.style="display: none"
        })

        // document.getElementById("btn-user").addEventListener('click', () => {
            
        //     forms.forEach(form => {
        //         form.style="display: none"
        //     })
        //     console.log('huh')

        //     document.getElementById("change-username").style = "display: flex"
        // })

        document.getElementById("btn-pw").addEventListener('click', () => {
            forms.forEach(form => {
                form.style="display: none"
            })

            document.getElementById("change-password").style = "display: flex"
        })

        document.getElementById("btn-pfp").addEventListener('click', () => {
            forms.forEach(form => {
                form.style="display: none"
            })

            document.getElementById("change-pfp").style = "display: flex"
        })

        document.getElementById("btn-bio").addEventListener('click', () => {
            forms.forEach(form => {
                form.style="display: none"
            })

            document.getElementById("change-bio").style = "display: flex"
        })


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
                }
                else{
                    show = 'none'
                }

            })

        })
        

    })

</script>

<div class="wrapper main">
    <div class="left">
        <article>
            <!-- <div class="setting-button-container">
                <h1>Username</h1><button id="btn-user" class="action-button pointer">Change</button>
                
            </div>
            <hr> -->
            <div class="setting-button-container">
                <h1>Password</h1><button id="btn-pw" class="action-button pointer">Change</button>
                
            </div>
            <hr>
            <div class="setting-button-container">
                <h1>Profile Picture</h1><button id="btn-pfp" class="action-button pointer">Change</button>
                
            </div>
            <hr>
            <div class="setting-button-container">
                <h1>Bio</h1><button id="btn-bio" class="action-button pointer">Change</button>
                
            </div>
            <hr>
            <div class="setting-button-container">
                <a href="/">
                    <button class="action-button pointer" id="btn-log-out">
                        <h1 class="red">Log out</h1>
                    </button>
                </a>
            </div>
        </article>

    </div>

    <div class="right">

        <article>
            <!-- <form id="change-username">
                <h1>Change Username</h1>
                <hr>

                <p>Password: </p>
                <Password placeholder="Current Password"/>

                <p>New username: </p>
                <Text placeholder="New Username"/>

                <button class="action-button pointer">Save</button>
                <button class="action-button pointer">Cancel</button>

            </form> -->

            <form id="change-password" method="POST" action="?/password" use:enhance>
                <h1>Change Password</h1>
                <hr>

                <!-- <p>Password: </p>
                <Password name="oldpass" placeholder="Current Password"/> -->

                <p>New password: </p>
                <Password name="newpass" placeholder="New Password"/>

                <button class="action-button pointer">Save</button>
                <!-- <a href="/"> 
                    <button type="button" class="action-button pointer">Cancel</button>
                </a> -->

            </form>

            <form id="change-pfp" method="POST" action="?/pfp" use:enhance>

                <h1>Change Profile Picture</h1>
                <hr>

                <!-- <p>Password: </p>
                <Password name="pass" placeholder="Current Password"/> -->

                <p>New Profile Picture: </p>
                <Text name="pfp" placeholder="Insert Link"/>

                <button class="action-button pointer">Save</button>
                <!-- <a href="/"> 
                    <button type="button" class="action-button pointer">Cancel</button>
                </a> -->

            </form>

            <form id="change-bio" method="POST" action="?/bio" use:enhance={
                ({formData}) => {
                    formData.append('bio', bioDiv.innerHTML)
                }
            }>

                <h1>Change Bio</h1>
                <hr>

                <!-- <p>Password: </p>
                <Password placeholder="Current Password"/> -->

                <p>New Bio: </p>
                <div class="content-writer">

                    <div class="format-buttons-holder">
                        <button type="button"class="norm action-button pointer" id="bold" title="Bold"><strong>B</strong></button>
                        <button type="button" class="norm action-button pointer" id="italic" title="Italics"><i>I</i></button>
                        <button type="button" class="norm action-button pointer" id="underline" title="Underline"><u>U</u></button>
                        <button type="button" class="norm action-button pointer" id="strikeThrough" title="Strike">
                            <strike>S</strike>
                        </button>
                    
                        <button type="button" class="wrap action-button pointer" id="h1" title="Add heading">
                            <img src="/assets/heading.svg" alt="heading symbol">
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

                    <div bind:this={bioDiv} class="text-area" placeholder="New bio..." contenteditable="true">
                      
                    </div>
                    </div>

                    <div id="url-prompt-holder" style="display:{show}">
                        <input id="url-place" placeholder="Insert URL here:"/> <button class="action-button pointer" id="submitUrl"> <strong> Submit </strong> </button>
                </div>

                <button class="action-button pointer">Save</button>


                <!-- <a href="/"> 
                    <button type="button" class="action-button pointer">Cancel</button>
                </a> -->

            </form>

        </article>

    </div>
</div>

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

    article{
        min-height: 80%;
        max-height: auto;
        display: flex;
    }

    .content-writer{
        margin-top: 0;
        min-height: 15em;
        padding: var(--fs-m);
        border: 2px lightgray solid;
        border-radius: var(--fs-l);
        display: flex;
        flex-direction: column;
    }

    .content-writer:focus-within{
        border: 2px var(--primary-color) solid;
    }

    form {
        gap: var(--fs-l);
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }

    [contenteditable=true]:empty:before {
        content: attr(placeholder);
        color: var(--text-contrast-color);
        pointer-events: none;
        display: block;
    }

    .red {
        color: maroon;
    }

    .main {
        padding: var(--fs-xl) var(--fs-xxl);
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: "left right";
        height: 99dvh;
        overflow: hidden;

    }

    .left article {
        padding: var(--fs-xxl);
        height: 80%;
        display: flex;
        justify-content: space-evenly;
    }

    .left .setting-button-container {
        display: flex;
        justify-content: space-between;
    }

    .text-area {
        min-height:90%;
    }

    .text-area:focus-within {
        outline: none;
    }


</style>