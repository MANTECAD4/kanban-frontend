import { submitLogin } from "@/actions/auth/submit-login.action";
import { kanbanApplicationApi } from "@/api/kanban-application.api";
import { afterEach, describe, expect, test, vi } from "vitest";

vi.mock("@/api/kanban-application.api", () => ({
  kanbanApplicationApi: {
    post: vi.fn(() => ({ data: "this is the response" })),
  },
}));

describe("Submit Login Action", () => {
  afterEach(() => vi.clearAllMocks());
  test('should make a post request to "/auth/login" endpoint, using provided data', async () => {
    const credentials = {
      email: "nanel@gmail.com",
      password: "MyPassguord3.",
    };

    await submitLogin(credentials);

    expect(vi.mocked(kanbanApplicationApi.post)).toHaveBeenCalledWith(
      "/auth/login",
      credentials,
    );
  });
});
