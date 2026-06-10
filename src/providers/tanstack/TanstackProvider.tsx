import type { FC, ReactNode } from "react";

import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import axios from "axios";

type Props = {
  children: ReactNode;
};

export const queryClient = new QueryClient({
  defaultOptions: { mutations: { retry: false } },
  mutationCache: new MutationCache({
    onError: (error) => {
      let title;
      let message;
      if (axios.isAxiosError(error)) {
        title = error.response?.data.error.title ?? "Error";
        message = error.response?.data.error.message || "Missing error details";
      } else {
        title = "Error";
        message = "Something went wrong";
      }
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
