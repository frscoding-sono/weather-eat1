<script lang="ts">
  import Weather from './Weather.svelte';
  import './app.css';

  // Gemini Project: Asymmetrical two-world vision (with the ULTIMATE AI BANANA)
  const leftPanelBackground = 'url(https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=2815&auto=format&fit=crop)';
  const rightPanelBackground = 'url(https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=2787&auto=format&fit=crop)'; // The Perfect AI Banana, as requested
</script>

<div id="app" class="grid grid-cols-[32rem_1fr] h-screen box-border">
  <!-- Left Panel: The World of Weather (Fixed Width) -->
  <main 
    class="left-panel bg-cover bg-center flex justify-center items-center overflow-hidden"
    style="background-image: {leftPanelBackground}"
  >
    <Weather />
  </main>

  <!-- Right Panel: The World of the AI Banana (Remaining Space) -->
  <div 
    class="right-panel bg-cover bg-center"
    style="background-image: {rightPanelBackground}"
  ></div>
</div>

<style>
  .left-panel, .right-panel {
    transition: all 0.5s ease-in-out;
  }

  .left-panel:hover {
    filter: brightness(1.1);
    transform: scale(1.02);
  }

  .right-panel:hover {
    transform: scale(1.02);
    filter: brightness(1.1);
  }
</style>
