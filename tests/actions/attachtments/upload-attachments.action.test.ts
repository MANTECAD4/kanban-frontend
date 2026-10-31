import { uploadAttachmentsAction } from "@/actions/attachments/upload-attachments.action";
import { kanbanApplicationApi } from "@/api/kanban-application.api";
import { describe, expect, test, vi } from "vitest";

vi.mock("@/api/kanban-application.api", () => ({
  kanbanApplicationApi: {
    post: vi.fn(() => ({
      data: "this should be an attachments array and other stuff",
    })),
  },
}));

describe("Upload Attachments Action", () => {
  test("should make a POST request using kanbanApplicationApi's correct endpoint", () => {
    const taskId = 10;
    const submitData = {
      attachments: [{} as File],
    };
    uploadAttachmentsAction({ taskId, submitData });
    expect(kanbanApplicationApi.post).toHaveBeenCalledWith(
      `/attachments/in-task/${taskId}`,
      expect.any(FormData),
    );
  });
});
