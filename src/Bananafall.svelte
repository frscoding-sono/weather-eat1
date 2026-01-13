<script lang="ts">
  const bananaCount = 150;
</script>

<div class="banana-container" aria-hidden="true">
  {#each Array(bananaCount) as _}
    <div
      class="banana"
      style="
       left: {Math.random() * 100}vw;
       animation-duration: {Math.random() * 8 + 7}s; /* 7초에서 15초 사이 */
       animation-delay: {Math.random() * 10}s;
       transform: scale({Math.random() * 0.6 + 0.2});
       opacity: {Math.random() * 0.7 + 0.3};
     "
    >
      🍌
    </div>
  {/each}
</div>

<style>
  .banana-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    pointer-events: none;
    z-index: 10;
  }
  .banana {
    position: absolute;
    top: -10%;
    font-size: 2rem;
    animation-name: fall;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    will-change: transform;
  }
  @keyframes fall {
    to {
      transform: translateY(110vh) rotate(720deg);
    }
  }
</style>
