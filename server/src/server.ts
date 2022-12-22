import exrpess from "express";
import morgan from "morgan";

const app = exrpess();
app.use(exrpess.json());
app.use(morgan("dev"));

app.get("/", (_, res) => res.send("running"));

let port = 5000;

app.listen(port, async () => {
  console.log(`server running at http://localhost:${port}`);
});
