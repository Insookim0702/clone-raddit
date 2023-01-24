import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import subsRoutes from "./routes/subs";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
const origin = "http://localhost:3000";
app.use(
  cors({
    origin,
    credentials: true,
  })
);

app.get("/", (_, res) => res.send("running"));
// 회원가입 요청, 로그인 요청
app.use("/api/auth", authRoutes);
app.use("/api/subs", subsRoutes);

let port = 4000;
dotenv.config();
app.listen(port, async () => {
  console.log(`server running at http://localhost:${port}`);
  AppDataSource.initialize()
    .then(() => {
      console.log("database initialize");
    })
    .catch((error) => console.log(error));
});
