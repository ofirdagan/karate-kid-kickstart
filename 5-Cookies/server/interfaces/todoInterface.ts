import { Request, Response } from "express";
import { ITodo, UserID } from "../../common/interfaces/Todo";

export interface ITodoDB {
  getTodos: (userID: UserID) => Promise<ITodo[]>;
  createTodo: (todo: ITodo) => Promise<ITodo>;
  updateTodo: (
    todo: Partial<ITodo>,
    id: string,
    options: UpdateItemOptions
  ) => Promise<ITodo>;
  removeTodo: (id: string) => Promise<ITodo>;
}

export interface ITodoController {
  getTodos(req: Request, res: Response<ITodo[]>): void;
  createTodo(req: Request, res: Response<ITodo>): void;
  updateTodo(req: Request, res: Response<ITodo | string>): void;
  deleteTodo(req: Request, res: Response<ITodo | string>): void;
}

export type UpdateItemOptions = {
  new?: boolean;
};
