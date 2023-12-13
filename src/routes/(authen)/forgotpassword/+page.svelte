<script lang="ts">
  import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'

	export let form;
  export let logoUrl: string = import.meta.env.VITE_LOGOURL;
</script>

<section class="bg-gray-50 dark:bg-gray-900 ">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src={logoUrl} alt="logo">
          Staff Navigator    
      </a>

      <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot Password
          </h2>
          {#if form?.invalid}

          <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">Invalid Email</span> Please try again.
              </div>
            </div>
    
          {/if}
          <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" method="POST" action="?/forgotpassword" use:enhance>
              <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                  <input type="email" name="email" id="email" placeholder="name@company.com" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
              </div>
              <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send Password Reset Email</button>
          </form>
      </div>
  </div>
</section>
  
  <!-- <div class="max-w-md mx-auto my-8 bg-grey-700 p-6 rounded-md shadow-md">
    <h1 class="text-2xl text-white font-bold mb-4">Forgot Password</h1>
    {#if form?.invalid}
    <p class="text-red-500 mb-4">Invalid email</p>
    {/if} -->
    <!-- {#if form?.mailsent}
    <p class="text-green-500 mb-4">Success, password reset email sent</p>
    {/if} -->
    <!-- <form method="POST" action="?/forgotpassword">
      <div class="mb-4">
        <label for="email" class="block text-white font-bold mb-2">Email:</label>
        <input type="email" name="email" id="email" autocomplete="off" placeholder="johndoe@example.com" required class="w-full px-3 py-2 border bg-gray-800 border-gray-700 rounded-md text-white transition-all">
      </div>
      <div class="text-center">
        <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all">Reset Password</button>
      </div>
    </form>
  </div> -->
