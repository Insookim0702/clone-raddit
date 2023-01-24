import { isEmpty, validate } from "class-validator";
import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import User from "../entities/User";

const router = Router();

// [
//   ValidationError {
//     target: User { email: 'in@123', username: '123123', password: 'rkskek' },
//     value: 'in@123',
//     property: 'email',
//     children: [],
//     constraints: { isEmail: '이메일 주가 잘못되었습니다.' }
//   }
// ]
const mapErrors = (errors: Object[]) => {
  return errors.reduce((acc: any, error: any) => {
    acc[error.property] = Object.entries(error.constraints)[0][1];
    return acc;
  }, {});
};

// 로그인
const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  let errors: any = {};
  // 빈 값 확인
  if (isEmpty(username)) errors.username = "사용자 이름을 입력해주세요.";
  if (isEmpty(password)) errors.password = "비밀번호를 입력해주세요.";
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }
  try {
    // 디비에서 유저 찾기
    const user = await User.findOneBy({ username });
    // 유저 없으면, 에러 보내기
    if (!user)
      return res.status(400).json({ username: "등록되지 않은 사용자입니다." });
    // 유저 있으면 비밀번호 비교
    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword)
      return res.status(401).json({ password: "비밀번호가 틀립니다." });

    // 비밀번호 맞다면 토큰 생성
    const token = jwt.sign({ username }, process.env.JWT_SECRET as string);

    // 쿠키 저장
    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: "/",
      })
    );
    return res.json({ user, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};
//  회원가입
const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  let errors: any = {};
  // 빈 값 검증
  // if (!email) {
  //   errors.email = "이메일을 작성해주세요.";
  //   return res.status(400).json(errors);
  // }
  // if (!username) {
  //   errors.username = "유저 이름을 작성해주세요.";
  //   return res.status(400).json(errors);
  // }
  // if (!password) {
  //   errors.password = "비밀번호를 작성해주세요.";
  //   return res.status(400).json(errors);
  // }
  try {
    const emailUser = await User.findOneBy({ email });
    const usernameUser = await User.findOneBy({ username });
    if (emailUser) errors.email = "이미 해당 이메일 주소가 사용되었습니다.";
    if (usernameUser)
      errors.username = "이미 해당 유저 닉네임이 사용되었습니다.";

    if (errors.email || errors.password) {
      return res.status(400).json(errors);
    }

    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;

    // 엔티티에 정해 놓은 조건으로 user 데이터의 유효성 검사를 함.
    errors = await validate(user);
    console.log(errors);
    console.log("====================");
    console.log(mapErrors(errors));

    if (errors.length > 0) return res.status(400).json(mapErrors(errors));

    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

router.post("/register", register);
router.post("/login", login);

export default router;
