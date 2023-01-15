import { isEmpty } from "class-validator";
import { Request, Response, Router } from "express";

const router = Router();

// 만들기

interface payload {
  name: string;
  title: string;
  description: string;
}
const createSub = async (req: Request, res: Response) => {
  const { name, title, description } = req.body;
  let errors: any = null;
  if (isEmpty(name)) errors.name = "커뮤니티 이름을 입력하세요.";
  if (isEmpty(title)) errors.title = "커뮤니티 제목을 입력하세요.";
  if (isEmpty(description)) errors.description = "커뮤니티 설명을 입력하세요.";

  if (errors) {
    return res.status(400).json(errors);
  }
};

router.post("/", createSub);

export default router;
