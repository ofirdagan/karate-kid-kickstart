import express from "express";
import cookieParser from "cookie-parser";
import { addCookie } from "./middlewares/cookieMW";
import { todosRouter } from "./router/todosRouter";
import { ITodoDB } from "./interfaces/todoInterface";

export const myApp = (db: ITodoDB, port: Number | String) => {
  const app = express();

  app.use(express.json());
  app.use(express.static("public"));
  app.use(cookieParser());
  app.use(addCookie);
  app.use("/todos", todosRouter(db));

  const listen = () =>
    app.listen(port, () => {
      console.log(`Todo app listening on port ${port}`);
    });

  return {
    start: listen,
  };
};
