import { Colors } from '@/constants/colors';
import useThemeStore from '@/zustand/useThemeStore';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from 'react-native';

export default function RootLayout() {
  const theme = useThemeStore((state) => state.theme);
  useEffect(() => {
    NavigationBar.setButtonStyleAsync(
      theme === 'dark' ? 'light' : 'dark'
    );
  }, [theme]);
  return (
    <>
      <StatusBar
        backgroundColor={Colors[theme].background}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        animated={true}
      />
      <Stack screenOptions={{
        contentStyle: {
          backgroundColor: Colors[theme].background
        }
      }}  >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}
