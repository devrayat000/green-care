import { SafeAreaView } from "react-native";
import * as ExpoStore from "expo-secure-store";
import { Stack, useRouter } from "expo-router";
import { Button } from "native-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function setOnboard() {
  if (await ExpoStore.isAvailableAsync()) {
    return ExpoStore.setItemAsync("onboarded", "true");
  }
}

export default function OnboardingPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: onboard } = useMutation(["onboarded"], setOnboard, {
    async onSuccess() {
      await queryClient.cancelQueries({ queryKey: ["onboarded"] });
      queryClient.setQueryData(["todos"], true);
      router.replace("index");
    },
  });

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerShown: false }} />
      <Button
        rounded="full"
        variant="solid"
        color="success.600"
        onPress={() => onboard()}
      >
        Get Started
      </Button>
    </SafeAreaView>
  );
}
