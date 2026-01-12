<script lang="ts">
  const raindropCount = 250; // 더 많은 빗방울로 강수 효과를 표현합니다.
</script>

<div class="rain-container" aria-hidden="true">
  {#each Array(raindropCount) as _}
    <div
      class="raindrop"
      style="
        left: {Math.random() * 100}vw;
        height: {Math.random() * 50 + 40}px; /* 다양한 길이의 빗줄기 */
        animation-duration: {Math.random() * 0.5 + 0.35}s; /* 매우 빠른 낙하 속도 */
        animation-delay: {Math.random() * 6}s;
      "
    ></div>
  {/each}
</div>

<style>
  .rain-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    pointer-events: none;
    z-index: 10;
  }

  .raindrop {
    position: absolute;
    top: -100px; /* 화면 밖에서 시작 */
    width: 1.5px;
    /* 그라데이션을 통해 빗줄기의 사실감을 더합니다 */
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5));
    animation-name: fall;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    filter: blur(0.5px);
  }

  @keyframes fall {
    to {
      transform: translateY(110vh);
    }
  }
</style>
