<script lang="ts">
  const snowflakeCount = 150; // 눈송이 개수를 늘려 풍성한 효과를 줍니다.
</script>

<div class="snow-container" aria-hidden="true">
  {#each Array(snowflakeCount) as _}
    <div
      class="snowflake"
      style="
        left: {Math.random() * 100}vw;
        animation-duration: {Math.random() * 8 + 7}s; /* 7초에서 15초 사이 */
        animation-delay: {Math.random() * 10}s;
        transform: scale({Math.random() * 0.8 + 0.2});
        opacity: {Math.random() * 0.7 + 0.3};
      "
    ></div>
  {/each}
</div>

<style>
  .snow-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    pointer-events: none; /* 카드와의 상호작용을 방해하지 않도록 설정 */
  }

  .snowflake {
    position: absolute;
    top: -20px;
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    /* '나노바나나' 스타일의 빛나는 효과 */
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 6px rgba(255, 255, 255, 0.8);
    animation: fall linear infinite;
  }

  @keyframes fall {
    to {
      transform: translateY(105vh) rotate(360deg);
      opacity: 0;
    }
  }
</style>
