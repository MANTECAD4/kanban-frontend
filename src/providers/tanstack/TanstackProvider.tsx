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

type Props = {
  children: ReactNode;
};

export const queryClient = new QueryClient({
  defaultOptions: { mutations: { retry: false }, queries: { retry: false } },
  queryCache: new QueryCache({
    onError: (error) => {
      let title: string;
      let message: string;
      if (axios.isAxiosError(error)) {
        title = error.response?.data.error.title;
        message = error.response?.data.error.message;
      } else {
        title = "Server error";
        message = error.message;
      }
      if (title && message) {
        toast.error(title, { description: message });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      let title: string;
      let message: string;
      if (axios.isAxiosError(error)) {
        title = error.response?.data.error.title;
        message = error.response?.data.error.message;
      } else {
        title = "Server error";
        message = error.message;
      }
      if (title && message) {
        toast.error(title, { description: message });
      }
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
