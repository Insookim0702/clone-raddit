import { validate } from "class-validator";
import { Request, Response, Router } from "express";
import User from "../entities/User";

const router = Router();

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    let errors: any = {};

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

    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

router.post("/register", register);

export default router;
