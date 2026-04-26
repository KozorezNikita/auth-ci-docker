import { getTodoById } from "./todo.service";
import * as repo from "../repositories/todo.repo";

jest.mock("../repositories/todo.repo");

describe("getTodoById", () => {
  it("повертає todo якщо все ок", async () => {
    (repo.getTodoById as jest.Mock).mockResolvedValue({
      id: 1,
      title: "Test",
      userId: 1,
    });

    const result = await getTodoById(1, 1);

    expect(result).toEqual({
      id: 1,
      title: "Test",
      userId: 1,
    });
  });

  it("кидає помилку якщо todo не належить юзеру", async () => {
    (repo.getTodoById as jest.Mock).mockResolvedValue({
      id: 12,
      title: "Test",
      userId: 2,
    });

    await expect(getTodoById(1, 1)).rejects.toThrow("Todo not found");
  });

  it("кидає помилку якщо todo не існує", async () => {
    (repo.getTodoById as jest.Mock).mockResolvedValue(null);

    await expect(getTodoById(1, 1)).rejects.toThrow("Todo not found");
  });
});