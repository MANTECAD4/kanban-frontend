import { deleteAttachmentAction } from "@/actions/attachments/delete-attachment.action";
import { kanbanApplicationApi } from "@/api/kanban-application.api";
import { describe, expect, test, vi } from "vitest";

vi.mock("@/api/kanban-application.api", () => ({
  kanbanApplicationApi: {
    delete: vi.fn(),
  },
}));

describe("Delete attachment action", () => {
  test("should make a delete request to kanbanApplicationApi using the correct endpoint", async () => {
    vi.mocked(kanbanApplicationApi.delete).mockResolvedValue({
      data: { attatchment: "this-represents-the-deleted-attatcment" },
    });
    const attachmentId = 1;
    await deleteAttachmentAction(attachmentId);
    expect(kanbanApplicationApi.delete).toHaveBeenCalledWith(
      `/attachments/${attachmentId}`,
    );
  });
});
