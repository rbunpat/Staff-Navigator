<script lang="ts">
    export let data:any;
</script>

<div class="min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        {#if data.user == false}
        <h1 class="text-5xl font-bold mb-6">Staff Navigator Dashboard</h1>
        <h1 class="text-5xl font-bold">Please Login</h1>
        {/if}
        {#if data.user == true}
        <h1 class="text-3xl md:text-5xl font-bold">Hi, <br/> {data.email}</h1>
        {/if}
        <p class="py-6"></p>
        {#if data.user == false}
        <button class="btn btn-primary">
          <a href="/login">Login</a>
      </button>
      <button class="btn btn-primary">
        <a href="/register">Register</a>
    </button>
        {/if}
        {#if data.user == true}
        <button class="btn btn-primary">
          <a href="/map">Tracking Map</a>
      </button>
      <button class="btn btn-primary">
        <a href="/history">Location History</a>
    </button>
        {/if}
      </div>
    </div>
  </div>

<style lang="postcss">
    html {
        background-color: bg-gray-900;
    }
</style>
