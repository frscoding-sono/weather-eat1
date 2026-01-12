<script lang="ts">
  import { onMount } from 'svelte';

  let showFlash = false;
  let key = 0;

  function triggerLightning() {
    // Hide flash initially to ensure the animation can be re-triggered
    showFlash = false;
    
    // Set a random timeout to show the next flash
    const randomTimeout = Math.random() * 8000 + 4000; // Between 4 and 12 seconds
    setTimeout(() => {
      key = Math.random(); // Change key to re-trigger the Svelte animation
      showFlash = true;
      
      // After this flash is triggered, schedule the next one
      triggerLightning();
    }, randomTimeout);
  }

  onMount(() => {
    // Start the lightning loop
    triggerLightning();
  });
</script>

{#if showFlash}
  {#key key}
    <div class="flash"></div>
  {/key}
{/if}

<style>
  @keyframes flash-animation {
    0% { opacity: 0; }
    20% { opacity: 0.9; } /* First bright flash */
    30% { opacity: 0.3; }
    40% { opacity: 0.7; } /* Second dimmer flash */
    100% { opacity: 0; }
  }

  .flash {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #ffffff;
    z-index: 5; /* Positioned below other effects like rain, but above the background */
    pointer-events: none; /* The layer should not be interactive */
    
    /* The animation will last 300ms, creating a quick, multi-peak flash */
    animation: flash-animation 300ms linear;
    
    /* Ensures it's invisible after the animation completes */
    opacity: 0; 
  }
</style>
