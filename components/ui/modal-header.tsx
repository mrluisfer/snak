import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { ViewTitle } from "./view-title";

export default function ModalHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
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
        <ViewTitle>{children}</ViewTitle>
      </View>

      <View style={{ width: 18 }} />
    </View>
  );
}
