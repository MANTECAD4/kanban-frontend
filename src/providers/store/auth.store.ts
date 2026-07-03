import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
type AuthStatus = "authenticated" | "not-authenticated";

interface AuthProps {
  authStatus: AuthStatus;
  accessToken: string | null;
  id: number | null;
  name: string | null;
  email: string | null;
}

interface AuthActions {
  setSession: (sessionProps: Omit<AuthProps, "authStatus">) => void;
  setAccessToken: (token: string) => void;
  clearSession: () => void;
}

export type AuthState = AuthProps & AuthActions;

const storeApi: StateCreator<AuthState, [["zustand/devtools", never]]> = (
  set,
) => ({
  authStatus: "not-authenticated",
  accessToken: null,
  id: null,
  name: null,
  email: null,
  setSession: (sessionProps) =>
    set({ authStatus: "authenticated", ...sessionProps }, false, "setSession"),
  setAccessToken: (token: string) =>
    set({ accessToken: token }, false, "setAccessToken"),
  clearSession: () =>
    set(
      {
        authStatus: "not-authenticated",
        id: null,
        name: null,
        email: null,
        accessToken: null,
      },
      false,
      "clearSession",
    ),
});

export const useAuthStore = create<AuthState>()(devtools(storeApi));
