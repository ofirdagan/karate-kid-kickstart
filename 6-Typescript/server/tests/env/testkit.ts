import { DB } from "../../interfaces/DB"
import { App } from "../../interfaces/App"
export class Testkit{
    app:App
    db:DB
    constructor(appDriver:App, dbDriver:DB){
        this.app = appDriver
        this.db = dbDriver
    }
    async before(){
        await this.db.connect()
    }
    async after(){
        await this.db.disconnect()
    }
}