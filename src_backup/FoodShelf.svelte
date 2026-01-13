<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';

  export let items: string[] = [];
  export let showShelf = false;

  const dispatch = createEventDispatcher();

  function selectFood(item: string) {
    dispatch('select', item);
  }
</script>

{#if showShelf}
  <div class="shelf-overlay" on:click={() => (showShelf = false)} transition:slide={{ duration: 300 }}>
    <div class="food-shelf">
      <h3 class="shelf-title">골라보세요!</h3>
      <div class="shelf-grid">
        {#each items as item}
          <button class="food-item" on:click={() => selectFood(item)}>
            {item}
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .shelf-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Align shelf to the top */
    padding-top: 10vh; /* Push it down a bit from the very top */
  }

  .food-shelf {
    background: rgba(20, 15, 30, 0.8);
    backdrop-filter: blur(15px);
    border-radius: 1.5rem;
    padding: 2rem;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .shelf-title {
    color: #f0f0f0;
    font-size: 1.8rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 5px rgba(0,0,0,0.5);
  }

  .shelf-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .food-item {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    border: none;
    color: white;
    font-weight: 600;
    padding: 1rem;
    border-radius: 1rem;
    cursor: pointer;
    font-size: 1.1rem;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.4);
    box-shadow: 4px 4px 10px rgba(0,0,0,0.4), -4px -4px 10px rgba(255,255,255,0.1);
    transition: all 0.2s ease-out;
    border-top: 1px solid rgba(255,255,255,0.2);
  }

  .food-item:hover {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    transform: translateY(-4px) scale(1.03);
    box-shadow: 8px 8px 20px rgba(0,0,0,0.5), -8px -8px 20px rgba(255,255,255,0.15);
    color: #c7d2fe;
  }

  .food-item:active {
    transform: translateY(1px) scale(0.98);
    box-shadow: inset 3px 3px 8px rgba(0,0,0,0.6), inset -3px -3px 8px rgba(255,255,255,0.1);
  }
</style>