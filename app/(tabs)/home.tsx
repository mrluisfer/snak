import { SafeAreaProvider } from "@/components/ui/safe-area-provider";
import { ViewTitle } from "@/components/ui/view-title";
import { Colors, currentTheme, Styles } from "@/constants/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { useRef } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const inputRef = useRef<TextInput>(null);

  return (
    <SafeAreaProvider as="scrollview">
      <ViewTitle>Snak</ViewTitle>
      <View
        style={{
          backgroundColor: Colors[currentTheme].background,
          padding: 12,
          flexDirection: "row",
          borderRadius: Styles.radius,
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => inputRef.current?.focus()}>
          <MaterialIcons
            name="search"
            size={24}
            color={Colors[currentTheme].icon}
          />
        </Pressable>

        <TextInput
          style={{
            color: Colors[currentTheme].text,
            paddingLeft: 8,
            flex: 1,
            fontSize: Styles.textSize,
          }}
          autoFocus={false}
          placeholder="Search stores and products..."
          placeholderTextColor={Colors[currentTheme].secondaryText}
          ref={inputRef}
          returnKeyType="search"
        />

        <View
          style={{
            width: 1,
            height: 24,
            backgroundColor: Colors[currentTheme].text,
            borderRadius: Styles.radius,
            marginHorizontal: 8,
          }}
        />

        <Pressable onPress={() => alert("Voice search pressed")}>
          <MaterialCommunityIcons
            name="microphone-outline"
            size={24}
            color={Colors[currentTheme].icon}
          />
        </Pressable>
      </View>

      <View style={{ marginTop: Styles.separation }}>
        <Link href="/modal" push asChild>
          <TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: Colors[currentTheme].text,
                  fontSize: Styles.textSize,
                }}
              >
                Address: 123 Main St, Springfield, USA
              </Text>
              <MaterialCommunityIcons
                name="chevron-down"
                size={24}
                color={Colors[currentTheme].icon}
              />
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
