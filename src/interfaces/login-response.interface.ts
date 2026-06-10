export interface LoginResponse {
  ok: boolean;
  message: string;
  data: Data;
  accessToken: string;
}

interface Data {
  user: User;
}

interface User {
  id: number;
  email: string;
  name: string;
}
