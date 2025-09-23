import { SafeAreaProvider } from "@/components/ui/safe-area-provider";
import { ViewTitle } from "@/components/ui/view-title";
import { Colors, currentTheme, Styles } from "@/constants/theme";
import { supabase } from "@/lib/supabase";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { AuthForm, AuthType } from "@/components/auth/form";
import { Image } from "expo-image";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatusMessage, setLoginStatusMessage] = useState<null | string>(
    null,
  );

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
        const errorMessage = error.message || error.name || "Login failed";
        setLoginStatusMessage(errorMessage);
        Alert.alert(errorMessage);
      }

      if (data.user) {
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      alert("Login failed");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaProvider as={"view"} style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 16,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View>
              <Image
                source={require("@/assets/images/cookie-love.svg")}
                style={{
                  width: 400,
                  height: 300,
                  resizeMode: "contain",
                }}
              />
            </View>

            <Text style={{ fontSize: 28, marginVertical: 16 }}>Sign In</Text>

            <Text
              style={{
                marginBottom: 16,
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Enter a valid email and password to continue.
            </Text>

            <View style={{ width: "100%", gap: 30 }}>
              <AuthForm
                setEmail={setEmail}
                setPassword={setPassword}
                isLoading={isLoading}
                onSubmit={handleLogin}
                isButtonDisabled={isLoading || !email || !password}
                type={AuthType.LOGIN}
                statusMessage={loginStatusMessage}
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <Button
                title="Go to Sign Up"
                onPress={() => router.push("/signup")}
                color={"#1E90FF"}
                accessibilityLabel="Go to Sign Up"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </>
  );
}
