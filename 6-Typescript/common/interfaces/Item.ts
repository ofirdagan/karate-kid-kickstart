import Guid from '../types/Guid'
import UserID from '../types/userID'
export default interface Item {
    _id: Guid,
    userID: UserID,
    title: string,
    content: string
}
export function toItem(item: any): Item {
    return { _id: item._id, userID: item.userID, title: item.title, content: item.content }
}