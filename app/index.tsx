import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function index() {
  return (
    <View>
      <Text>index</Text>
      <Link href="(onboard)/start">Board</Link>
    </View>
  );
}
