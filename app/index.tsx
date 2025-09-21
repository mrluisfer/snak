import { Input } from "@/components/ui/input";
import { SafeAreaProvider } from "@/components/ui/safe-area-provider";
import { ViewTitle } from "@/components/ui/view-title";
import { Colors, currentTheme } from "@/constants/theme";
import { supabase } from "@/lib/supabase";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, Pressable, Text, View } from "react-native";

export default function RootView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatusMessage, setLoginStatusMessage] = useState<null | string>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  async function handleLogin() {
    setIsLoading(true);
    setLoginStatusMessage(null);
    try {
      Alert.alert(`Logging in with ${email} and ${password}`);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setLoginStatusMessage(error.message || error.name || "Login failed");
        throw error;
      }

      if (data.user) {
        router.push("/(tabs)/home");
      }
    } catch (error) {
      alert("Login failed");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaProvider
      as="view"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ViewTitle>Sign In</ViewTitle>
      <Text
        style={{
          color: Colors[currentTheme].secondaryText,
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Enter a valid email and password to continue.
      </Text>
      <View style={{ width: "100%", gap: 30 }}>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setEmail}
          leftIcon={
            <MaterialIcons
              name="email"
              size={20}
              color={Colors[currentTheme].secondaryText}
            />
          }
        />
        <Input
          placeholder="Password"
          secureTextEntry={!showPassword}
          keyboardType="visible-password"
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setPassword}
          leftIcon={
            <MaterialIcons
              name="lock"
              size={20}
              color={Colors[currentTheme].secondaryText}
            />
          }
          rightIcon={
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={20}
                color={Colors[currentTheme].secondaryText}
              />
            </Pressable>
          }
        />
        <Button
          title="Login"
          onPress={handleLogin}
          color={"#1E90FF"}
          disabled={isLoading || !email || !password}
          accessibilityLabel="Login button"
          accessibilityState={{ busy: isLoading, disabled: isLoading }}
        />
        <Text>{loginStatusMessage}</Text>
      </View>
      <View>
        <Button
          title="Go to Sign Up"
          onPress={() => router.push("/signup")}
          color={"#1E90FF"}
          accessibilityLabel="Go to Sign Up"
        />
      </View>
    </SafeAreaProvider>
  );
}
