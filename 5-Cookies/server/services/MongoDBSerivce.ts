import dotenv from "dotenv";
import mongoose from "mongoose";
import { MongoDB } from "../utils/MongoDB";

dotenv.config();

export class MongoDBService extends MongoDB {
  constructor(private connectionTries = 0) {
    super();
  }
  async connect() {
    try {
      const url: string = `${process.env.DB_HOST}`;
      const options: object = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      this.connectionTries++;
      mongoose
        .connect(url, options)
        .catch((err) => console.error(`connection error: ${err}`));
    } catch (error) {
      if (this.connectionTries > 1) {
        console.log("Exiting from thrown error", error);
        process.exit(1);
      }
      setTimeout(() => this.connect(), 500);
    }
  }
  disconnect() {
    return mongoose.connection.close();
  }
  async emptyDB() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}
