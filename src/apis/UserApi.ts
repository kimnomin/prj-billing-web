import User from "../constants/interfaces/User";
import { post } from "../utils/HttpUtils";

const URL = {
  LOGIN: "/auth/login-jwt",
  LOGOUT: "/auth/logout"
};

export const login = async (data: User) => {
  return await post(URL.LOGIN, data);
};

export const logout = async () => {
  const data = {};
  return await post(URL.LOGOUT, data);
}