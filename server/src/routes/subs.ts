import { isEmpty } from "class-validator";
import { NextFunction, Request, Response, Router } from "express";
import userMiddleware from "../middlewares/user";
import authMiddleware from "../middlewares/auth";
import { getRepository } from "typeorm";
import Sub from "../entities/Sub";

const router = Router();

// 만들기

interface payload {
  name: string;
  title: string;
  description: string;
}
const createSub = async (req: Request, res: Response, next: NextFunction) => {
  const { name, title, description } = req.body;
  let errors: any = null;
  // 1. 유저 정보 확인 - 미들웨어
  // 2. 값이 모두 있는 지 확인
  try {
    if (isEmpty(name)) errors.name = "커뮤니티 이름을 입력하세요.";
    if (isEmpty(title)) errors.title = "커뮤니티 제목을 입력하세요.";
    if (isEmpty(description))
      errors.description = "커뮤니티 설명을 입력하세요.";

    const sub = await getRepository(Sub)
      .createQueryBuilder("sub")
      .where("lower(sub.name) = :name", { name: name.toLowerCase() })
      .getOne();

    if (sub) errors.name = "요청하신 서브 이름이 이미 존재합니다.";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }
  } catch (error) {}

  // 3. name과 title이 유니크한지 확인

  // 4. Sub Instance 생성하고 데이터베이스에 저장

  // 5. 저장한 정보 프론트엔드로 전달해주기
};

router.post("/", userMiddleware, authMiddleware, createSub);

export default router;
