import { TestKit } from "../TestKit";

describe("GET /todos", () => {
  const testKit = new TestKit();
  testKit.beforeAndAfter()
  it("get all todos - should return empty array because no todos were created", async () => {
    const { appDriver } = testKit.drivers();

    const todos = await appDriver.getTodos();
    
    expect(todos.data.length).toBe(0);
  });
});
