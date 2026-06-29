import { loadSession } from "@/actions/auth/load-session.action";
import { useQuery } from "@tanstack/react-query";
import type { SessionResponse } from "@/interfaces/session-response.interface";

export const useLoadSessionQuery = () => {
  return useQuery<SessionResponse>({
    queryFn: loadSession,
    queryKey: ["load-session"],
  });
};
