import Link from "next/link";
import { FormEvent, useState } from "react";
import InputGroup from "../components/InputGroup";
import { submitSignup } from "../axios/signup";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [error, setError] = useState<{
    email: string;
    username: string;
    password: string;
    checkPassword: string;
  }>({ email: "", username: "", password: "", checkPassword: "" });

  // 회원가입 요청
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await submitSignup({ email, username, password });
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      // 에러 메시지 세팅
      if (err.response.status === 400) {
        setError((prev) => {
          return {
            ...prev,
            email: err?.response?.data.email,
            username: err?.response?.data.username,
            password: err?.response?.data.password,
          };
        });
      }
    }
  };
  return (
    <div className="bg-white max-w-[300px] mx-auto">
      <h1 className="font-bold text-2xl">회원가입</h1>
      <form action="">
        <InputGroup
          placeholder={"이메일"}
          value={email}
          error={error.email}
          setValue={setEmail}
        />
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
        <InputGroup
          placeholder={"비밀번호 확인"}
          type={"password"}
          value={checkPassword}
          error={error.checkPassword}
          setValue={setCheckPassword}
        />
        <button
          className="w-full mt-4 bg-gray-400 ml-1   text-white uppercase rounded py-2"
          onClick={handleSignup}
        >
          회원가입
        </button>
      </form>
      <small>
        이미 가입하셨나요?
        <Link href="/login" className="text-blue-300">
          로그인
        </Link>
      </small>
    </div>
  );
};
export default Signup;
