import { Button, Pressable, Text, View } from "react-native";
import { Input } from "@/components/ui/input";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors, currentTheme, Styles } from "@/constants/theme";
import React, { useState } from "react";

export enum AuthType {
  LOGIN = "login",
  SIGNUP = "signup",
}
interface AuthFormProps {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  onSubmit: () => void;
  isButtonDisabled?: boolean;
  isLoading?: boolean;
  type: AuthType;
  setName?: (name: string) => void;
  statusMessage?: string | null;
}
export function AuthForm({
  setEmail,
  setPassword,
  onSubmit,
  isButtonDisabled,
  isLoading = false,
  type,
  setName,
  statusMessage,
}: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ width: "100%", gap: 30 }}>
      {type === AuthType.SIGNUP && (
        <Input
          placeholder="Name"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setName}
          leftIcon={
            <MaterialIcons
              name="person"
              size={20}
              color={Colors[currentTheme].secondaryText}
            />
          }
        />
      )}
      <Input
        placeholder="Email"
        keyboardType="email-address"
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
        title={type === AuthType.LOGIN ? "Login" : "Signup"}
        onPress={onSubmit}
        color={"#1E90FF"}
        disabled={isButtonDisabled}
        accessibilityLabel="Auth form button"
        accessibilityState={{ busy: isLoading, disabled: isLoading }}
      />
      <Text style={{ fontSize: Styles.secondaryTextSize }}>
        {statusMessage}
      </Text>
    </View>
  );
}
