import type { FC, ReactNode } from "react";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "sonner";
import axios from "axios";
import { getApiError } from "@/utils/getApiError";

type Props = {
  children: ReactNode;
};

export const kanbanQueryClient = new QueryClient({
  defaultOptions: {
    mutations: { retry: false },
    queries: { staleTime: 1000 * 60 * 60, retry: false },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const { title, message, code } = getApiError(error);
      console.log({ error: code });
      toast.error(title, { description: message });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const { title, message, code } = getApiError(error);
      console.log({ error: code });
      toast.error(title, { description: message });
    },
  }),
});
export const TanstackProvider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={kanbanQueryClient}>
      {/* App.tsx */}
      {children}

      {/*Mostramos las Devtools de Tanstack renderizando este componente dentro del provider*/}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
