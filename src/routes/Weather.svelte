<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { slide } from 'svelte/transition';
  import Snowfall from './Snowfall.svelte';
  import Rainfall from './Rainfall.svelte';
  import Clouds from './Clouds.svelte';
  import Thunderstorm from './Thunderstorm.svelte';

  const city = 'Seoul';

  let weatherData: any = null;
  let loading = true;
  let error: string | null = null;

  let foodIndex: number = 0;
  let foodInterval: any;

  // --- AI BANANA GENESIS ---
  // A single, powerful image to define the app's identity.
  const imageAIBanana = 'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=2815&auto=format&fit=crop';

  type FoodDetails = { preText: string; items: string[]; postText: string; };
  type WeatherLook = { background: string; icon: string; overlay: string; };

  const weatherConditions: { [key: string]: { day: WeatherLook; night: WeatherLook; food: FoodDetails; } } = {
    Clear: {
      day: { background: imageAIBanana, icon: '☀️', overlay: 'overlay-clear-day' },
      night: { background: imageAIBanana, icon: '🌙', overlay: 'overlay-clear-night' },
      food: { preText: '상쾌한 날엔 ', items: ['시원한 냉면', '과일주스', '신선한 샐러드'], postText: ' 어떠세요?' }
    },
    Clouds: {
      day: { background: imageAIBanana, icon: '☁️', overlay: 'overlay-clouds-day' },
      night: { background: imageAIBanana, icon: '☁️', overlay: 'overlay-clouds-night' },
      food: { preText: '구름 낀 날엔 ', items: ['따뜻한 라떼', '핫초코', '카푸치노'], postText: '와 함께.' }
    },
    Rain: {
      day: { background: imageAIBanana, icon: '🌧️', overlay: 'overlay-rain-day' },
      night: { background: imageAIBanana, icon: '🌧️', overlay: 'overlay-rain-night' },
      food: { preText: '비 오는 날엔 뜨끈한 ', items: ['칼국수', '수제비', '부침개'], postText: '이죠!' }
    },
    Snow: {
      day: { background: imageAIBanana, icon: '❄️', overlay: 'overlay-snow-day' },
      night: { background: imageAIBanana, icon: '❄️', overlay: 'overlay-snow-night' },
      food: { preText: '눈 오는 날엔 ', items: ['따끈한 어묵탕', '달콤한 호떡', '김이 나는 찐빵'], postText: '으로 몸을 녹여보세요.' }
    },
    Thunderstorm: {
      day: { background: imageAIBanana, icon: '⚡️', overlay: 'overlay-thunderstorm' },
      night: { background: imageAIBanana, icon: '⚡️', overlay: 'overlay-thunderstorm' },
      food: { preText: '번개 치는 날엔 ', items: ['매운 짬뽕', '따끈한 부대찌개', '치킨에 맥주'], postText: ' 한 잔!' }
    },
    Default: {
      day: { background: imageAIBanana, icon: '🤔', overlay: 'overlay-default' },
      night: { background: imageAIBanana, icon: '🤔', overlay: 'overlay-default' },
      food: { preText: '오늘 날씨엔 ', items: ['든든한 국밥', '매콤한 떡볶이', '샌드위치'], postText: '이 좋겠네요.' }
    },
  };

  onMount(async () => {
    try {
      const response = await fetch(`/weather?city=${city}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch weather data: ${response.status} ${errorText}`);
      }
      weatherData = await response.json();
    } catch (e: any) {
      error = e.message;
    } finally {
      loading = false;
    }
  });

  onDestroy(() => {
    clearInterval(foodInterval);
  });

  function changeFood() {
    if (!foodDetails || foodDetails.items.length === 0) return;
    foodIndex = (foodIndex + 1) % foodDetails.items.length;
  }

  function manualChangeFood() {
    changeFood();
  }

  $: condition = weatherData ? weatherData.weather[0].main : 'Default';
  $: timeOfDay = weatherData && weatherData.sys ? (weatherData.dt > weatherData.sys.sunrise && weatherData.dt < weatherData.sys.sunset ? 'day' : 'night') : 'day';
  $: conditionDetails = weatherConditions[condition] || weatherConditions.Default;
  $: weatherLook = conditionDetails[timeOfDay];
  $: foodDetails = conditionDetails.food;
  $: displayedFood = foodDetails ? foodDetails.items[foodIndex] : '...';
  $: temp = weatherData ? weatherData.main.temp : null;
  $: feelsLike = weatherData ? weatherData.main.feels_like : null;
  $: humidity = weatherData ? weatherData.main.humidity : null;
  $: windSpeed = weatherData ? weatherData.wind.speed : null;

  $: {
    if (foodDetails) {
        clearInterval(foodInterval);
        if (foodDetails.items.length > 1) {
            foodInterval = setInterval(changeFood, 4000);
        }
    }
  }

</script>

<div class="w-full h-full bg-cover bg-center transition-all duration-1000 relative" style="background-image: url({weatherLook.background})">
  {#if condition === 'Snow'}<Snowfall />{/if}
  {#if condition === 'Rain' || condition === 'Thunderstorm'}<Rainfall />{/if}
  {#if condition === 'Clouds'}<Clouds />{/if}
  {#if condition === 'Thunderstorm'}<Thunderstorm />{/if}

  <div class="overlay-base {weatherLook.overlay}">
    <div class="nanobanana-card text-white">
      {#if loading}
        <p class="text-3xl">Loading...</p>
      {:else if error}
        <p class="text-3xl text-red-300">Error: {error}</p>
      {:else if weatherData}
        <h1 class="text-6xl font-bold mb-2 text-shadow-lg">{city}</h1>
        <p class="text-3xl italic capitalize mb-4">{weatherData.weather[0].main}</p>
        <div class="temp-gauge">
          <div class="nanobanana-icon" style="font-size: 6rem;">{weatherLook.icon}</div>
          <p class="text-5xl font-bold -mt-2">{Math.round(temp)}°C</p>
        </div>
        <div class="details-panel">
          <div class="detail-item"><span class="detail-icon">🌡️</span><span class="detail-value">{Math.round(feelsLike)}°C</span><span class="detail-label">Feels Like</span></div>
          <div class="detail-item"><span class="detail-icon">💧</span><span class="detail-value">{humidity}%</span><span class="detail-label">Humidity</span></div>
          <div class="detail-item"><span class="detail-icon">💨</span><span class="detail-value">{windSpeed}m/s</span><span class="detail-label">Wind</span></div>
        </div>
        
        <div class="pulsar-food-container">
            <span>{foodDetails.preText}</span>
            <button class="food-pulsar-button" on:click={manualChangeFood}>
              <div class="button-content-wrapper">
                {#key foodIndex}
                  <span class="food-item" 
                    in:slide={{ delay: 300, duration: 400, axis: 'y' }} 
                    out:slide={{ duration: 300, axis: 'y' }}>
                    {displayedFood}
                  </span>
                {/key}
              </div>
            </button>
            <span>{foodDetails.postText}</span>
        </div>

      {/if}
    </div>
  </div>
</div>

<style>
  /* Base Styles */
  .relative { position: relative; }
  .nanobanana-card {
    width: 520px; 
    border-radius: 2.5rem; 
    background: rgba(255, 255, 255, 0.1); 
    backdrop-filter: blur(25px); 
    padding: 3rem 4rem 3.5rem; 
    border: 1px solid transparent; 
    background-clip: padding-box; 
    border-image: linear-gradient(145deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.1)) 1; 
    box-shadow: 20px 20px 40px rgba(0, 0, 0, 0.3), -20px -20px 40px rgba(255, 255, 255, 0.1); 
    transition: all 0.4s ease; 
    position: relative; 
    z-index: 20;
    text-align: center;
  }
  .nanobanana-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 30px 30px 50px rgba(0, 0, 0, 0.35), -30px -30px 50px rgba(255, 255, 255, 0.12); }
  .temp-gauge { width: 220px; height: 220px; border-radius: 50%; margin: 2rem auto; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.15); box-shadow: inset 8px 8px 16px rgba(0, 0, 0, 0.4), inset -8px -8px 16px rgba(255, 255, 255, 0.1); }
  .temp-gauge p, .nanobanana-icon, .text-shadow-lg { text-shadow: 3px 3px 8px rgba(0,0,0,0.6); }
  .details-panel { display: flex; justify-content: space-between; align-items: center; margin-top: 2.5rem; background: rgba(0,0,0,0.2); padding: 1.2rem 2rem; border-radius: 1.5rem; box-shadow: inset 5px 5px 10px rgba(0,0,0,0.5), inset -5px -5px 10px rgba(255,255,255,0.1); }
  .detail-item { display: flex; flex-direction: column; align-items: center; }
  .detail-icon { font-size: 1.7rem; text-shadow: 2px 2px 5px rgba(0,0,0,0.4); }
  .detail-value { font-size: 1.25rem; font-weight: bold; margin-top: 0.25rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
  .detail-label { font-size: 0.8rem; opacity: 0.8; margin-top: 0.1rem; }
  
  /* Pulsar Food Button Styles (Your Vision) */
  .pulsar-food-container {
    margin-top: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 500;
    color: #f0f0f0;
    text-shadow: 2px 2px 6px rgba(0,0,0,0.7);
    min-height: 50px;
  }
  .food-pulsar-button {
    background: rgba(0, 0, 0, 0.2);
    border: none;
    border-top: 2px solid rgba(255, 255, 255, 0.3);
    border-left: 2px solid rgba(255, 255, 255, 0.3);
    border-bottom: 2px solid rgba(0, 0, 0, 0.4);
    border-right: 2px solid rgba(0, 0, 0, 0.4);
    color: white;
    font-weight: 700;
    border-radius: 0.8rem; 
    padding: 0.6rem 2rem; /* YOUR ADJUSTMENT */
    min-width: 200px;      /* YOUR ADJUSTMENT */
    margin: 0 0.5rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.2s ease-out;
    box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.5), -5px -5px 12px rgba(255, 255, 255, 0.1);
  }
  .food-pulsar-button:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 8px 8px 18px rgba(0, 0, 0, 0.6), -6px -6px 16px rgba(255, 255, 255, 0.12);
    border-top-color: rgba(255, 255, 255, 0.5);
    border-left-color: rgba(255, 255, 255, 0.5);
  }
  .food-pulsar-button:active {
    transform: translateY(1px) scale(0.98);
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6), -2px -2px 8px rgba(255, 255, 255, 0.1), inset 3px 3px 5px rgba(0,0,0,0.5);
    border-top-color: rgba(0, 0, 0, 0.3);
    border-left-color: rgba(0, 0, 0, 0.3);
  }
  .button-content-wrapper {
    position: relative;
    width: 100%;
    height: 1.5em; /* Match font-size */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .food-item {
    position: absolute;
    white-space: nowrap;
    font-size: 1.5rem;
    font-weight: 800;
    text-shadow: 
      0px 1px 2px rgba(255, 255, 255, 0.3),
      0px -1px 2px rgba(0, 0, 0, 0.6),
      0 0 5px rgba(0, 0, 0, 0.8),
      0 0 20px rgba(192, 228, 255, 0.4);
  }

  /* Overlay Styles */
  .overlay-base { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; transition: background-color 1.2s ease, backdrop-filter 1.2s ease; position: absolute; top: 0; left: 0; z-index: 15; }
  .overlay-clear-day { background-color: rgba(255, 255, 255, 0.05); backdrop-filter: saturate(1.2) brightness(1.1); }
  .overlay-clouds-day { background-color: rgba(50, 50, 50, 0.4); backdrop-filter: saturate(0.9); }
  .overlay-rain-day { background-color: rgba(0, 10, 20, 0.6); backdrop-filter: brightness(0.8) blur(2px); }
  .overlay-thunderstorm, .overlay-rain-night { background-color: rgba(10, 5, 20, 0.7); backdrop-filter: brightness(0.6) saturate(1.2); }
  .overlay-snow-day { background-color: rgba(220, 225, 230, 0.3); backdrop-filter: brightness(1.05); }
  .overlay-clear-night { background-color: rgba(0, 5, 15, 0.5); backdrop-filter: brightness(0.9); }
  .overlay-clouds-night { background-color: rgba(10, 20, 30, 0.6); backdrop-filter: brightness(0.8); }
  .overlay-snow-night { background-color: rgba(10, 15, 25, 0.5); backdrop-filter: brightness(0.95); }
  .overlay-default { background-color: rgba(0, 0, 0, 0.3); }
</style>
