<div class="lightning-flash"></div>

<style>
  .lightning-flash {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    opacity: 0;
    animation: flash 4s infinite;
  }

  @keyframes flash {
    0%, 100% { opacity: 0; }
    50% { opacity: 0; }
    51%, 53% { opacity: 0.8; }
    52%, 54% { opacity: 0.2; }
  }
</style>