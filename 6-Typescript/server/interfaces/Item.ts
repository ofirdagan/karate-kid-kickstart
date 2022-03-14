export type Guid = string
export interface Item {
    _id: Guid,
    userID: Guid,
    title: string,
    content: string
}