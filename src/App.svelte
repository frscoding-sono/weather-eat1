
<script lang="ts">
  import Weather from './Weather.svelte';
  import './app.css';

  // '우주를 유영하는 AI 바나나' 이미지를 전체 배경으로 사용합니다.
  const spaceBanana = 'https://images.unsplash.com/photo-1610996614234-45374e5a9c0f?q=80&w=2670&auto=format&fit=crop';
</script>

<!--
  V21.0 이전의 단일 배경 레이아웃으로 복귀합니다.
  전체 화면에 배경을 적용하고, 날씨 컴포넌트를 중앙에 배치합니다.
-->
<div id="app"
     class="h-screen w-screen bg-cover bg-center"
     style="background-image: url({spaceBanana});">

  <!--
    배경 위에 반투명 오버레이와 블러 효과를 적용하여
    콘텐츠 가독성을 확보하고 심미적인 깊이감을 더합니다.
    이 div가 flex 컨테이너 역할을 하여 날씨 앱을 중앙 정렬합니다.
  -->
  <div class="w-full h-full flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm">
    <main>
      <Weather />
    </main>
  </div>

</div>
