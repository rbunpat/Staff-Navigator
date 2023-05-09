<div class="max-w-md mx-auto my-8 bg-grey-700 p-6 rounded-md shadow-md">
    <h1 class="text-2xl text-white font-bold mb-4">Are you sure you want to logout?</h1>
    <div class="text-center flex justify-center">
        <a href="/map"><button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all m-4">No</button></a>
        <form
        class="logout"
        action="?/logout"
        method="POST"
        use:enhance={() => {
        return async ({ result }) => {
            invalidateAll()
            await applyAction(result)
        }
        }}
    >
    <button type="submit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-all m-4">Yes</button>
    </form>
</div>
</div>
