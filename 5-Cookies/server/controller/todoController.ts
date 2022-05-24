import { Request, Response } from "express";
import { ITodoController, ITodoDB } from "../interfaces/todoInterface";
import { ITodo, UserID } from "../../common/interfaces/Todo";
import { errorMessages } from "../../common/errorMessages";

export class TodoController implements ITodoController {
  constructor(private db: ITodoDB) {}
  getTodos(req: Request, res: Response<ITodo[]>): void {
    const userID: UserID = req.cookies.userID;
    this.db.getTodos(userID).then((todos: ITodo[]) => {
      res.status(200).json(todos);
    });
  }

  createTodo(req: Request, res: Response<ITodo>): void {
    const todo: ITodo = req.body;
    this.db.createTodo({ ...todo, userID: req.cookies.userID }).then((todo) => {
      return res.status(200).json(todo);
    });
  }
  updateTodo(req: Request, res: Response<ITodo | string>): void {
    const { text, isFinished }: Partial<ITodo> = req.body.data;
    this.db
      .updateTodo({ text, isFinished }, req.params.id, { new: true })
      .then((doc) => {
        if (!doc)
          return res
            .status(400)
            .send(errorMessages.statusCode400.updateItemMsg);
        return res.status(200).send(doc);
      });
  }
  deleteTodo(req: Request, res: Response<ITodo | string>): void {
    this.db.removeTodo(req.params.id).then((doc) => {
      if (!doc)
        return res.status(400).send(errorMessages.statusCode400.deleteItemMsg);
      return res.status(200).send(doc);
    });
  }
}
