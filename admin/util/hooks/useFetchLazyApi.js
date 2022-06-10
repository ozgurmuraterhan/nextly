import { useState } from "react";
import axios from "axios";
const useFetchLazyApi = (apiPath) => {
  const [data, setData] = useState({
    loading: false,
    error: null,
    resp: null,
  });

  const fetchApi = async (variables) => {
    let params = "";
    if (variables) params = "?" + new URLSearchParams(variables).toString();
    setData({ ...data, loading: true });

    const response = await axios.get(apiPath + params);
    if (!response.statusText === "OK") {
      const errMessage = `An error has occurred: ${response.status}`;
      setData({
        loading: false,
        error: errMessage,
        resp: null,
      });
      return { success: false, message: errMessage };
    }
    response.ok; // => false | true
    response.status; // => 404 | 200 ..
    const resp = await response.data;
    setData({
      loading: false,
      error: null,
      resp: resp,
    });
    return resp;
  };

  return [fetchApi, data.resp, data.loading];
};

export default useFetchLazyApi;
