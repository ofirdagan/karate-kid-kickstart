import { MongoDBService } from "./services/MongoDBSerivce";
import { myApp } from "./app";

const db = new MongoDBService();
db.connect();
myApp(db, process.env.PORT || 3000).start();
