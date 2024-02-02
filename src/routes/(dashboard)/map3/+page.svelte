<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let mapElement: any;
  let map: any;
  let marker: any;
  let popupText: string;

  async function fetchData() {
    try {
      const response = await fetch('https://asdasd.rachatat.com/getlocation'); // Replace with your API endpoint
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
        const { lat, long } = initialData;

        map = leaflet.map(mapElement).setView([lat, long], 13);
        leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFtYnVyZ3oiLCJhIjoiY2xzM2RtMnI2MHdseDJqbnE0ZGJmMnY2biJ9.WLt8IY_40m9MGFARk9yBwA', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        popupString = `Latest Tracker Location <br> <a href="https://www.google.com/maps/search/?api=1&query=${lat},${long}">Open in Google Maps</a>`;

        marker = leaflet.marker([lat, long]).addTo(map)
          .bindPopup('Latest Tracker Location at')
          .openPopup();

        // Update marker every 2 seconds
        setInterval(async () => {
          const newData = await fetchData();

          if (newData) {
            const { lat: newLat, long: newLon } = newData;
            const newLatLng = [newLat, newLon]
            marker.setLatLng(newLatLng);
          }
        }, 200);
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
