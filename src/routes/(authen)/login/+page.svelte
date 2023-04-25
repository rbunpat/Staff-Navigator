<script lang="ts">
    import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	export let form;
</script>

<div class="max-w-md mx-auto my-8 bg-grey-700 p-6 rounded-md shadow-md">
    <h1 class="text-2xl text-white font-bold mb-4">Login</h1>
    
	{#if form?.invalid}
    <p class="text-red-500 mb-4">Username and password is required</p>
    {/if}

    {#if form?.credentials}
    <p class="text-red-500 mb-4">Invalid username or password</p>
    {/if}

    <form method="POST" action="?/login">
    <div class="mb-4">
        <label for="email" class="block text-white font-bold mb-2">Email:</label>
        <input type="email" name="email" id="email" autocomplete="off" placeholder="johndoe@example.com" required class="w-full px-3 py-2 border bg-gray-800 border-gray-700 rounded-md text-white transition-all">
    </div>
    <div class="mb-4">
        <label for="password" class="block text-white font-bold mb-2">Password:</label>
        <input type="password" name="password" id="password" autocomplete="off" placeholder="••••••••" required class="w-full px-3 py-2 border bg-gray-800 border-gray-700 rounded-md text-white transition-all">
    </div>
    <a href="/forgotpassword" class="block text-blue-400 hover:text-gray-200 mb-4">Forgot Password?</a>
    <div class="text-center">
        <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all">Login</button>
    </div>
    </form>
</div>

