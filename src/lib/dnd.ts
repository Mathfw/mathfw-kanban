type kanbanItem = {
    columnID: number
    id: number
    content: string
}

export function draggable(node: HTMLDivElement, data: string) {
    let state = data;

    node.draggable = true;
    node.style.cursor = "grab"

    function handleDragStart(e: DragEvent) {
        e.dataTransfer!.setData("text/plain", state);
    }

    node.addEventListener('dragstart', handleDragStart);

    return {
        update(data: string) {
            state = data;
        },
        destroy() {
            node.removeEventListener('dragstart', handleDragStart);
        }
    }
}

export function dropzone(node: HTMLDivElement, options: object) {
    let state = {
        dropEffect: 'move',
        dragoverClass: 'droppable',
        ...options
    }

    function handleDragEnter(e: DragEvent) {
        //@ts-ignore
        e.target!.classList.add(state.dragoverClass)
    }
    function handleDragLeave(e: DragEvent) {
        //@ts-ignore
        e.target!.classList.remove(state.dragoverClass)
    }
    function handleDragOver(e: DragEvent) {
       e.preventDefault()
       //@ts-ignore
       e.dataTransfer!.dropEffect = state.dropEffect 
    }
    function handleDrop(e: DragEvent) {
        e.preventDefault()
        const data = e.dataTransfer?.getData("text/plain")
        //@ts-ignore
        e.target.classList.remove(state.dragoverClass)
        state.on_dropzone(data, e)
    }

    node.addEventListener("dragenter", handleDragEnter)
    node.addEventListener("dragleave", handleDragLeave)
    node.addEventListener("dragover", handleDragOver)
    node.addEventListener("drop", handleDrop)

    return {
        update(options) {
            state = {
                dropEffect: 'move',
                dragoverClass: 'droppable',
                ...options
            }
        },
        destroy() {
            node.addEventListener("dragenter", handleDragEnter)
            node.addEventListener("dragleave", handleDragLeave)
            node.addEventListener("dragover", handleDragOver)
            node.addEventListener("drop", handleDrop)
        }
    }
}