<!-- source: https://svelte.dev/repl/9fdab148948246a79f7395f42529cea6?version=4.2.12 -->

<script>
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import { notifications } from "$lib/notifications.js";

    export let themes = {
        default: "#aaaaaa",
        success: "#84C991",
        wrong_username: "#f0ad4e",
        wrong_password: "#f0ad4e",
    };
</script>

<div class="notifs">
    {#each $notifications as notification (notification.id)}
        <div
            animate:flip
            class="toast"
            style="background-color: {themes[notification.type]};"
            transition:fly={{ y: 30 }}
        >
            <div class="content">{notification.message}</div>
            {#if notification.icon}<i class={notification.icon} />{/if}
        </div>
    {/each}
</div>

<style>
    .notifs {
        position: fixed;
        top: 10px;
        left: 0;
        right: 0;
        margin: 0 auto;
        padding: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        pointer-events: none;
        background-color: transparent;
    }

    .toast {
        flex: 0 0 auto;
        margin-bottom: 10px;
        border-radius: 1em;
    }

    .content {
        background-color: transparent;
        padding: 10px;
        display: block;
        color: white;
        font-weight: 500;
    }
</style>
