<script lang="ts">

  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let mapElement:any;
  let map:any;

  // export let data:any;

  onMount(async () => {
      if(browser) {
          const leaflet = await import('leaflet');

          navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude);
            map = leaflet.map(mapElement).setView([position.coords.latitude, position.coords.longitude], 13);
            leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFtYnVyZ3oiLCJhIjoiY2xzM2RtMnI2MHdseDJqbnE0ZGJmMnY2biJ9.WLt8IY_40m9MGFARk9yBwA', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              tileSize: 512,
          }).addTo(map);
            leaflet.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
              .bindPopup(`Latest Tracker Location at`)
              .openPopup();
          });
          // map = leaflet.map(mapElement).setView([0,0], 13);


          

          // leaflet.marker([0,0]).addTo(map)
          //     .bindPopup(`Latest Tracker Location at <br>${data.createdAt}`)
          //     .openPopup();
      }
  });

  // onDestroy(async () => {
  //     if(map) {
  //         console.log('Unloading Leaflet map.');
  //         map.remove();
  //     }
  // });

</script>

<!-- {#if data.found == false}
  <div class="mt-20 flex items-center justify-center p-4 md:p-8 text-2xl md:text-3xl">
          <a href="mailto:support@mail.st-innovation.in.th">
          <h1 class="">Location Not Found<br>Contact support if you think this is a mistake at <br> support@mail.st-innovation.in.th</h1>
      </a>
</div>
{/if}

{#if data.found == true}
<main>
  <div bind:this={mapElement}></div>
</main>
{/if} -->

<main>
  <div bind:this={mapElement}></div>
</main>



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
