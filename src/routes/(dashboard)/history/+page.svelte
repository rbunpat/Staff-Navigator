<script lang="ts">

    import "../../../app.css";
    export let data;

    const locations = data.location

</script>

{#if data.found == false}
    <div class="mt-20 flex items-center justify-center text-2xl md:text-3xl">
            <a href="mailto:support@mail.st-innovation.in.th">
            <h1>Location Not Found, Contact support if you think this is a mistake at <br> support@mail.st-innovation.in.th</h1>
        </a>
  </div>
{/if}

{#if data.found == true}
  <div class="mt-20 flex items-center justify-center text-2xl md:text-3xl">
    <a href="https://maps.google.com/?q={data.latestCoordinates}" target="_blank">
        <h1>Current Coordinate</h1>
        <h1 class="underline">{data.latestCoordinates}</h1>
    </a>
  </div>

  <div class="flex items-center justify-center p-4 mt-10 md:mt-6">
  <div class="overflow-x-auto max-w-3xl">
    <table class="table table-normal w-full">
      <thead>
          <tr>
              <th>No.</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Timestamp</th>
          </tr>
      </thead>
      <tbody>
          {#each locations as item, i}
              <tr>
                  <td>{i + 1}</td>
                  <td>{item.latitude}</td>
                  <td>{item.longitude}</td>
                  <td>{item.createdAt}</td>
              </tr>
          {/each}
      </tbody>
  </table>
  </div>
</div>
{/if}


<style>
    /* #bruh {
        width: 100%;
        max-width: none;
    } */
</style>