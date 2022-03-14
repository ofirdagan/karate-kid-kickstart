import { Schema, model } from "mongoose";
import { ITodo } from "../../common/interfaces/Todo";

const todoSchema = new Schema<ITodo>({
  text: String,
  isFinished: Boolean,
  id: String,
  userID: String
});

const TodoModel = model("todos", todoSchema);
export default TodoModel;
