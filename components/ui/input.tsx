import { Colors, currentTheme, Styles } from "@/constants/theme";
import { ReactNode, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputProps extends TextInputProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
export function Input(props: InputProps) {
  const inputRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState(false);

  return (
    <Pressable onPress={() => inputRef.current?.focus()}>
      <View style={[styles.container, isFocused && styles.inputFocused]}>
        {props.leftIcon}
        <TextInput
          {...props}
          style={[styles.input, props.style]}
          placeholderTextColor={Colors[currentTheme].secondaryText}
          onFocus={(e) => {
            props.onFocus?.(e);
            setIsFocused(true);
          }}
          onBlur={(e) => {
            props.onBlur?.(e);
            setIsFocused(false);
          }}
          ref={inputRef}
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
  inputFocused: {
    color: Colors[currentTheme].text,
    flex: 1,
    fontSize: Styles.textSize,
    borderWidth: 1,
    borderColor: Colors[currentTheme].primary,
    borderStyle: "solid",
  },
});
