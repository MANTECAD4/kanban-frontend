import { getAttachmentsAction } from "@/actions/attachments/get-attachments.action";
import { kanbanApplicationApi } from "@/api/kanban-application.api";
import { describe, expect, test, vi } from "vitest";
vi.mock("@/api/kanban-application.api", () => ({
  kanbanApplicationApi: {
    get: vi.fn(() => ({
      data: { attachments: ["an-attachments-list"] },
    })),
  },
}));
describe("Get Attachments Action", () => {
  test("should make a GET request to correct endpoint using kanbanApplicationApi", async () => {
    const taskId = 10;
    await getAttachmentsAction(taskId);
    expect(kanbanApplicationApi.get).toHaveBeenCalledWith(
      `/attachments/in-task/${taskId}`,
    );
  });
});
