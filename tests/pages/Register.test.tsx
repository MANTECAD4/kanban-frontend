import { useRegister } from "@/hooks/auth/useRegister";
import { Register } from "@/pages/Register";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, test, vi } from "vitest";

vi.mock("@/hooks/auth/useRegister", () => ({
  useRegister: vi.fn(),
}));

const linkMock = vi.fn(
  ({ to: _to, children }: { to: string; children: ReactNode }) => (
    <i>{children}</i>
  ),
);
vi.mock("react-router", () => ({
  Link: (props: { to: string; children: ReactNode }) => linkMock(props),
}));
const user = userEvent.setup();

describe("Register Page Component", () => {
  afterEach(() => vi.clearAllMocks());
  test(`'showPassword' button should call setShowPassword method`, async () => {
    vi.mocked(useRegister).mockReturnValue({
      register: vi.fn(),
      errors: {},
      handleSubmit: vi.fn(),
      onSubmitForm: vi.fn(),
      setShowPassword: vi.fn(),
      showPassword: false,
    });

    render(<Register />);
    const { setShowPassword } = useRegister();

    const toggleShowPasswordBtn = screen.getByTitle(/password/i);
    await user.click(toggleShowPasswordBtn);
    expect(setShowPassword).toHaveBeenCalled();
  });

  test(`'Register' button should call 'handleSubmitMethod'`, async () => {
    vi.mocked(useRegister).mockReturnValue({
      showPassword: false,
      setShowPassword: vi.fn(),
      register: vi.fn(),
      errors: {},
      onSubmitForm: vi.fn(),
      handleSubmit: vi.fn(),
    });

    render(<Register />);
    const { handleSubmit, onSubmitForm } = useRegister();
    const submitFormBtn = screen.getByRole<HTMLButtonElement>("button", {
      name: /register/i,
    });

    await user.click(submitFormBtn);

    expect(handleSubmit).toHaveBeenCalledWith(onSubmitForm);
  });

  test(`should render a link to '/auth/login' `, () => {
    render(<Register />);

    const loginLink = screen.getByText(/sign in/i);
    expect(loginLink).not.toBeNull();
    expect(linkMock).toHaveBeenCalledWith({
      to: "/auth/login",
      children: "Sign in",
    });
  });

  test("should render error messages for each field", () => {
    const emailErrorMessage = "invalid email";
    const nameErrorMessage = "invalid name";
    const passwordErrorMessage = "invalid password";
    vi.mocked(useRegister).mockReturnValue({
      showPassword: false,
      setShowPassword: vi.fn(),
      register: vi.fn(),
      errors: {
        email: { message: emailErrorMessage } as any,
        name: { message: nameErrorMessage } as any,
        password: { message: passwordErrorMessage } as any,
      },
      onSubmitForm: vi.fn(),
      handleSubmit: vi.fn(),
    });

    render(<Register />);
    const emailErrorLabel = screen.queryByText(emailErrorMessage);
    const nameErrorLabel = screen.queryByText(nameErrorMessage);
    const passwordErrorLabel = screen.queryByText(passwordErrorMessage);
    expect(emailErrorLabel).not.toBeNull();
    expect(nameErrorLabel).not.toBeNull();
    expect(passwordErrorLabel).not.toBeNull();
  });

  test("should have registered each field using register method", () => {
    vi.mocked(useRegister).mockReturnValue({
      showPassword: false,
      setShowPassword: vi.fn(),
      register: vi.fn(),
      errors: {},
      onSubmitForm: vi.fn(),
      handleSubmit: vi.fn(),
    });

    render(<Register />);
    const { register } = useRegister();

    expect(register).toHaveBeenCalledWith("email");
    expect(register).toHaveBeenCalledWith("name");
    expect(register).toHaveBeenCalledWith("password");
  });
});
