import express, { Request, Response } from "express";
import { ITodo } from "../../common/interfaces/Todo";
import { ITodoDB } from "../interfaces/todoInterface";
import { TodoController } from "../controller/todoController";

export const todosRouter = (db: ITodoDB) => {
  const router = express.Router();
  const todoController = new TodoController(db);

  router.get("/", (req: Request, res: Response<ITodo[]>) => {
    todoController.getTodos(req, res);
  });

  router.post("/", (req: Request, res: Response<ITodo>) => {
    todoController.createTodo(req, res);
  });

  router.put("/:id", (req: Request, res: Response<ITodo>) => {
    todoController.updateTodo(req, res);
  });

  router.delete("/:id", (req: Request, res: Response<ITodo>) => {
    todoController.deleteTodo(req, res);
  });

  return router;
};
