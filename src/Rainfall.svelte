<div class="raindrop"></div>
<div class="raindrop"></div>
<div class="raindrop"></div>
<div class="raindrop"></div>
<div class="raindrop"></div>

<style>
  .raindrop {
    position: absolute;
    bottom: 100%;
    width: 2px;
    height: 80px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4));
    animation: fall 0.5s linear infinite;
  }

  @keyframes fall {
    to {
      transform: translateY(100vh);
    }
  }

  .raindrop:nth-child(1) { left: 10%; animation-duration: 0.5s; animation-delay: 0.2s; }
  .raindrop:nth-child(2) { left: 25%; animation-duration: 0.6s; animation-delay: 0.1s; }
  .raindrop:nth-child(3) { left: 50%; animation-duration: 0.4s; animation-delay: 0.3s; }
  .raindrop:nth-child(4) { left: 70%; animation-duration: 0.55s; animation-delay: 0s; }
  .raindrop:nth-child(5) { left: 85%; animation-duration: 0.45s; animation-delay: 0.4s; }
</style>