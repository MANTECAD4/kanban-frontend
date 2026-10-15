import { useLogin } from "@/hooks/auth/useLogin";
import { LoginPage } from "@/pages/LoginPage";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { type ReactNode } from "react";

vi.mock("@/hooks/auth/useLogin", () => ({
  useLogin: vi.fn(),
}));

const routerLinkMock = vi.fn(
  ({ to: _to, children }: { to: string; children: ReactNode }) => (
    <i data-testid="mock-router-link">{children}</i>
  ),
);
vi.mock("react-router", () => ({
  Link: (props: { to: string; children: ReactNode }) => routerLinkMock(props),
}));

describe("Login Page Component", () => {
  afterEach(() => vi.clearAllMocks());

  // test("should match snapshot", () => {
  //   const { container } = render(<LoginPage />);
  //   expect(container).toMatchSnapshot();
  // });

  test("showPassword button should call setShowPassword", async () => {
    vi.mocked(useLogin).mockReturnValue({
      setShowPassword: vi.fn(),
      showPassword: false,
      errors: {},
      handleSubmit: vi.fn(),
      onSubmitForm: vi.fn(),
      register: vi.fn(),
    });
    const user = userEvent.setup();

    render(<LoginPage />);
    const { setShowPassword } = useLogin();

    const toggleShowPasswordBtn = screen.getByTitle(/password/i);
    await user.click(toggleShowPasswordBtn);
    expect(setShowPassword).toHaveBeenCalled();
  });

  test("Log In Button should call 'handleSubmit' method", async () => {
    vi.mocked(useLogin).mockReturnValue({
      setShowPassword: () => {},
      showPassword: false,
      errors: {},
      handleSubmit: vi.fn(),
      onSubmitForm: () => {},
      register: vi.fn(),
    });
    const user = userEvent.setup();

    render(<LoginPage />);

    const { handleSubmit, onSubmitForm } = useLogin();

    const sumbitFormBtn = screen.getByText(/log in/i);
    await user.click(sumbitFormBtn);

    expect(handleSubmit).toHaveBeenCalledWith(onSubmitForm);
  });

  test(`should include a react-router Link to '/auth/register' for new user registry`, async () => {
    vi.mocked(useLogin).mockReturnValue({
      setShowPassword: vi.fn(),
      showPassword: false,
      errors: {},
      handleSubmit: vi.fn(),
      onSubmitForm: vi.fn(),
      register: vi.fn(),
    });
    render(<LoginPage />);

    const registerLink = screen.queryByText(/sign up/i);
    expect(registerLink).not.toBeNull();
    expect(routerLinkMock).toHaveBeenCalledWith({
      to: "/auth/register",
      children: expect.any(String),
    });
  });

  test(`should render error messages if there's any of them`, () => {
    const passwordMessage = "Password requires at least one special character";
    const emailMessage = "Email must include @";
    vi.mocked(useLogin).mockReturnValue({
      setShowPassword: vi.fn(),
      showPassword: false,
      errors: {
        password: { message: passwordMessage } as any,
        email: { message: emailMessage } as any,
      },
      handleSubmit: vi.fn(),
      onSubmitForm: vi.fn(),
      register: vi.fn(),
    });

    render(<LoginPage />);

    const passwordErrorDescription = screen.queryByText(passwordMessage);
    const emailErrorDescription = screen.queryByText(emailMessage);

    expect(passwordErrorDescription).not.toBeNull();
    expect(emailErrorDescription).not.toBeNull();
  });
});
