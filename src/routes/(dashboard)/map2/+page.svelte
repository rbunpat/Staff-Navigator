<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import "leaflet/dist/images/marker-shadow.png";

  let mapElement: any;
  let map: any;
  let marker: any;
  let popupString: string;



  onMount(async () => {
    if (browser) {
      const leaflet = await import('leaflet');

      navigator.geolocation.getCurrentPosition(
        (position) => {
          map = leaflet.map(mapElement).setView([position.coords.latitude, position.coords.longitude], 13);
          map.invalidateSize(true);
          leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFtYnVyZ3oiLCJhIjoiY2xzM2RtMnI2MHdseDJqbnE0ZGJmMnY2biJ9.WLt8IY_40m9MGFARk9yBwA', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);

          popupString = `Latest Tracker Location <br> <a href="https://www.google.com/maps/search/?api=1&query=${position.coords.latitude},${position.coords.longitude}">Open in Google Maps</a>`;

          marker = leaflet.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
            .bindPopup(popupString)
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
