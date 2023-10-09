<script lang="ts">
    import { dropzone, draggable } from "./dnd";
    import { clickOutside } from "./clickOutside";
    import type { kanbanItem } from "./types";
    import Icon from "./Icon.svelte";

    export let title: string
    export let list: Array<kanbanItem>
    
    let thisTitleElement: HTMLHeadingElement
    let thisAddElement: HTMLDialogElement
    
</script>

<div id="backlog" class="kanban-column" use:dropzone={{
      on_dropzone(data) {
        console.log(data)
        let parsed = JSON.parse(data)
        console.log(parsed)
        console.log("backlog");
        
      }
    }}>
      <h2 bind:this={thisTitleElement} style="background-color: #EF476F">{title}</h2>
      {#each list as item, index}
        <div use:draggable={`{"item": "${item}", "index": ${index}, "column": "backlog"}`}>
          <p>{item}</p>
        </div>
      {/each}
      <button on:click={(e) => {
        e.preventDefault()
        console.log(addBacklog.open)
        addBacklog.show()
      }}>
        <Icon class="icon" name="add-button-filled" width="90%" height="90%" fill="lightgray" />
      </button>
      <dialog bind:this={thisAddElement} use:clickOutside on:click_outside={handleClickOutside} >
        <form>
          <label>
            <span>backlog</span>
            <input type="text">
          </label>
          <button on:click={(e) => {
            e.preventDefault()
          }}>
            add
          </button>
          <button on:click={(e) => {
            e.preventDefault()
            thisAddElement.close()
          }}>
            cancel
          </button>
        </form>
      </dialog>
    </div>