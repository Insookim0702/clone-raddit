import Link from "next/link";
import { FormEvent, useState } from "react";
import InputGroup from "../components/InputGroup";
import { submitLogin } from "../axios/login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  // 로그인 요청
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await submitLogin({ username, password });
    } catch (err: any) {
      console.error(err);
      // 에러 메시지 세팅
      if (err.response.status === 400) {
        setError((prev) => {
          return {
            ...prev,
            username: err?.response?.data.username,
            password: err?.response?.data.password,
          };
        });
      }
    }
  };
  return (
    <div className="bg-white max-w-[300px] mx-auto">
      <h1 className="font-bold text-2xl">로그인</h1>
      <form action="">
        <InputGroup
          placeholder={"유저 닉네임"}
          value={username}
          error={error.username}
          setValue={setUsername}
        />
        <InputGroup
          placeholder={"비밀번호"}
          type={"password"}
          value={password}
          error={error.password}
          setValue={setPassword}
        />

        <button
          className="w-full mt-4 bg-gray-400 ml-1   text-white uppercase rounded py-2"
          onClick={handleLogin}
        >
          로그인
        </button>
      </form>
      <Link href="/signup">
        <small className="underline">회원가입</small>
      </Link>
    </div>
  );
};
export default Login;
