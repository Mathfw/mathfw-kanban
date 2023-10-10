<script lang="ts">
  import { onMount } from "svelte"
  import Icon from "./lib/Icon.svelte";
  import {draggable, dropzone} from "./lib/dnd"


  let backlog: Array<string> = [];
  let todo: Array<string> = [];
  let doing: Array<string> = [];
  let done: Array<string> = [];
  
  let backlogTitle: HTMLHeadingElement
  let todoTitle: HTMLHeadingElement
  let doingTitle: HTMLHeadingElement
  let doneTitle: HTMLHeadingElement

  $: if (backlog && backlogTitle && backlog.length <= 0) {
    backlogTitle.style.backgroundColor = "transparent"
    backlogTitle.style.border = "0.2em solid #EF476F"
  }else if (backlog && backlogTitle && backlog.length > 0) {
    backlogTitle.style.backgroundColor = "#EF476F"
    backlogTitle.style.border = "none"
  }
  $: if (todo && todoTitle && todo.length <= 0) {
    todoTitle.style.backgroundColor = "transparent"
    todoTitle.style.border = "0.2em solid #118AB2"
  }else if (todo && todoTitle && todo.length > 0) {
    todoTitle.style.backgroundColor = "#118AB2"
    todoTitle.style.border = "none"
  }
  $: if (doing && doingTitle && doing.length <= 0) {
    doingTitle.style.backgroundColor = "transparent"
    doingTitle.style.border = "0.2em solid #FFD166"
  }else if (doing && doingTitle && doing.length > 0) {
    doingTitle.style.backgroundColor = "#FFD166"
    doingTitle.style.border = "none"
  }
  $: if (done && doneTitle && done.length <= 0) {
    doneTitle.style.backgroundColor = "transparent"
    doneTitle.style.border = "0.2em solid #06D6A0"
  }else if (done && doneTitle && done.length > 0) {
    doneTitle.style.backgroundColor = "#06D6A0"
    doneTitle.style.border = "none"
  }

  let addBacklog: HTMLDialogElement
  let addTodo: HTMLDialogElement
  let addDoing: HTMLDialogElement
  let addDone: HTMLDialogElement

  let spanAddBacklog: HTMLSpanElement
  let spanAddTodo: HTMLSpanElement
  let spanAddDoing: HTMLSpanElement
  let spanAddDone: HTMLSpanElement

  function handleClickOutside(e: MouseEvent) { 
    if (addBacklog && addBacklog.open) {
      const rect = addBacklog.getBoundingClientRect()
      if (
        rect.top >= e.clientY ||
        rect.left >= e.clientX ||
        rect.bottom <= e.clientY ||
        rect.right <= e.clientX
      ) {
        document.removeEventListener('click', handleClickOutside)
        addBacklog.close()
      }
    }else if (addTodo && addTodo.open) {
      const rect = addTodo.getBoundingClientRect()
      if (
        rect.top >= e.clientY ||
        rect.left >= e.clientX ||
        rect.bottom <= e.clientY ||
        rect.right <= e.clientX
      ) {
        document.removeEventListener('click', handleClickOutside)
        addTodo.close()
      }
    }else if (addDoing && addDoing.open) {
      const rect = addDoing.getBoundingClientRect()
      if (
        rect.top >= e.clientY ||
        rect.left >= e.clientX ||
        rect.bottom <= e.clientY ||
        rect.right <= e.clientX
      ) {
        document.removeEventListener('click', handleClickOutside)
        addDoing.close()
      }
    }else if (addDone && addDone.open) {
      const rect = addDone.getBoundingClientRect()
      if (
        rect.top >= e.clientY ||
        rect.left >= e.clientX ||
        rect.bottom <= e.clientY ||
        rect.right <= e.clientX
      ) {
        document.removeEventListener('click', handleClickOutside)
        addDone.close() 
      }
    }
  }

  function handleBtnMouseEnter(e: MouseEvent) {
    const target = e.target as HTMLButtonElement
    if (target.id === "btnAddBacklog" || target.id === "btnDeleteBacklog") {
      target.style.backgroundColor = "#EF476F"
    }else if (target.id === "btnAddTodo" || target.id === "btnDeleteTodo") {
      target.style.backgroundColor = "#118AB2"
    }else if (target.id === "btnAddDoing" || target.id === "btnDeleteDoing") {
      target.style.backgroundColor = "#FFD166"
    }else if (target.id === "btnAddDone" || target.id === "btnDeleteDone") {
      target.style.backgroundColor = "#06D6A0"
    }
  }

  function handleBtnMouseLeave(e: MouseEvent) {
    const target = e.target as HTMLButtonElement
    if (target.id === "btnAddBacklog" || target.id === "btnDeleteBacklog") {
      target.style.backgroundColor = "transparent"
    }else if (target.id === "btnAddTodo" || target.id === "btnDeleteTodo") {
      target.style.backgroundColor = "transparent"
    }else if (target.id === "btnAddDoing" || target.id === "btnDeleteDoing") {
      target.style.backgroundColor = "transparent"
    }else if (target.id === "btnAddDone" || target.id === "btnDeleteDone") {
      target.style.backgroundColor = "transparent"
    }
  }

  function handleInputFocus(e: FocusEvent) {
    const target = e.target as HTMLInputElement
    if (target.id === "inputAddBacklog" && spanAddBacklog) {
      target.style.borderColor = "#EF476F"
      spanAddBacklog.style.color = "#EF476F"
    }else if (target.id === "inputAddTodo" && spanAddTodo) {
      target.style.borderColor = "#118AB2"
      spanAddTodo.style.color = "#118AB2"
    }else if (target.id === "inputAddDoing" && spanAddDoing) {
      target.style.borderColor = "#FFD166"
      spanAddDoing.style.color = "#FFD166"
    }else if (target.id === "inputAddDone" && spanAddDone) {
      target.style.borderColor = "#06D6A0"
      spanAddDone.style.color = "#06D6A0"
    }
  }

  function handleInputOutFocus(e: FocusEvent) {
    const target = e.target as HTMLInputElement
    if (target.id === "inputAddBacklog" && spanAddBacklog) {
      target.style.borderColor = "lightgray"
      spanAddBacklog.style.color = "lightgray"
    }else if (target.id === "inputAddTodo" && spanAddTodo) {
      target.style.borderColor = "lightgray"
      spanAddTodo.style.color = "lightgray"
    }else if (target.id === "inputAddDoing" && spanAddDoing) {
      target.style.borderColor = "lightgray"
      spanAddDoing.style.color = "lightgray"
    }else if (target.id === "inputAddDone" && spanAddDone) {
      target.style.borderColor = "lightgray"
      spanAddDone.style.color = "lightgray"
    }
  }

  let backlogInputValue: string
  let todoInputValue: string
  let doingInputValue: string
  let doneInputValue: string


</script>

<!-- <svelte:window on:click={closeClickOutside}/> -->
<main>
  <h1 class="kanban-title">
    Kanban
  </h1>
  <div class="kanban-body">
    <div id="backlog" class="kanban-column" use:dropzone={{
      on_dropzone(data) {
        console.log(data)
        let parsed = JSON.parse(data)
        console.log(parsed)
        console.log("backlog");
        switch (parsed.column) {
          case "todo":
            todo.splice(parsed.index, 1) 
            todo = todo
            backlog.push(parsed.item)
            backlog = backlog
            console.log("todo ->", todo)
            console.log("backlog ->", backlog)
            break;
          case "doing":
            doing.splice(parsed.index, 1) 
            doing = doing
            backlog.push(parsed.item)
            backlog = backlog
            console.log("doing ->", doing)
            console.log("backlog ->", backlog)
            break;
          case "done":
            done.splice(parsed.index, 1) 
            done = done
            backlog.push(parsed.item)
            backlog = backlog
            console.log("done ->", done)
            console.log("backlog ->", backlog)
            break
          default:
            console.log("erro")
            break;
        }
      }
    }}>
      <h2 bind:this={backlogTitle} style="background-color: #EF476F">backlog</h2>
      {#each backlog as item, index}
        <div class="card-container">
          <div class="card" use:draggable={`{"item": "${item}", "index": ${index}, "column": "backlog"}`}>
            <p>{item}</p>
          </div>
          <button id="btnDeleteBacklog" class="btnDelete" on:mouseenter={handleBtnMouseEnter} on:mouseleave={handleBtnMouseLeave}
          on:click={() => {
            backlog.splice(index, 1)
            backlog = backlog
          }}>
            <Icon name="delete" width="70%" height="70%" stroke="currentColor" fill="none"/>
          </button>
        </div>
      {/each}
      <button on:click|stopPropagation={(e) => {
        e.preventDefault()
        console.log(addBacklog.open)
        addBacklog.showModal()
        document.addEventListener('click', handleClickOutside)
      }} class="cardbtn">
        <Icon class="icon" name="add-button-filled" width="90%" height="90%" fill="currentColor" stroke="none"/>
      </button>
      <dialog bind:this={addBacklog} style="border-color: #EF476F;">
        <form on:submit={(e) => {
          e.preventDefault()
          console.log(backlogInputValue)
          backlog.push(backlogInputValue)
          backlog = backlog
          backlogInputValue = ""
          addBacklog.close()
        }}>
          <label>
            <span bind:this={spanAddBacklog}>backlog</span>
            <input id="inputAddBacklog" type="text" bind:value={backlogInputValue} on:focusin={handleInputFocus} on:focusout={handleInputOutFocus}>
          </label>
          <div class="row">
            <button id="btnAddBacklog" type="submit" class="add" on:click={(e) => {}}
              style="border: 0.2em solid #EF476F !important"
            on:mouseenter={handleBtnMouseEnter}
            on:mouseleave={handleBtnMouseLeave}>
              add
            </button>
            <button id="btnAddBacklog" class="cancel" on:click={(e) => {
              e.preventDefault()
              addBacklog.close()
            }} style="border: 0.2em solid #EF476F !important"
            on:mouseenter={handleBtnMouseEnter}
            on:mouseleave={handleBtnMouseLeave}>
              cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
    <div id="todo" class="kanban-column" use:dropzone={{
      on_dropzone(data) {
        console.log(data);
        let parsed = JSON.parse(data)
        console.log(parsed)
        console.log("todo");
        switch (parsed.column) {
          case "backlog":
            backlog.splice(parsed.index, 1)
            backlog = backlog
            todo.push(parsed.item)
            todo = todo
            console.log("backlog ->", backlog);
            console.log("todo ->", todo)
            break;
          case "doing":
            doing.splice(parsed.index, 1)
            doing = doing
            todo.push(parsed.item)
            todo = todo
            console.log("doing ->", doing);
            console.log("todo ->", todo)
            break
          case "done":
            done.splice(parsed.index, 1)
            done = done
            todo.push(parsed.item)
            todo = todo
            console.log("done ->", done);
            console.log("todo ->", todo)
            break
          default:
            console.log("erro")
            break;
        }
      }
    }}>
      <h2 bind:this={todoTitle} style="background-color: #118AB2;">todo</h2>
      {#each todo as item, index }
        <div class="card-container">
          <div class="card" use:draggable={`{"item": "${item}", "index": ${index}, "column": "todo"}`}>
            <p>{item}</p>
          </div>
          <button id="btnDeleteTodo" class="btnDelete" on:mouseenter={handleBtnMouseEnter} on:mouseleave={handleBtnMouseLeave}
          on:click={() => {
            todo.splice(index, 1)
            todo = todo
          }}>
            <Icon name="delete" width="70%" height="70%" stroke="currentColor" fill="none"/> 
          </button>
        </div>
      {/each}
      <button on:click|stopPropagation={(e) => {
        e.preventDefault()
        console.log(addTodo.open)
        addTodo.showModal()
        document.addEventListener('click', handleClickOutside)
      }} class="cardbtn">
        <Icon class="icon" name="add-button-filled" width="90%" height="90%" fill="currentColor" stroke="none"/>
      </button>
      <dialog bind:this={addTodo} style="border-color: #118AB2;">
        <form on:submit={(e) => {
          e.preventDefault()
          console.log(todoInputValue)
          todo.push(todoInputValue)
          todo = todo
          todoInputValue = ""
          addTodo.close()
        }}>
          <label>
            <span bind:this={spanAddTodo}>Todo</span>
            <input id="inputAddTodo" type="text" bind:value={todoInputValue} on:focusin={handleInputFocus} on:focusout={handleInputOutFocus}>
          </label>
          <div class="row">
            <button id="btnAddTodo" class="add" on:click={(e) => {
            }} style="border: 0.2em solid #118AB2"
            on:mouseenter={handleBtnMouseEnter}
            on:mouseleave={handleBtnMouseLeave}>
              add
            </button>
            <button id="btnAddTodo" class="cancel" on:click={(e) => {
              e.preventDefault()
              addTodo.close()
            }} style="border: 0.2em solid #118AB2"
            on:mouseenter={handleBtnMouseEnter}
            on:mouseleave={handleBtnMouseLeave}>
              cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
    <div id="doing" class="kanban-column" use:dropzone={{
      on_dropzone(data) {
        console.log(data);
        let parsed = JSON.parse(data)
        console.log(parsed);
        console.log("doing");
        switch (parsed.column) {
          case "backlog":
            backlog.splice(parsed.index, 1);
            backlog = backlog
            doing.push(parsed.item)
            doing = doing
            console.log("backlog ->", backlog)
            console.log("doing ->", doing)
            break;
          case "todo":
            todo.splice(parsed.index, 1);
            todo = todo
            doing.push(parsed.item)
            doing = doing
            console.log("todo ->", todo)
            console.log("doing ->", doing)
            break;
          case "done":
            done.splice(parsed.index, 1);
            done = done
            doing.push(parsed.item)
            doing = doing
            console.log("done ->", done)
            console.log("doing ->", doing)
            break;
          default:
            console.log("erro");
            break;
        }
      }
    }}>
      <h2 bind:this={doingTitle} style="background-color: #FFD166;">doing</h2>
      {#each doing as item, index }
        <div class="card-container">
          <div class="card" use:draggable={`{"item": "${item}", "index": ${index}, "column": "doing"}`}>
            <p>{item}</p>
          </div>
          <button id="btnDeleteDoing" class="btnDelete" on:mouseenter={handleBtnMouseEnter} on:mouseleave={handleBtnMouseLeave}
          on:click={() => {
            doing.splice(index, 1)
            doing = doing
          }}>
            <Icon name="delete" width="70%" height="70%" stroke="currentColor" fill="none"/> 
          </button>
        </div>
      {/each}
      <button on:click|stopPropagation={(e) => {
        e.preventDefault()
        console.log(addDoing.open)
        addDoing.showModal()
        document.addEventListener('click', handleClickOutside)
      }} class="cardbtn">
        <Icon class="icon" name="add-button-filled" width="90%" height="90%" fill="currentColor" stroke="none"/>
      </button>
      <dialog bind:this={addDoing} style="border-color: #FFD166;">
        <form on:submit={(e) => {
          e.preventDefault()
          console.log(doingInputValue)
          doing.push(doingInputValue)
          doing = doing
          doingInputValue = ""
          addDoing.close()
        }}>
          <label>
            <span bind:this={spanAddDoing}>Doing</span>
            <input id="inputAddDoing" type="text" bind:value={doingInputValue} on:focusin={handleInputFocus} on:focusout={handleInputOutFocus}>
          </label>
          <div class="row">
            <button id="btnAddDoing" class="add" on:click={(e) => {
            }} style="border: 0.2em solid #FFD166"
            on:mouseenter={handleBtnMouseEnter}
            on:mouseleave={handleBtnMouseLeave}>
              add
            </button>
            <button id="btnAddDoing" class="cancel" on:click={(e) => {
              e.preventDefault()
              addDoing.close()
            }} style="border: 0.2em solid #FFD166"
            on:mouseenter={handleBtnMouseEnter}
            on:mouseleave={handleBtnMouseLeave}>
              cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
    <div id="done" class="kanban-column" use:dropzone={{
      on_dropzone(data) {
        console.log(data);
        let parsed = JSON.parse(data)
        console.log(parsed)
        console.log("done");
        switch (parsed.column) {
          case "backlog":
            backlog.splice(parsed.index, 1)
            backlog = backlog
            done.push(parsed.item)
            done = done
            console.log("doing ->", doing);
            console.log("done ->", done)
            break;
          case "todo":
            todo.splice(parsed.index, 1)
            todo = todo
            done.push(parsed.item)
            done = done
            console.log("todo ->", todo);
            console.log("done ->", done)
            break
          case "doing":
            doing.splice(parsed.index, 1)
            doing = doing
            done.push(parsed.item)
            done = done
            console.log("doing ->", doing);
            console.log("done ->", done)
            break
          default:
            console.log("erro")
            break;
        }
      }
    }}>
      <h2 bind:this={doneTitle} style="background-color: #06D6A0;">done</h2>
      {#each done as item, index }
        <div class="card-container">
          <div class="card" use:draggable={`{"item": "${item}", "index": ${index}, "column": "done"}`}>
            <p>{item}</p>
          </div> 
          <button id="btnDeleteDone" class="btnDelete" on:mouseenter={handleBtnMouseEnter} on:mouseleave={handleBtnMouseLeave}
          on:click={() => {
            done.splice(index, 1)
            done = done
          }}>
            <Icon name="delete" width="70%" height="70%" stroke="currentColor" fill="none"/> 
          </button>
        </div>
      {/each}
      <button on:click|stopPropagation={(e) => {
        e.preventDefault()
        console.log(addDone.open)
        addDone.showModal()
        document.addEventListener('click', handleClickOutside)
      }} class="cardbtn">
        <Icon class="icon" name="add-button-filled" width="90%" height="90%" fill="currentColor" stroke="none"/>
      </button>
      <dialog bind:this={addDone} style="border-color: #06D6A0;">
        <form on:submit={(e) => {
          e.preventDefault()
          console.log(doneInputValue)
          done.push(doneInputValue)
          done = done
          doneInputValue = ""
          addDone.close()
        }}>
          <label>
            <span bind:this={spanAddDone}>Done</span>
            <input id="inputAddDone" type="text" bind:value={doneInputValue} on:focusin={handleInputFocus} on:focusout={handleInputOutFocus}>
          </label>
          <div class="row">
            <button id="btnAddDone" class="add" on:click={(e) => {
            }} 
            style="border: 0.2em solid #06D6A0"
            on:mouseenter={handleBtnMouseEnter}
            on:mouseleave={handleBtnMouseLeave}>
              add
            </button>
            <button id="btnAddDone" class="cancel" on:click={(e) => {
              e.preventDefault()
              addDone.close()
            }} style="border: 0.2em solid #06D6A0"
            on:mouseenter={handleBtnMouseEnter}
            on:mouseleave={handleBtnMouseLeave}>
              cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  </div>
</main>

<style>
  main {
    width: 100dvw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .kanban-body {
    display: grid;
    grid-template-columns: repeat(4, 20em);
    column-gap: 2em;
  }
  .kanban-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background-color: white;
    box-shadow: 0px 0px 8px 0px rgba(0.0, 0.0, 0.0, 0.25);
    padding: 1em;
    border-radius: 0.6em;
  }
  .kanban-column h2 {
    width: 100%;
    border-radius: 0.2em;
    margin: 0;
    margin-bottom: 0.5em;
    padding: 0.4em 0;
    text-align: center;
    transition: all 300ms ease-in-out;
  }
  .kanban-column .card-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 0.4em;
  }
  .kanban-column .card-container button {
    width: 4em;
    height: 100%;
    border: none;
    border-radius: 0.2em;
    margin-left: 1em;
    background-color: white;
    box-shadow: 0px 0px 4px 0px rgba(0.0, 0.0, 0.0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 300ms ease-in-out;
    cursor: pointer;
  }
  .kanban-column .card {
    width: 100%;
    border-radius: 0.2em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: white;
    box-shadow: 0px 0px 4px 0px rgba(0.0, 0.0, 0.0, 0.25);
  }
  .kanban-column .cardbtn {
    cursor: pointer;
    width: 100%;
    height: 4em;
    border-radius: 0.2em;
    border: none;
    background-color: white;
    color: lightgray;
    box-shadow: 0px 0px 4px 0px rgba(0.0, 0.0, 0.0, 0.25);
    margin: 0.4em;
    transition: all 300ms ease-in-out;
  }
  .kanban-column .cardbtn:hover {
    color: white;
  }
  #backlog .cardbtn:hover {
    background-color: #EF476F;
  }
  #todo .cardbtn:hover {
    background-color: #118AB2;
  }
  #doing .cardbtn:hover {
    background-color: #FFD166;
  }
  #done .cardbtn:hover {
    background-color: #06D6A0;
  }
  #backlog:global(.droppable) {
    outline: 0.2rem solid #EF476F;
    outline-offset: 0.25rem;
  }
  #todo:global(.droppable) {
    outline: 0.2rem solid #118AB2;
    outline-offset: 0.25rem;
  }
  #doing:global(.droppable) {
    outline: 0.2rem solid #FFD166;
    outline-offset: 0.25rem;
  }
  #done:global(.droppable) {
    outline: 0.2rem solid #06D6A0;
    outline-offset: 0.25rem;
  }
  .kanban-column:global(.droppable) * {
    pointer-events: none;
  }
  dialog {
    width: 24em;
    height: 18em;
    border-radius: 0.5em;
  }
  dialog::backdrop {
    background-color: rgba(0.0, 0.0, 0.0, 0.5);
    backdrop-filter: blur(8px);
  }
  dialog form {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  dialog form input {
    width: 100%;
    margin: 1em 0;
    border-radius: 0.5em;
    padding: 0.5em;
    outline: none;
    border: 2px solid lightgray;
    transition: all 300ms ease-in-out;
  }
  dialog form label {
    position: relative;
    width: 80%;
  }
  dialog form label span {
    position: absolute;
    left: 1em;
    top: 0;
    transform: translateY(0.1em);
    background-color: white;
    padding: 0 0.5em;
    color: lightgray;
    transition: all 300ms ease-in-out;
  }
  dialog form .row {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .add {
    width: auto;
    height: auto;
    cursor: pointer;
    border-radius: 0.4em;
    background-color: transparent;
    box-shadow: none;
    margin: 0.4em;
    padding: 0.3em 0.8em;
    transition: all 300ms ease-in-out; 
  }
  .cancel {
    width: auto;
    height: auto;
    cursor: pointer;
    border-radius: 0.4em;
    background-color: transparent;
    box-shadow: none;
    margin: 0.4em;
    padding: 0.3em 0.8em;
    transition: all 300ms ease-in-out; 
  }
  .btnDelete:hover {
    stroke: white;
    color: white;
  }
</style>
