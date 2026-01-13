<script lang="ts">
  import Weather from './Weather.svelte';
  import './app.css';
</script>

<div id="app" class="grid grid-cols-2 grid-rows-2 h-screen p-8 gap-8 box-border">
  <main class="col-span-2 row-span-2 flex justify-center items-center">
    <Weather />
  </main>
</div>
