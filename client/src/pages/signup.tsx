import Link from "next/link";
import { emit } from "process";
import { FormEvent, useState } from "react";
import InputGroup from "../components/InputGroup";
import { submitSignup } from "../axios/signup";

const Signup = () => {
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

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await submitSignup({ email, username, password });
      console.log(res);
    } catch (err: any) {
      console.error(err);
      if (err.response.status === 400) {
        setError((prev) => {
          return {
            ...prev,
            email: err?.response?.data.email,
            username: err?.response?.data.username,
          };
        });
      }
    }
  };
  return (
    <div className="bg-white max-w-[300px] mx-auto">
      <h1>회원가입</h1>
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
          value={password}
          error={error.password}
          setValue={setPassword}
        />
        <InputGroup
          placeholder={"비밀번호 확인"}
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
        <Link href="" className="text-blue-300">
          로그인
        </Link>
      </small>
    </div>
  );
};
export default Signup;
