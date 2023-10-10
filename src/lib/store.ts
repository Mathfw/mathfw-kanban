import { writable } from "svelte/store";

function createKanban() {
    const { subscribe, set, update } = writable(localStorage.getItem("kanban") || "")

    const setLocalStorange = () => {
        let exists = localStorage.getItem("kanban")
        if (!exists) {
            subscribe((val) => {
                localStorage.setItem("kanban", JSON.stringify(val))
            })
        }
    }

    }

    return {
        subscribe,
        setLocalStorange: setLocalStorange,
    }    
}

export const kanban = createKanban()