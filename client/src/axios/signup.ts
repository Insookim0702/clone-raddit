// 회원가입 요청

import request from "./core";

interface params {
  email: string;
  password: string;
  username: string;
}
export const submitSignup = async ({ email, password, username }: params) => {
  try {
    await request.post("/auth/register", {
      email,
      password,
      username,
    });
  } catch (error: any) {
    throw error;
  }
};
