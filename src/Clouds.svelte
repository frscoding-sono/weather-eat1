<script lang="ts">
  const cloudCount = 12; // 화면을 채울 구름의 개수
</script>

<div class="clouds-container" aria-hidden="true">
  {#each Array(cloudCount) as _, i}
    <div 
      class="cloud"
      style="
        top: {10 + Math.random() * 50}%; /* 다양한 높이에 구름 배치 */
        transform: scale({Math.random() * 0.8 + 0.5});
        animation-duration: {Math.random() * 40 + 30}s; /* 30초에서 70초 사이의 느린 속도 */
        animation-delay: {-Math.random() * 35}s; /* 화면에 즉시 나타나도록 음수 딜레이 사용 */
      "
    ></div>
  {/each}
</div>

<style>
  .clouds-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    pointer-events: none;
    z-index: 5; /* 다른 효과들보다 아래에 위치하여 배경처럼 보이게 함 */
  }

  .cloud {
    position: absolute;
    width: 200px;
    height: 60px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 200px;
    filter: blur(8px);
    
    /* '나노바나나' 스타일의 부드러운 그림자 */
    box-shadow: 
      0 0 20px 10px rgba(255, 255, 255, 0.15),
      inset 0 0 15px rgba(255, 255, 255, 0.1);

    animation-name: drift;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  /* CSS의 pseudo-elements를 사용해 더 풍성한 구름 모양을 만듭니다 */
  .cloud::after, .cloud::before {
    content: '';
    position: absolute;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.1);
    filter: blur(5px);
  }

  .cloud::after {
    width: 100px;
    height: 100px;
    top: -50px;
    left: 50px;
  }

  .cloud::before {
    width: 120px;
    height: 120px;
    top: -70px;
    right: 40px;
  }

  @keyframes drift {
    from {
      transform: translateX(-250px) scale(var(--scale, 1));
    }
    to {
      transform: translateX(100vw) scale(var(--scale, 1));
    }
  }
</style>
