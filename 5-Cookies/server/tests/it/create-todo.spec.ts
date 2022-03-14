import { TestKit } from "../TestKit";
import { createMockTodo } from "../utils/utils";

describe("POST /todos", () => {
  const testKit = new TestKit();
  testKit.beforeAndAfter()
  afterEach(() => {
    const { mongoDBDriver } = testKit.drivers();
    mongoDBDriver.emptyDB();
  });
  it("create new todo with cookie appended to the request", async () => {
    const { appDriver, mongoDBDriver } = testKit.drivers();
    const newTodo1 = createMockTodo("test1");
    appDriver.setUserCookie(newTodo1.userID);

    const res = await appDriver.createTodo(newTodo1);
    expect(res.status).toBe(200);

    const todos = await mongoDBDriver.getTodos(newTodo1.userID);
    expect(todos[0].text).toBe("test1");
    expect(todos.length).toBe(1);
  });

  it("should only return the user's todos", async () => {
    const { appDriver, mongoDBDriver } = testKit.drivers();
    const newTodo1 = createMockTodo("test1");
    const newTodo2 = createMockTodo("test2");

    await appDriver.createTodo(newTodo1);
    appDriver.setUserCookie(newTodo2.userID);
    await appDriver.createTodo(newTodo2);

    const todos = await mongoDBDriver.getTodos(newTodo2.userID);
    expect(todos[0].text).toBe("test2");
    expect(todos.length).toBe(1);
  });
});
