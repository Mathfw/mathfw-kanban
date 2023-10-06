<script lang="ts">
  let backlog: Array<String> = ["backlog 01", "backlog 02"]
  let todo: Array<String> = ["todo 01", "todo 02", "todo 03", "todo 04", "todo 05"] 
  let doing: Array<String> = ["doing 01", "doing 02", "doing 03", "doing 04"]
  let done: Array<String> = ["done 01", "done 02", "done 03"]
</script>

<main>
  <div>
    Kanban
  </div>
  <div>
    <div id="backlog">
      {#each backlog as item }
        <div>
          <p>{item}</p>
        </div>
      {/each}
    </div>
    <div id="todo">
      {#each todo as item }
        <div>
          <p>{item}</p>
        </div>
      {/each}
    </div>
    <div id="doing">
      {#each doing as item }
        <div>
          <p>{item}</p>
        </div>
      {/each}
    </div>
    <div id="done">
      {#each done as item }
        <div>
          <p>{item}</p>
        </div> 
      {/each}
    </div>
  </div>
</main>

<style>
</style>
