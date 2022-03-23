
import { AxiosError } from 'axios'
import { v4 as uuid } from 'uuid'
import Testkit from './env/testkit'
import Item from '../../common/interfaces/Item'
import AppDriver from './drivers/appDriver'
import DBDriver from './drivers/DBDriver'
import MongoDBController from '../db/mongoDBController'
import Guid from '../../common/types/Guid'
import UserID from '../../common/types/userID'

const db = new MongoDBController()
const appDriver: AppDriver = new AppDriver('http://localhost:3000')
const dbDriver: DBDriver = new DBDriver(db)
const testkit: Testkit = new Testkit(appDriver, dbDriver)

const mainUserID: UserID = appDriver.userID
const otherUserID: UserID = uuid()

const existingItemID: Guid = uuid()
const nonExistingItemID: Guid = uuid()


describe("todos router", () => {

    beforeAll(async () => await testkit.app.start(db))
    beforeEach(async () => await testkit.before())
    afterEach(async () => await testkit.after())
    afterAll(async () => await testkit.app.close())

    it("should get an empty list from a user with no items", async () => {

        appDriver.setUserIDInCookie(mainUserID)

        const emptyItemList: Item[] = await testkit.app.getAll()

        expect(emptyItemList.length).toBe(0)
    })
    it("should get all items from a user", async () => {

        appDriver.setUserIDInCookie(mainUserID)
        const itemsToInsert: Item[] = [
            testkit.anItem({ userID: mainUserID }),
            testkit.anItem({ userID: mainUserID }),
            testkit.anItem({ userID: otherUserID })
        ]
        const insertedItems: Item[] = await testkit.setItemsInDB(itemsToInsert)

        const mainUserItems: Item[] = await testkit.app.getAll()

        expect(mainUserItems.length).toBe(2)
        expect(mainUserItems[0]).toEqual(insertedItems[0])
        expect(mainUserItems[1]).toEqual(insertedItems[1])
    })
    it("should throw exception when getting a non-existing item", async () => {

        appDriver.setUserIDInCookie(mainUserID)

        try {
            //when
            expect(await testkit.app.get(nonExistingItemID)).toThrow()
        } catch (err) {
            //then
            expect((err as AxiosError).response!.status).toBe(404)
            expect((err as AxiosError).response!.data).toBe(`item no: ${nonExistingItemID} not found`)
        }
    })
    it("should get an existing item", async () => {

        appDriver.setUserIDInCookie(mainUserID)
        const insertedItem: Item = await testkit.db.setItemInDB(testkit.anItem({ _id: existingItemID, userID: mainUserID }))

        const retrivedItem: Item = await testkit.app.get(insertedItem._id)

        expect(retrivedItem).toEqual(insertedItem)
    })
    it("should throw exception when setting an invalid item (w/o title)", async () => {

        appDriver.setUserIDInCookie(mainUserID)
        const invalidItemObject: Item = testkit.anItem({ title: '' })

        try {
            //when
            expect(await testkit.app.set(invalidItemObject)).toThrow()
        } catch (err) {
            //then
            expect((err as AxiosError).response!.data)
                .toBe(`could not set item no: ${invalidItemObject._id}, item validation failed: title: Path \`title\` is required.`)
        }
    })
    it("should set a new valid item", async () => {

        appDriver.setUserIDInCookie(mainUserID)
        const item: Item = testkit.anItem({ _id: existingItemID, userID: mainUserID })

        const insertedItem: Item = await testkit.app.set(item)

        const retrivedItem: Item = await testkit.db.getItemFromDB(insertedItem._id)
        expect(retrivedItem).toEqual(insertedItem)
    })
    it("should update an existing item with valid item properties", async () => {

        appDriver.setUserIDInCookie(mainUserID)
        const oldItem: Item = await testkit.db.setItemInDB(testkit.anItem({ _id: existingItemID, userID: mainUserID }))
        const newItem: Item = testkit.anItem({ _id: existingItemID, userID: mainUserID })

        const itemInDB: Item = await testkit.app.set(newItem)

        expect(itemInDB).toEqual(newItem)
        expect(itemInDB).not.toEqual(oldItem)
    })
    it("should throw exception when removing a non-existing item", async () => {

        appDriver.setUserIDInCookie(mainUserID)

        try {
            //when
            expect(await testkit.app.remove(nonExistingItemID)).toThrow()
        } catch (err) {
            //then
            expect((err as AxiosError).response!.status).toBe(404)
            expect((err as AxiosError).response!.data).toBe(`item no: ${nonExistingItemID} not found`)
        }
    })
    it("should remove an existing item", async () => {

        appDriver.setUserIDInCookie(mainUserID)
        const insertedItem: Item = await testkit.db.setItemInDB(testkit.anItem({ _id: existingItemID, userID: mainUserID }))

        const deletedItem: Item = await testkit.app.remove(insertedItem._id)

        expect(deletedItem).toEqual(insertedItem)
        try {
            expect(await testkit.db.getItemFromDB(deletedItem._id)).toThrow()
        } catch (err) {
            expect((err as AxiosError).message).toBe('Not found')
        }
    })
})