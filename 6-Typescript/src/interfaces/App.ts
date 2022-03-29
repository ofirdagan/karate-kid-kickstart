import DB from '../../server/interfaces/DB'
import Item from '../../common/interfaces/Item'
import Guid from '../../common/types/Guid'
export default interface App {
    start: (db: DB) => void
    close: () => void
    get: (id: Guid) => Promise<Item>
    getAll: () => Promise<Item[]>
    remove: (id: Guid) => Promise<Item>
    set: (item: Item) => Promise<Item>
}