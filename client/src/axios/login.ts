// 회원가입 요청

import request from "./core";

interface params {
  password: string;
  username: string;
}
export const submitLogin = async ({ password, username }: params) => {
  try {
    return await request.post("/auth/login", {
      password,
      username,
    });
  } catch (error: any) {
    throw error;
  }
};
