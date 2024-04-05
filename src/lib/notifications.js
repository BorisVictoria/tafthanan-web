// source: https://svelte.dev/repl/9fdab148948246a79f7395f42529cea6?version=4.2.12

import { writable, derived } from "svelte/store"

const TIMEOUT = 3000

function createNotificationStore (timeout) {
    const _notifications = writable([])

    // sends a notification and adds it to the list of notifications
    function send (message, type = "default", timeout) {
        _notifications.update(state => {
            return [...state, { id: id(), type, message, timeout }]
        })
    }

    let timers = []

    // creates a derived store that removes the first notification after a timeout
    const notifications = derived(_notifications, ($_notifications, set) => {
        set($_notifications)
        if ($_notifications.length > 0) {
            const timer = setTimeout(() => {
                _notifications.update(state => {
                    state.shift()
                    return state
                })
            }, $_notifications[0].timeout)
            return () => {
                clearTimeout(timer)
            }
        }
    })
    const { subscribe } = notifications

    return {
        subscribe,
        send,
        success: (msg, timeout) => send(msg, "success", timeout),
        wrong_username: (msg, timeout) => send(msg, "wrong_username", timeout),
        wrong_password: (msg, timeout) => send(msg, "wrong_password", timeout),
    }
}

function id() {
    return '_' + Math.random().toString(36);
};

export const notifications = createNotificationStore()