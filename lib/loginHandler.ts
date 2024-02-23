import axios from "axios";
import { LoginFormData } from "@/types";

export const loginHandler = async (data: LoginFormData) => {
  const res = await axios.post("http://localhost:8080/auth/login", data);

  console.log("isLogin", res);

  const { sessionToken } = res.data.authentication;
  const id = res.data._id;

  console.log("id", id);

  // 設定 cookie 的過期時間，這裡我們設定為一小時後過期
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 1 * 60 * 60 * 1000); // 1小時

  document.cookie = `HENRY-AUTH=${sessionToken}; expires=${expirationDate.toUTCString()};path=/`;
  document.cookie = `HENRY-AUTH-ID=${id}; expires=${expirationDate.toUTCString()};path=/`;
};