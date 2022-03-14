
import { AxiosError } from 'axios'
import { Testkit } from './env/testkit'
import { Item } from '../interfaces/Item'
import { AppDriver } from './drivers/appDriver'
import { DBDriver } from './drivers/DBDriver'
import { MongoDBController } from '../db/mongoDBController'
import {v4 as uuid} from 'uuid'

const db = new MongoDBController()
const appDriver: AppDriver = new AppDriver('http://localhost:3000/')
const dbDriver: DBDriver = new DBDriver(db)
const testkit: Testkit = new Testkit(appDriver, dbDriver)
const existingItemID: string = uuid()
const nonExistingItemID: string = uuid()

describe("testing the app's endpoints'", () => {
    testkit.app.start(db)
    test("get all items from a user", async () => {
        await testkit.before()
        const item: Item = {
            _id: existingItemID,
            userID: appDriver.userID,
            title: 'hello world',
            content: ''
        }
        try {
            const emptyItemList: Item[] = await testkit.app.getAll()
            expect(emptyItemList.length).toBe(0)
            const expected: Item = await testkit.db.setItemInDB(item.userID, item._id, item.title, item.content)
            const itemList: Item[] = await testkit.app.getAll()
            expect(itemList.length).toBe(1)
            const onlyItem: Item = itemList[0]
            expect(onlyItem._id).toBe(existingItemID)
            expect(onlyItem.userID).toBe(expected.userID)
            expect(onlyItem.title).toBe(expected.title)
            expect(onlyItem.content).toBe(expected.content)
        } catch (err) {
            console.log(err)
            expect(true).toBe(false)
        }
        await testkit.after()
    })
    test("get a non-existing item from a user", async () => {
        await testkit.before()
        try {
            const emptyItem: Item = await testkit.app.get(nonExistingItemID)
            expect(emptyItem).toEqual({})
        } catch (err) {
            expect((err as AxiosError).response!.status).toBe(404)
            expect((err as AxiosError).response!.data).toBe(`item no: ${nonExistingItemID} not found`)
        }
        await testkit.after()
    })
    test("get an existing item from a user", async () => {
        await testkit.before()
        const item: Item = {
            _id: existingItemID,
            userID: appDriver.userID,
            title: 'hello world',
            content: ''
        }
        try {
            const expected: Item = await testkit.db.setItemInDB(item.userID, item._id, item.title, item.content)
            const itemFromUser: Item = await testkit.app.get(expected._id.toString());
            expect(itemFromUser.userID).toBe(expected.userID)
            expect(itemFromUser.title).toBe(expected.title)
            expect(itemFromUser.content).toBe(expected.content)
        } catch (err) {
            expect(true).toBe(false)
        }
        await testkit.after()
    })
    test("set an invalid item for a user", async () => {
        await testkit.before()
        const item: Item = {
            _id: existingItemID,
            userID: appDriver.userID,
            title: '',
            content: 'this item has an invalid empty title'
        }
        try {
            await testkit.app.set(item._id, item.title, item.content)
            expect(false).toBe(true)
        } catch (err) {
            expect((err as AxiosError).response!.data).toBe('missing item information')
        }
        await testkit.after()
    })
    test("set a new item for a user", async () => {
        await testkit.before()
        const item: Item = {
            _id: existingItemID,
            userID: appDriver.userID,
            title: 'new item',
            content: 'the db is empty'
        }
        try {
            const expected: Item = await testkit.app.set(item._id, item.title, item.content)
            const newItem: Item = await testkit.db.getItemFromDB(expected._id)
            expect(newItem.userID).toBe(expected.userID)
            expect(newItem.title).toBe(expected.title)
            expect(newItem.content).toBe(expected.content)
        } catch (err) {
            expect((err as AxiosError).response!.status).toBe(404)
            expect((err as AxiosError).response!.data).toBe('can not set an item with no title')
        }
        await testkit.after()
    })
    test("update an existing item for a user", async () => {
        await testkit.before()
        const originalItem: Item = {
            _id: existingItemID,
            userID: appDriver.userID,
            title: 'set to be changed',
            content: 'also set to be changed'
        }
        const expectedItem: Item = {
            _id: existingItemID,
            userID: appDriver.userID,
            title: 'changed',
            content: 'also changed'
        }
        try {
            const notExpectedItem: Item = await testkit.db.setItemInDB(originalItem.userID, originalItem._id, originalItem.title, originalItem.content)
            const itemFromUser: Item = await testkit.app.set(notExpectedItem._id, expectedItem.title, expectedItem.content);
            expect(itemFromUser.userID).toBe(expectedItem.userID)
            expect(itemFromUser.title).toBe(expectedItem.title)
            expect(itemFromUser.content).toBe(expectedItem.content)
            expect(itemFromUser.title).not.toBe(notExpectedItem.title)
            expect(itemFromUser.content).not.toBe(notExpectedItem.content)
        } catch (err) {
            expect(true).toBe(false)
        }
        await testkit.after()
    })
    test("remove a non-existing item from a user", async () => {
        await testkit.before()
        try {
            await testkit.app.remove(nonExistingItemID);
        } catch (err) {
            expect((err as AxiosError).response!.status).toBe(404)
            expect((err as AxiosError).response!.data).toBe(`item no: ${nonExistingItemID} not found`)
        }
        await testkit.after()
    })
    test("remove an existing item from a user", async () => {
        await testkit.before()
        const item: Item = {
            _id: existingItemID,
            userID: appDriver.userID,
            title: 'hello world',
            content: ''
        }
        try {
            const insertedItem: Item = await testkit.db.setItemInDB(item.userID, item._id, item.title, item.content);
            const deletedItem: Item = await testkit.app.remove(insertedItem._id);
            expect(deletedItem.userID).toBe(insertedItem.userID)
            expect(deletedItem.title).toBe(insertedItem.title)
            expect(deletedItem.content).toBe(insertedItem.content)
            try{
                await testkit.db.getItemFromDB(deletedItem._id)
            }catch(err){
                expect((err as AxiosError).message).toBe('Not found')
            }
        } catch (err) {
            expect(true).toBe(false)
        }
        await testkit.after()
    })
})