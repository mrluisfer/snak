import React from "react";
import { ScrollView, ScrollViewProps, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ViewWithAs = ViewProps & { as: "view" };
type ScrollWithAs = ScrollViewProps & { as: "scrollview" };
type SafeAreaProviderProps = ViewWithAs | ScrollWithAs;

export function SafeAreaProvider(props: SafeAreaProviderProps) {
  const insets = useSafeAreaInsets();

  const baseStyle = {
    flex: 1,
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: 16,
    paddingRight: 16,
  } as const;

  if (props.as === "scrollview") {
    const { style, ...rest } = props;
    return <ScrollView {...rest} style={[baseStyle, style]} />;
  } else if (props.as === "view") {
    const { style, ...rest } = props;
    return <View {...rest} style={[baseStyle, style]} />;
  } else {
    return null;
  }
}
