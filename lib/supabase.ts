import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xyecfhwcioqjnbjksqpj.supabase.co";
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

//export const supabase = createClient(supabaseUrl, supabaseKey, {
//  auth: {
//    storage: AsyncStorage,
//    autoRefreshToken: true,
//    persistSession: true,
//    detectSessionInUrl: false,
//  },
// });

import "react-native-url-polyfill/auto";

const ExpoWebSecureStoreAdapter = {
  getItem: (key: string) => {
    console.debug("getItem", { key });
    return AsyncStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    return AsyncStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    return AsyncStorage.removeItem(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: ExpoWebSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
