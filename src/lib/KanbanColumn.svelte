<script lang="ts">
    import { dropzone, draggable } from "./dnd";
    import type { kanbanItem } from "./types";
    import Icon from "./Icon.svelte";
    import { kanban } from "./store";

    export let key: number
    
    let thisTitleElement: HTMLHeadingElement
    let thisAddElement: HTMLDialogElement
    
</script>

<div id={$kanban[key].name} class="kanban-column" use:dropzone={{
      on_dropzone(data) {
        console.log(data)
        let parsed = JSON.parse(data)
        console.log(parsed)
        if (parsed.column !== $kanban[key].id) {
          kanban.removeItem(parsed.column, parsed.id)
          kanban.pushItem(key, parsed.item)
        }
       }
      }
  }> 
  <h2></h2>
  {#each $kanban[key].items as item (item.id)}
    <div class="card" use:draggable={`{item: ${item}, id: ${item.id}}, column: ${item.columnId}`}>
      <p>{item.content}</p>
    </div>
    <button class="btnDelete">
      <Icon name="delete" width="70%" height="70%" stroke="currentColor" fill="none"/>
    </button>
  {/each}
</div>