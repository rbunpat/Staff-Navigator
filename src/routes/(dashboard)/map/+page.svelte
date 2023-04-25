<script lang="ts">

    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    let mapElement:any;
    let map:any;

    export let data:any;

    onMount(async () => {
        if(browser) {
            const leaflet = await import('leaflet');

            map = leaflet.map(mapElement).setView([data.lat, data.lon], 13);

            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            

            leaflet.marker([data.lat, data.lon]).addTo(map)
                .bindPopup(`Latest Tracker Location at <br>${data.createdAt}`)
                .openPopup();
        }
    });

    onDestroy(async () => {
        if(map) {
            console.log('Unloading Leaflet map.');
            map.remove();
        }
    });

</script>

{#if data.found == false}
    <div class="mt-20 flex items-center justify-center text-2xl md:text-3xl">
            <a href="mailto:support@mail.st-innovation.in.th">
            <h1 class="">Location Not Found, Contact support if you think this is a mistake at <br> support@mail.st-innovation.in.th</h1>
        </a>
  </div>
{/if}

{#if data.found == true}
<main>
    <div bind:this={mapElement}></div>
</main>
{/if}



<style>
    @import 'leaflet/dist/leaflet.css';
    div {
        /* margin top for navbar */
        width: 100%;
        height: 100%;
        padding-bottom: 100%;
        position: fixed;
    }
</style>
