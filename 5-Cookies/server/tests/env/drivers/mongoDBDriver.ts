import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { MongoDB } from "../../../utils/MongoDB";

export class MongoDriver extends MongoDB {
  mongoServer;
  connectionTries;
  contstrucor() {
    this.connectionTries = 0;
  }
  async setup() {
    try {
      this.mongoServer = await MongoMemoryServer.create();
      this.connectionTries++;
      await mongoose.connect(this.mongoServer.getUri());
    } catch (error) {
      if (this.connectionTries > 1) {
        console.log("Exiting from thrown error", error);
        process.exit(1);
      }
      setTimeout(() => this.setup(), 500);
    }
  }
  async teardown() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await this.mongoServer.stop();
  }
  async emptyDB() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}
