import { ViewTitle } from "@/components/ui/view-title";
import { Colors, currentTheme } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function Modal() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={() => router.back()}>
          <MaterialIcons name="close" color="white" size={18} />
        </Pressable>

        <View style={{ flex: 1, alignItems: "center" }}>
          <ViewTitle>Addresses</ViewTitle>
        </View>

        <View style={{ width: 18 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors[currentTheme].backgroundSecondary,
    padding: 16,
  },
});
