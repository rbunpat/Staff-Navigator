<script>
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
    if (browser) { // to prevent error window is not defined, because it's SSR
    window.location.href = '/';
}
</script>

<!-- <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">{$page.error.message}</h1>
        <div>
          <button class="btn btn-primary">
            <a href="/">Home</a>
        </button>
        </div>

      </div>
    </div>
  </div> -->
