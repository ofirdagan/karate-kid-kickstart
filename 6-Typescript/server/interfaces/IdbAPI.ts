export interface IdbAPI {
    getAllItemsFromDB: (userID: String) => Promise<Object>
    getItemFromDB: (_id: String) => Promise<Object>
    setItemInDB: (userID: string, _id: string, title: string, content: string) => Promise<Object>
    removeItemFromDB: (itemID: String) => Promise<Object>
}