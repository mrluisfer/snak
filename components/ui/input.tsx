import { Colors, currentTheme, Styles } from "@/constants/theme";
import { useRef } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export function Input(props: InputProps) {
  const inputRef = useRef<TextInput>(null);

  return (
    <Pressable onPress={() => inputRef.current?.focus()}>
      <View style={styles.container}>
        {props.leftIcon}
        <TextInput
          {...props}
          style={[styles.input, props.style]}
          placeholderTextColor={Colors[currentTheme].secondaryText}
        />
        {props.rightIcon}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Styles.radius,
    padding: 14,
    backgroundColor: Colors[currentTheme].background,
    gap: 8,
  },
  input: {
    color: Colors[currentTheme].text,
    flex: 1,
    fontSize: Styles.textSize,
  },
});
