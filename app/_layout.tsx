import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/services/firebaseConfig"; // Adjust the path if needed

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); // Ensure auth state is checked before rendering

  // Listen to Firebase Authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); 
      setAuthChecked(true);
    });

    return unsubscribe; // Cleanup the listener when the component unmounts
  }, []);

  if (!loaded || !authChecked) {
    // Wait for fonts and auth state to load
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {isLoggedIn ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="login" options={{ headerShown: false }} />
        )}
        <Stack.Screen
          name="signup"
          options={{
            headerShown: true,
            headerTitle: "Đăng Ký",
            headerStyle: {
              backgroundColor: "#3b36de",
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerBackTitle: "Quay Lại",
            headerBackTitleStyle: {
              fontSize: 16,
            },
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            headerTitle: "Quên Mật Khẩu",
            headerStyle: {
              backgroundColor: "#3b36de",
            },
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
