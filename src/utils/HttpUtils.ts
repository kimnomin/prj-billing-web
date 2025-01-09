import axios from "axios";
import ResultCode from "../constants/ResultCode";
import { getToken } from "./JwtUtils";

export interface ResponseData {
  resultCode: number;
  resultMessage: string;
  data: object;
  jToken?: string;
}

axios.defaults.timeout = 3000;

const API_URL = import.meta.env.VITE_API_URL;

const getDefaultHeader = () => {
  const jwt = getToken();
  return {
    Authorization: `bearer ${jwt}`,
  };
};

const validateJson = (json: ResponseData) => {
  if (json.resultCode != ResultCode.SUCCESS) {
    if (json.resultMessage) {
      alert(json.resultMessage);
    }
    return null;
  } else {
    return json;
  }
};

export const get = async (url: string, params?: object, options?: object) => {
  const opt = {
    headers: getDefaultHeader(),
    params: params,
  };
  Object.assign(opt, options);

  try {
    const res = await axios.get(API_URL + url, opt);
    const json: ResponseData = res.data;

    return validateJson(json);
  } catch (error) {
    alert("요청에 실패하였습니다. 다시 시도해주세요.");
    console.log("err", error);
  }
};

export const post = async (
  url: string,
  data: object,
  params?: object,
  options?: object
) => {
  const opt = {
    headers: getDefaultHeader(),
    params: params,
  };
  Object.assign(opt, options);

  try {
    const res = await axios.post(API_URL + url, data, opt);
    const json: ResponseData = res.data;

    return validateJson(json);
  } catch (error) {
    alert("요청에 실패하였습니다. 다시 시도해주세요.");
    console.log("err", error);
  }
};

export const patch = async (url: string, data?: object, options?: object) => {
  const opt = {
    headers: getDefaultHeader(),
  };
  Object.assign(opt, options);

  try {
    const res = await axios.patch(API_URL + url, data, opt);
    const json: ResponseData = res.data;

    return validateJson(json);
  } catch (error) {
    alert("요청에 실패하였습니다. 다시 시도해주세요.");
    console.log("err", error);
  }
};
