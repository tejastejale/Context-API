import {useCallback, useEffect, useState} from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resdata = await response.json();
  if (!response.ok) {
    throw new Error(resdata.message || "Something Went Wrong...!!!");
  }
  return resdata;
}
export default function useHttp(url, config, initialdata) {
  const [data, setData] = useState(initialdata);
  const [error, setError] = useState();
  const [isloading, setIsloading] = useState(false);

  const sendRequest = useCallback(
    async function sendRequest() {
      setIsloading(true);
      try {
        const resdata = await sendHttpRequest(url, config);
        setData(resdata);
      } catch (err) {
        setError(err.message || "Something Went Wrong...");
      }
      setIsloading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isloading,
    error,
    sendRequest,
  };
}
