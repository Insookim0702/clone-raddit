import Link from "next/link";
import InputGroup from "../components/InputGroup";

const signup = () => {
  return (
    <div className="">
      <h1>회원가입</h1>
      <form action="">
        <InputGroup value="" error="" setValue={() => {}} />
        <InputGroup value="" error="" setValue={() => {}} />
        <InputGroup value="" error="" setValue={() => {}} />
        <button>회원가입</button>
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
export default signup;
