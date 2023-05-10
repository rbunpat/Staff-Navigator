<script lang="ts">
    import { enhance } from "$app/forms";
    /** @type {import('./$types').ActionData} */

    export let data: any;
</script>

<div class="form-control flex flex-col items-center justify-center w-full">
    <div class="avatar mt-10">
        <div class="w-24 rounded-full">
          <img src={data.avatarURL} />
        </div>
      </div>
      <div class="input-group mt-2 flex items-center justify-center p-4 md:p-8 text-2xl md:text-3xl">
        <button class="btn">
            User ID
          </button>
      <input type="text" value="{data.userId}" placeholder="User ID" class="input input-bordered w-full max-w-md" disabled/>
    </div>
    <div class="input-group mb-8 flex items-center justify-center text-2xl md:text-3xl">
        <button class="btn">
            Email
          </button>
      <input type="text" value="{data.email}" placeholder="Email" class="input input-bordered w-full max-w-md" disabled/>
    </div>
    <div class="input-group flex items-center justify-center text-2xl md:text-3xl">
        <button class="btn">
            Cane ID
          </button>
      <input type="text" value="{data.caneId}" placeholder="Cane ID" class="input input-bordered w-full max-w-md" disabled/>
    </div>
    <div class="input-group mt-10 flex items-center justify-center text-2xl md:text-3xl">
        <h1>API Token</h1>
    </div>
    
    <div class="input-group mt-2 flex items-center justify-center p-4 md:p-8 text-2xl md:text-3xl">
        <form method="POST" action="?/token" use:enhance>
            {#if data.found == true}
            <button type="submit" class="btn btn-accent">Renew Token</button>
            {:else}
            <button type="submit" class="btn btn-accent">Generate Token</button>
            {/if}
        </form>
      <input type="text" value="{data.apiToken}" placeholder="API Token" class="input input-bordered w-full max-w-md" disabled/>
      <button class="btn btn-secondary">
        Copy
      </button>
    </div>
  </div>
