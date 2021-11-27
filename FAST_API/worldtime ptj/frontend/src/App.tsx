import React from "react";
import "./App.css";
import axios, { AxiosRequestConfig } from "axios";

const testAPI = () => {
  const url = "http://localhost:8000/cities";
  const config: AxiosRequestConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
    },
  };
  const res = axios.get(url, config);

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
      <button onClick={handleFetch}>야호</button>
    </div>
  );
}

export default App;
