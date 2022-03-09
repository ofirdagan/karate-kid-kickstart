export class Testkit{
    app:any
    db:any
    constructor(appDriver:any, dbDriver:any){
        this.app = appDriver
        this.db = dbDriver
    }
    setUserCookie(id:string){
        this.app.setUserCookie(id)
    }
    async before(){
        await this.db.connect()
    }
    async after(){
        await this.db.disconnect()
    }
}