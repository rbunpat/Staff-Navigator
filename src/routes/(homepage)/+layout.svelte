<script lang="ts">
    import "../../app.css";
    import { applyAction, enhance } from '$app/forms'
	  import { invalidateAll } from '$app/navigation'
    export let data:any;
  </script>
  
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          {#if data.user == false}
          <li><a href="/" class="text-green-500 dark:text-green-400">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
          {/if}
          {#if data.user == true}
          <li><a href="/" class="text-green-400">Home</a></li>
          <li><a href="/map">Map</a></li>
          <li><a href="/history">History</a></li>
          <li><a class="text-red-400" href="/logout">Logout</a></li>
        {/if}
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <a href="/" class="btn btn-ghost normal-case text-xl">Staff Navigator</a>
    </div>
    <div class="navbar-end">
    </div>
  </div>

<slot></slot>
