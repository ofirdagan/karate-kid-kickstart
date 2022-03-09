
import axios, { AxiosError } from 'axios'
import { Testkit } from './env/testkit'
import itemModel, { Item } from '../models/item'
import { AppDriver } from './drivers/appDriver'
import { DBDriver } from './drivers/DBDriver'
import { MongoDBController } from '../db/mongoDBController'

const db = new MongoDBController(itemModel)
const appDriver: AppDriver = new AppDriver('http://localhost:3000/', axios)
const dbDriver: DBDriver = new DBDriver(db, itemModel)
const testkit: Testkit = new Testkit(appDriver, dbDriver)

describe("testing the app's endpoints'", () => {
    testkit.app.start(db)
    test("get all items from a user", async () => {
        await testkit.before()
        const item: Item = {
            userID: '1',
            title: 'hello world',
            content: ''
        }
        try {
            const expected: Item = await testkit.db.setItemInDB(item.userID, 'none', item.title, item.content);
            const itemList: Item[] = await testkit.app.getAll();
            const onlyItem: Item = itemList[0]
            expect(onlyItem.userID).toBe(expected.userID)
            expect(onlyItem.title).toBe(expected.title)
            expect(onlyItem.content).toBe(expected.content)
        } catch (err) {
            expect(true).toBe(false)
        }
        await testkit.after()
    })
    test("get a non-existing item from a user", async () => {
        await testkit.before()
        try {
            await testkit.app.get('-1');
            expect(true).toBe(false)
        } catch (err) {
            expect((err as AxiosError).response!.status).toBe(404)
            expect((err as AxiosError).response!.data).toBe('item no: -1 not found')
        }
        await testkit.after()
    })
    test("get an existing item from a user", async () => {
        await testkit.before()
        const item: Item = {
            userID: '1',
            title: 'hello world',
            content: ''
        }
        try {
            const expected: any = await testkit.db.setItemInDB(item.userID, 'none', item.title, item.content)
            const itemFromUser: Item = await testkit.app.get(expected._id.toString());
            expect(itemFromUser.userID).toBe(expected.userID)
            expect(itemFromUser.title).toBe(expected.title)
            expect(itemFromUser.content).toBe(expected.content)
        } catch (err) {
            console.log(err)
            expect(true).toBe(false)
        }
        await testkit.after()
    })
    test("set an invalid item for a user", async () => {
        await testkit.before()
        const item: Item = {
            userID: '1',
            title: '',
            content: 'this item has an invalid title'
        }
        try {
            await testkit.app.set('none', item.title, item.content)
            expect(false).toBe(true)
        } catch (err) {
            expect((err as AxiosError).response!.data).toBe('can not set an item with no title')
        }
        await testkit.after()
    })
    test("set a new item for a user", async () => {
        await testkit.before()
        const item: Item = {
            userID: '1',
            title: 'new item',
            content: 'the db is enmpy'
        }
        try {
            const expected: any = await testkit.app.set('none', item.title, item.content)
            const newItem: Item = await testkit.db.getItemFromDB(expected._id.toString())
            expect(newItem.userID).toBe(expected.userID)
            expect(newItem.title).toBe(expected.title)
            expect(newItem.content).toBe(expected.content)
        } catch (err) {
            expect((err as AxiosError).response!.data).toBe('can not set an item with no title')
        }
        await testkit.after()
    })
    test("update an existing item for a user", async () => {
        await testkit.before()
        const originalItem: Item = {
            userID: '1',
            title: 'set to be changed',
            content: 'also set to be changed'
        }
        const targetItem: Item = {
            userID: '1',
            title: 'changed',
            content: 'also changed'
        }
        try {
            const notExpected: any = await testkit.db.setItemInDB(originalItem.userID, 'none', originalItem.title, originalItem.content)
            const itemID = notExpected._id.toString()
            const itemFromUser: Item = await testkit.app.set(itemID, targetItem.title, targetItem.content);
            expect(itemFromUser.userID).toBe(targetItem.userID)
            expect(itemFromUser.title).toBe(targetItem.title)
            expect(itemFromUser.content).toBe(targetItem.content)
            expect(itemFromUser.title).not.toBe(notExpected.title)
            expect(itemFromUser.content).not.toBe(notExpected.content)
        } catch (err) {
            expect(true).toBe(false)
        }
        await testkit.after()
    })
    test("remove a non-existing item from a user", async () => {
        await testkit.before()
        const nonExistingItemID = '-1'
        try {
            await testkit.app.remove(nonExistingItemID);
            expect(true).toBe(false)
        } catch (err) {
            expect((err as AxiosError).response!.status).toBe(404)
            expect((err as AxiosError).response!.data).toBe('item no: -1 not found')
        }
        await testkit.after()
    })
    test("remove an existing item from a user", async () => {
        await testkit.before()
        const item: Item = {
            userID: '1',
            title: 'hello world',
            content: ''
        }
        try {
            const existingItem: any = await testkit.db.setItemInDB(item.userID, 'none', item.title, item.content);
            const response: any = await testkit.app.remove(existingItem._id);
            const deleted: boolean = response.status == 200 ? true : false
            expect(deleted).toBe(true)
            const nonExisingItem: any = await testkit.db.getItemFromDB(existingItem._id)
        } catch (err) {
            console.log(err)
            expect(true).toBe(false)
        }
        await testkit.after()
    })
})