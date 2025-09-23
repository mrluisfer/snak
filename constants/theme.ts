/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export const tintColorLight = "#0a7ea4";
export const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    backgroundSecondary: "#F6F6F7ff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    secondaryText: "#6C7378",
    background: "#F3E9DC", // Light beige, ideal for backgrounds
    primary: "#D96F32", // Main orange
    primaryDark: "#C75D2C", // Darker orange (for active/hover states)
    accent: "#F8B259", // Accent yellow-orange
  },
  // dark: {
  //   text: "#ECEDEE",
  //   background: "#151718",
  //   backgroundSecondary: "#161718ff",
  //   tint: tintColorDark,
  //   icon: "#9BA1A6",
  //   tabIconDefault: "#9BA1A6",
  //   tabIconSelected: tintColorDark,
  //   secondaryText: "#6C7378",
  // },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Styles = {
  radius: 12,
  separation: 16,
  titleSize: 32,
  textSize: 17,
  secondaryTextSize: 15,
};

export const currentTheme = "light" as keyof typeof Colors;
