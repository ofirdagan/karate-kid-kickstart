import mongoose, { Schema, model } from 'mongoose'

export interface Item {
    userID: String,
    title: String,
    content: String
}

const itemSchema: Schema = new Schema<Item>({
    userID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    }
})
const itemModel = model<Item>('item', itemSchema)
export default itemModel