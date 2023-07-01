import { SafeAreaView } from "react-native";
import * as ExpoStore from "expo-secure-store";
import { Stack, useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ExpoImage } from "../src/components/Factory";
import { Button, VStack } from "../src/components";

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
      queryClient.setQueryData(["onboarded"], true);
      router.replace("/index");
    },
  });

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerShown: false }} />
      <VStack h="$full" p="$6" alignItems="center">
        <ExpoImage
          source={require("../assets/tree.png")}
          contentFit="contain"
          w="$full"
          flex={1}
          // alignSelf="center"
        />
        <Button
          rounded="$full"
          w="$full"
          variant="solid"
          bgColor="$success500"
          onPress={() => onboard()}
          // justifyse="flex-end"
        >
          <Button.Text>Get Started</Button.Text>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
