import { Chance } from 'chance'
import { v4 as uuid } from 'uuid'
import DB from '../../interfaces/DB'
import Item from '../../../common/interfaces/Item'
import App from '../../../src/interfaces/App'

export default class Testkit {
    app: App
    db: DB
    constructor(appDriver: App, dbDriver: DB) {
        this.app = appDriver
        this.db = dbDriver
    }
    anItem(item?: Partial<Item>): Item {
        const random = new Chance()
        const defaultItem: Item = {
            userID: uuid(),
            _id: uuid(),
            title: random.sentence(),
            content: random.sentence()
        }
        return { ...defaultItem, ...item }
    }
    async setItemsInDB(items: Item[]): Promise<Item[]> {
        const itemsInDB: Item[] = []
        await Promise.all(items.map(async (item) => itemsInDB.push(await this.db.setItemInDB(item))))
        return itemsInDB
    }
    async before() {
        await this.db.connect()
    }
    async after() {
        await this.db.disconnect()
    }
}