import type { FC, ReactNode } from "react";

import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "sonner";

type Props = {
  children: ReactNode;
};

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (data) => {
      const message = (data as any).message;
      toast.success(message);
    },
    onError: (error) => {
      console.log({ error });
      const message =
        (error as any).response?.data.error.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
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
