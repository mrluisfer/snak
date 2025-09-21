import { SafeAreaProvider } from "@/components/ui/safe-area-provider";
import { ViewTitle } from "@/components/ui/view-title";
import React from "react";
import { Text } from "react-native";

export default function Orders() {
  return (
    <SafeAreaProvider as="scrollview">
      <ViewTitle>Orders</ViewTitle>
      <Text>Orders</Text>
    </SafeAreaProvider>
  );
}
