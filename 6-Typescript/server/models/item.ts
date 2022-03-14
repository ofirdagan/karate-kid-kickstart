import { Schema, model } from 'mongoose'
import { Item, Guid} from '../interfaces/Item'

const itemSchema: Schema = new Schema<Item>({
    _id: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: '',
        required: false
    }
})
const itemModel = model<Item>('item', itemSchema)
export default itemModel