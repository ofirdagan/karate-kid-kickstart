import { v4 as uuidv4 } from "uuid";
import { Guid } from "../../../common/interfaces/Todo";

export const createMockTodo = (text:string) => ({
  text,
  isFinished: false,
  id: generateID(),
  userID: generateID(),
});

export const generateID = () => uuidv4().toString();

export const addCookieToEndPoint = (id:Guid) =>
  id && { headers: { Cookie: `userID=${id};` } };


