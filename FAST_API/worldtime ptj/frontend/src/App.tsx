import React, { useEffect, useState } from "react";
import "./App.css";
import axios, { AxiosResponse } from "axios";
import { serverURL } from "./config/constant";

type CityTimeType = {
  name: string;
  timezone: string;
  current_time?: string;
  index: number;
};

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
  // const url = "http://localhost:8000/cities";
  const url = `${serverURL}/cities`;
  // 결국 config 는 여기서 필요가 없었구나
  // const config: AxiosRequestConfig = {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
  //   },
  // };
  // const res = await axios.get(url, config);
  const res: AxiosResponse<Array<CityTimeType>> = await axios.get(url);

  return res;
};

function App() {
  const [cityTimeList, setCityTimeList] = useState([{}] as Array<CityTimeType>);
  const [cityName, setCityName] = useState("");
  const [cityTimezone, setCityTimezone] = useState("");
  useEffect(() => {
    const init = async () => {
      const cityTime = await testAPI();
      // console.log("cityTime", cityTime);
      if (cityTime.data.length > 0) {
        setCityTimeList([...cityTime.data]);
        console.log("city List", cityTimeList);
      }
    };
    // setInterval(() => init(), 1000);
    init();
  }, []);

  const handleFetch = async () => {
    try {
      const res = await testAPI();
      setCityTimeList([...res.data]);
    } catch (e) {
      console.log(e);
    }
  };

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    if (e.target.name === "cityName") {
      setCityName(e.target.value);
    } else if (e.target.name === "cityTimezone") {
      setCityTimezone(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (cityName && cityTimezone) {
      const url = `${serverURL}/cities`;
      const data = {
        name: cityName,
        timezone: cityTimezone,
      };
      const res = await axios.post(url, data);
      console.log(res);
      handleFetch();
    } else {
      alert("TimeZone과 Name 모두를 입력해주세요");
    }
  };

  const handleDelete = async (index: number) => {
    console.log("index", index);
    // const url = `http://localhost:8000/city/${index}`;
    const url = `${serverURL}/city/${index}`;
    try {
      const res = await axios.delete(url);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const cityList = cityTimeList.map((city) => {
    if (city) {
      return (
        <li key={city.index}>
          <p>도시 이름 : {city.name}</p>
          <p>시간역 : {city.timezone}</p>
          <p>현재 시각 : {city.current_time}</p>
          <button onClick={() => handleDelete(city.index)}>삭제하기</button>
        </li>
      );
    } else {
      return null;
    }
  });
  return (
    <div className="App">
      <h1>각 나라의 시간들</h1>
      <button onClick={handleFetch}>목록 최신화</button>
      <hr />
      <div>
        <input
          placeholder="Type TimeZone "
          value={cityTimezone}
          name="cityTimezone"
          onChange={handleType}
        />
        <input
          placeholder="Type Name"
          value={cityName}
          name="cityName"
          onChange={handleType}
        />
        <button onClick={handleSubmit}>Submit </button>
      </div>
      <div>
        <ul>{cityList}</ul>
      </div>
    </div>
  );
}

export default App;
