<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { slide } from 'svelte/transition';
  import Snowfall from './Snowfall.svelte';
  import Rainfall from './Rainfall.svelte';
  import Clouds from './Clouds.svelte';
  import Thunderstorm from './Thunderstorm.svelte';

  const apiKey = '2f8ab9ab2c39b14046b20c31b1701889';
  const city = 'Seoul';

  let weatherData: any = null;
  let loading = true;
  let error: string | null = null;

  let currentFood: string = '...';
  let nextFood: string = '';
  let foodAnimationKey: number = 0;
  let foodInterval: any;

  const imageClearDay = 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2940&auto=format&fit=crop';
  const imageCloudsDay = 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2851&auto=format&fit=crop';
  const imageRainDay = 'https://images.unsplash.com/photo-1515694346937-94d85e41e620?q=80&w=2835&auto=format&fit=crop';
  const imageSnowDay = 'https://images.unsplash.com/photo-1517299321609-5248554c157a?q=80&w=2942&auto=format&fit=crop';
  const imageThunderstorm = 'https://images.unsplash.com/photo-1561485132-5942360b6c28?q=80&w=2874&auto=format&fit=crop';
  const imageClearNight = 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2942&auto=format&fit=crop';
  const imageCloudsNight = 'https://images.unsplash.com/photo-1532174362380-c1b73c4f7495?q=80&w=2938&auto=format&fit=crop';
  const imageRainNight = 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=2835&auto=format&fit=crop';
  const imageSnowNight = 'https://images.unsplash.com/photo-1482597924299-72d56d214a13?q=80&w=2942&auto=format&fit=crop';
  const imageDefault = 'https://images.unsplash.com/photo-1506784983877-45594efa4c85?q=80&w=2940&auto=format&fit=crop';

  type FoodDetails = { preText: string; items: string[]; postText: string; };
  type WeatherLook = { background: string; icon: string; overlay: string; };

  const weatherConditions: { [key: string]: { day: WeatherLook; night: WeatherLook; food: FoodDetails; } } = {
    Clear: {
      day: { background: imageClearDay, icon: '☀️', overlay: 'overlay-clear-day' },
      night: { background: imageClearNight, icon: '🌙', overlay: 'overlay-clear-night' },
      food: { preText: '상쾌한 날엔 ', items: ['시원한 냉면', '과일주스', '신선한 샐러드'], postText: ' 어떠세요?' }
    },
    Clouds: {
      day: { background: imageCloudsDay, icon: '☁️', overlay: 'overlay-clouds-day' },
      night: { background: imageCloudsNight, icon: '☁️', overlay: 'overlay-clouds-night' },
      food: { preText: '구름 낀 날엔 ', items: ['따뜻한 라떼', '핫초코', '카푸치노'], postText: '와 함께.' }
    },
    Rain: {
      day: { background: imageRainDay, icon: '🌧️', overlay: 'overlay-rain-day' },
      night: { background: imageRainNight, icon: '🌧️', overlay: 'overlay-rain-night' },
      food: { preText: '비 오는 날엔 뜨끈한 ', items: ['칼국수', '수제비', '부침개'], postText: '이죠!' }
    },
    Snow: {
      day: { background: imageSnowDay, icon: '❄️', overlay: 'overlay-snow-day' },
      night: { background: imageSnowNight, icon: '❄️', overlay: 'overlay-snow-night' },
      food: { preText: '눈 오는 날엔 ', items: ['따끈한 어묵탕', '달콤한 호떡', '김이 나는 찐빵'], postText: '으로 몸을 녹여보세요.' }
    },
    Thunderstorm: {
      day: { background: imageThunderstorm, icon: '⚡️', overlay: 'overlay-thunderstorm' },
      night: { background: imageThunderstorm, icon: '⚡️', overlay: 'overlay-thunderstorm' },
      food: { preText: '번개 치는 날엔 ', items: ['매운 짬뽕', '따끈한 부대찌개', '치킨에 맥주'], postText: ' 한 잔!' }
    },
    Default: {
      day: { background: imageDefault, icon: '🤔', overlay: 'overlay-default' },
      night: { background: imageDefault, icon: '🤔', overlay: 'overlay-default' },
      food: { preText: '오늘 날씨엔 ', items: ['든든한 국밥', '매콤한 떡볶이', '샌드위치'], postText: '이 좋겠네요.' }
    },
  };

  onMount(async () => {
    try {
      if (apiKey === 'YOUR_API_KEY') throw new Error('API key is not set.');
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      if (!response.ok) throw new Error('Failed to fetch weather data.');
      weatherData = await response.json();
      startFoodRotation();
    } catch (e: any) {
      error = e.message;
    } finally {
      loading = false;
    }
  });

  onDestroy(() => {
    clearInterval(foodInterval);
  });

  function startFoodRotation() {
    if (!foodDetails) return;
    const items = foodDetails.items;
    if (items.length > 0) {
      currentFood = items[0];
      let currentIndex = 0;
      foodInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        changeFood(items[currentIndex]);
      }, 4000);
    }
  }

  function changeFood(newItem: string) {
    if (currentFood !== newItem) {
      nextFood = newItem;
      foodAnimationKey++;
    }
  }

  function manualChangeFood() {
    if (!foodDetails) return;
    const items = foodDetails.items;
    const currentIndex = items.indexOf(currentFood);
    const nextIndex = (currentIndex + 1) % items.length;
    changeFood(items[nextIndex]);
    
    clearInterval(foodInterval);
    startFoodRotation();
  }

  $: condition = weatherData ? weatherData.weather[0].main : 'Default';
  $: timeOfDay = weatherData && weatherData.sys ? (weatherData.dt > weatherData.sys.sunrise && weatherData.dt < weatherData.sys.sunset ? 'day' : 'night') : 'day';
  $: conditionDetails = weatherConditions[condition] || weatherConditions.Default;
  $: weatherLook = conditionDetails[timeOfDay];
  $: foodDetails = conditionDetails.food;
  $: temp = weatherData ? weatherData.main.temp : null;
  $: feelsLike = weatherData ? weatherData.main.feels_like : null;
  $: humidity = weatherData ? weatherData.main.humidity : null;
  $: windSpeed = weatherData ? weatherData.wind.speed : null;

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
                {#key foodAnimationKey}
                  <span class="food-item" 
                    in:slide={{ delay: 300, duration: 400, axis: 'y' }} 
                    out:slide={{ duration: 300, axis: 'y' }}
                    on:outroend={() => { currentFood = nextFood; }}>
                    {currentFood}
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
  
  /* Pulsar Food Button Styles (Deep Dive Edition) */
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
    border-radius: 0.8rem; /* Sharper edges */
    padding: 0.5rem 1.5rem;
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
    font-weight: 800; /* Bolder for more pronounced effect */
    text-shadow: 
      /* Top-light for 3D effect */
      0px 1px 2px rgba(255, 255, 255, 0.3),
      /* Bottom-shadow for depth */
      0px -1px 2px rgba(0, 0, 0, 0.6),
      /* General shadow for readability */
      0 0 5px rgba(0, 0, 0, 0.8),
      /* Nanobanana glow */
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