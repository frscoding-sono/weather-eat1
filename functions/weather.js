export async function onRequest(context) {
  // context에서 환경 변수와 같은 실행 컨텍스트 정보를 가져옵니다.
  const { env } = context;
  // 최종 진단을 위해 .dev.vars 사용을 일시적으로 중단하고 API 키를 직접 하드코딩합니다.
  const apiKey = "9b10e3118ad8eb9551ae03b2c7fadd02";

  const city = (new URL(context.request.url)).searchParams.get('city') || 'Seoul';

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    // OpenWeatherMap API로 날씨 데이터를 요청합니다.
    const apiResponse = await fetch(apiUrl);

    // API 응답이 정상이 아니면, 에러를 생성하여 catch 블록으로 보냅니다.
    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error(`OpenWeatherMap API Error: ${errorText}`);
      throw new Error(`OpenWeatherMap API 요청 실패. Status: ${apiResponse.status}.`);
    }
    
    // API로부터 받은 데이터를 JSON 형식으로 파싱합니다.
    const data = await apiResponse.json();
    
    // 성공적인 응답을 프론트엔드에 JSON 형식으로 전달합니다.
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    // 이 함수 내에서 발생한 모든 에러를 처리합니다.
    console.error("Weather 함수 처리 중 에러 발생:", error);
    const errorResponse = { message: error.message };
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
