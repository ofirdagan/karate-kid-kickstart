import Item from '../../common/interfaces/Item'
import Guid from '../../common/types/Guid'
import UserID from '../../common/types/userID'
export default interface DB {
    connect(): Promise<boolean>
    disconnect(): Promise<boolean>
    getAllItemsFromDB(userID: UserID): Promise<Item[]>
    getItemFromDB(id: Guid): Promise<Item>
    setItemInDB(item: Item): Promise<Item>
    removeItemFromDB(id: Guid): Promise<Item>
}