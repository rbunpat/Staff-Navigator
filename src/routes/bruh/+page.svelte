<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let mapElement: any;
  let map: any;
  let marker: any;

  onMount(async () => {
    if (browser) {
      const leaflet = await import('leaflet');

      navigator.geolocation.getCurrentPosition(
        (position) => {
          map = leaflet.map(mapElement).setView([position.coords.latitude, position.coords.longitude], 13);
          leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFtYnVyZ3oiLCJhIjoiY2xzM2RtMnI2MHdseDJqbnE0ZGJmMnY2biJ9.WLt8IY_40m9MGFARk9yBwA', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);

          marker = leaflet.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
            .bindPopup('Latest Tracker Location at')
            .openPopup();

          // Update marker every 2 seconds
          setInterval(() => {
            navigator.geolocation.getCurrentPosition(
              (newPosition) => {
                const newLatLng = [newPosition.coords.latitude, newPosition.coords.longitude];
                marker.setLatLng(newLatLng);
                console.log('Marker updated at:', newLatLng);
                // map.setView(newLatLng, map.getZoom());
              },
              (error) => {
                console.error('Error getting current position:', error);
              }
            );
          }, 2000);
        },
        (error) => {
          console.error('Error getting initial position:', error);
        }
      );
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
