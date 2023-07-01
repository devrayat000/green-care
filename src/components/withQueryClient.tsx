import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import useOnlineManager from "../hooks/useOnlineManager";
import useRefreshOnFocus from "../hooks/useRefreshOnFocus";
import { GluestackUIProvider } from "./core";
import { config } from "../../gluestack-ui.config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 3_600,
      networkMode: "offlineFirst",
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function withQueryClient<T>(Component: React.ComponentType<T>) {
  return function WrapperComponent(props: T) {
    useOnlineManager();
    useRefreshOnFocus();

    return (
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config.theme}>
          <Component {...props} />
        </GluestackUIProvider>
      </QueryClientProvider>
    );
  };
}
