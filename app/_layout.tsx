import { useEffect } from "react";
import { Stack, SplashScreen } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useQuery } from "@tanstack/react-query";
import * as ExpoStore from "expo-secure-store";
import withQueryClient from "../src/components/withQueryClient";

export const unstable_settings = {
  initialRouteName: "index",
  onboard: {
    initialRouteName: "start",
  },
};

// Prevent hiding the splash screen
SplashScreen.preventAutoHideAsync();

async function getOnboarding() {
  if (await ExpoStore.isAvailableAsync()) {
    return (await ExpoStore.getItemAsync("onboarded")) === "true";
  }
  return false;
}

function RootLayout(props: any) {
  // Load the font `Poppins_400Regular`
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  const { data: onboarded, isFetched } = useQuery(
    ["onboarded"],
    getOnboarding,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (fontsLoaded && isFetched) {
      // Hide the splash screen after the fonts have loaded and the
      // UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isFetched]);

  // Prevent rendering until the font has loaded
  if (!fontsLoaded || !isFetched) {
    return null;
  }

  return (
    <Stack
      initialRouteName="(onboard)/start"
      screenOptions={{ orientation: "all" }}
    >
      <Stack.Screen name="index" redirect={!onboarded} />
      <Stack.Screen name="(onboard)/start" />
    </Stack>
  );
}

export default withQueryClient(RootLayout);
export { ErrorBoundary } from "expo-router";
