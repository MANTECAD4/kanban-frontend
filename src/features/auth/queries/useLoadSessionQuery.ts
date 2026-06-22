import { loadSession } from "@/features/auth/actions/load-session.action";
import { useQuery } from "@tanstack/react-query";
import type { SessionResponse } from "@/shared/interfaces/session-response.interface";

export const useLoadSessionQuery = () => {
  return useQuery<SessionResponse>({
    queryFn: loadSession,
    queryKey: ["load-session"],
  });
};
