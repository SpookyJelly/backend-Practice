import React from "react";
import "./App.css";
import axios, { AxiosRequestConfig } from "axios";

/*
HTTP 요청은 기본적으로 Cross-site HTTP Request가 적용되나,
<script>로 둘러쌓인 자바스크립트에서 생성된 Cross-Site Http Request는 SOP가 적용된다
그렇기 때문에 스크립트에서도 COP가 적용될 수 있도록 백엔드 미들웨어에서 오리진을 명시해야한다.
--> 궁금한점 : 그럼 똥싼건 프론트의 스크립트인데, 왜 치우는건 백엔드가 치우지?

아...CORS가 사용되는 이유가 자신의 서버 리소스에 임의의 다른 웹사이트들이 request를 보내서 서버에 부하를 걸수 있기때문에
백엔드에서 허락되지 않은 도메인의 요청은 아예 차단 해보리는것이다. <-- 이게 CORS 정책을 따르는것!!
그렇기 때문에 백엔드에서 allow_origins라는 화이트 리스트를 만들어서 사용하는것!

 */
const testAPI = async () => {
  const url = "http://localhost:8000/cities";
  // 결국 config 는 여기서 필요가 없었구나
  // const config: AxiosRequestConfig = {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
  //   },
  // };
  // const res = await axios.get(url, config);
  const res = await axios.get(url);

  console.log(res);
};

const handleFetch = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e);
  testAPI();
};

function App() {
  return (
    <div className="App">
      <h1>각 나라의 시간들</h1>
      <button onClick={handleFetch}>시간 가져오기</button>
    </div>
  );
}

export default App;
