export type Guid = string;
export type UserID = Guid

export interface ITodo {
    text: string;
    isFinished: boolean;
    id: Guid;
    userID: UserID;
  }