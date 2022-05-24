import http from "http";
import { MongoDriver } from "./env/drivers/mongoDBDriver";
import { myApp } from "../app";
import { AppDriver } from "./env/drivers/appDriver";
export class TestKit {
  private server: http.Server;
  public appDriver: AppDriver;
  private mongoDBDriver: MongoDriver;
  async setup() {
    const port = Math.ceil(Math.random() * 10000 + 1000);
    this.appDriver = new AppDriver(`http://localhost:${port}`);
    this.mongoDBDriver = new MongoDriver();

    const app = myApp(this.mongoDBDriver, port);
    this.server = app.start();
    await this.mongoDBDriver.setup();
  }
  async teardown() {
    this.server.close();
    this.mongoDBDriver.teardown()
  }
  drivers() {
    return { appDriver: this.appDriver, mongoDBDriver: this.mongoDBDriver };
  }
  beforeEach() {
    return this.setup();
  }
  private afterEach() {
    this.teardown();
  }
  beforeAndAfter() {
    beforeEach(async () => {
      await this.beforeEach();
    });
    afterEach(() => {
      this.afterEach();
    });
  }
}
