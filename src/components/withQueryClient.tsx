import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import useOnlineManager from "../hooks/useOnlineManager";
import useRefreshOnFocus from "../hooks/useRefreshOnFocus";
import { NativeBaseProvider, extendTheme } from "native-base";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 3_600,
      networkMode: "offlineFirst",
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const theme = extendTheme({
  fontConfig: {
    Poppins: {
      400: {
        normal: "Poppins_400Regular",
      },
      500: {
        normal: "Poppins_500Medium",
      },
      700: {
        normal: "Poppins_700Bold",
      },
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
});

export default function withQueryClient<T>(Component: React.ComponentType<T>) {
  return function WrapperComponent(props: T) {
    useOnlineManager();
    useRefreshOnFocus();

    return (
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider
          theme={theme}
          config={{ strictMode: "off" }}
          isSSR={false}
        >
          <Component {...props} />
        </NativeBaseProvider>
      </QueryClientProvider>
    );
  };
}
