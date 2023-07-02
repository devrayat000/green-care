import { SafeAreaView } from "react-native";
import * as ExpoStore from "expo-secure-store";
import { Stack, useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ExpoImage } from "../../src/components/Factory";
import { Box, Button, Text, VStack } from "native-base";

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
      <VStack h="full" px="6" py="8" alignItems="center">
        <ExpoImage
          source={require("../../assets/tree.png")}
          contentFit="contain"
          w="full"
          flex={1}
        />
        <Text
          fontWeight="medium"
          fontSize="3xl"
          color="gray.700"
          textAlign="center"
          w="full"
        >
          Welcome, and all aboard
        </Text>
        <Box h="8" />
        <Button
          rounded="full"
          w="full"
          variant="solid"
          bgColor="success.500"
          onPress={() => onboard()}
        >
          Get Started
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
