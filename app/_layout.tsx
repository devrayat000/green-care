import { useEffect } from "react";
import { Stack, SplashScreen } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useQuery } from "@tanstack/react-query";
import * as ExpoStore from "expo-secure-store";

// Prevent hiding the splash screen
SplashScreen.preventAutoHideAsync();

async function getOnboarding() {
  if (await ExpoStore.isAvailableAsync()) {
    return (await ExpoStore.getItemAsync("onboarded")) === "true";
  }
  return false;
}

export default function RootLayout() {
  // Load the font `Poppins_400Regular`
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
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
      initialRouteName={onboarded ? "index" : "onboard"}
      screenOptions={{ orientation: "all" }}
    />
  );
}

export { ErrorBoundary } from "expo-router";
