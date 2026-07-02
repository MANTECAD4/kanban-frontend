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

export const queryClient = new QueryClient({
  defaultOptions: { mutations: { retry: false }, queries: { retry: false } },
  queryCache: new QueryCache({
    onError: (error) => {
      const { title, message } = getApiError(error);
      toast.error(title, { description: message });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const { title, message } = getApiError(error);
      toast.error(title, { description: message });
    },
  }),
});
export const TanstackProvider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* App.tsx */}
      {children}

      {/*Mostramos las Devtools de Tanstack renderizando este componente dentro del provider*/}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
