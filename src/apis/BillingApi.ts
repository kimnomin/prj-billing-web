import Billing from "../constants/interfaces/Billing";
import { get, post, patch } from "../utils/HttpUtils";

const URL = {
  GET_LIST: "/api/billing",
  GET_STATS: "/api/billing/stats",
  INSERT: "/api/billing",
  PROC_AMOUNT: "/api/billing",
};

export const getList = async () => {
  return await get(URL.GET_LIST);
};

export const getStats = async (year: string) => {
  return await get(URL.GET_STATS, { year });
};

export const insert = async (data: Billing) => {
  return await post(URL.INSERT, data);
};

export const procAmount = async (keys: number[]) => {
  return await patch(`${URL.PROC_AMOUNT}/${keys}`);
};