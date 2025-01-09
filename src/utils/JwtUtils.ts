import { jwtDecode } from "jwt-decode";
import User from "../constants/interfaces/User";

export const VAR_TOKEN = "jwtToken";

export const getToken = () => {
  return localStorage.getItem(VAR_TOKEN);
}

export const decodeToken = () => {
  const jwt = getToken();
  if (jwt) {
    return jwtDecode<User>(jwt);
  }
}