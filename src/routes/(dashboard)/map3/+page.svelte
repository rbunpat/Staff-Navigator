<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let mapElement: any;
  let map: any;
  let marker: any;

  async function fetchData() {
    try {
      const response = await fetch('https://your-api-endpoint'); // Replace with your API endpoint
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching data from the API:', error);
      return null;
    }
  }

  onMount(async () => {
    if (browser) {
      const leaflet = await import('leaflet');

      const initialData = await fetchData();

      if (initialData) {
        const { lat, lon } = initialData;

        map = leaflet.map(mapElement).setView([lat, lon], 13);
        leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFtYnVyZ3oiLCJhIjoiY2xzM2RtMnI2MHdseDJqbnE0ZGJmMnY2biJ9.WLt8IY_40m9MGFARk9yBwA', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        marker = leaflet.marker([lat, lon]).addTo(map)
          .bindPopup('Latest Tracker Location at')
          .openPopup();

        // Update marker every 2 seconds
        setInterval(async () => {
          const newData = await fetchData();

          if (newData) {
            const { lat: newLat, lon: newLon } = newData;
            const newLatLng = [newLat, newLon];
            marker.setLatLng(newLatLng);
          }
        }, 2000);
      }
    }
  });

  onDestroy(() => {
    if (map) {
      console.log('Unloading Leaflet map.');
      map.remove();
    }
  });
</script>

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
