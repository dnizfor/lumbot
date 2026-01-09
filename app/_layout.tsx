import { Colors } from '@/constants/colors';
import useThemeStore from '@/zustand/useThemeStore';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from "expo-router";
import * as SQLite from 'expo-sqlite';
import { useEffect } from "react";
import { StatusBar } from 'react-native';

export default function RootLayout() {
  const theme = useThemeStore((state) => state.theme);
  useEffect(() => {
    NavigationBar.setButtonStyleAsync(
      theme === 'dark' ? 'light' : 'dark'
    );
  }, [theme]);
  const initializeDatabase = async (database: SQLite.SQLiteDatabase) => {
    try {
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS exercises (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          day TEXT NOT NULL,
          category_name TEXT NOT NULL,
          exercise_name TEXT NOT NULL,
          passed INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS day_status (
          day TEXT PRIMARY KEY,
          lap_goal INTEGER DEFAULT 0,
          exercise_count INTEGER DEFAULT 0,
          water_count INTEGER DEFAULT 0,
          lap_count INTEGER DEFAULT 0
        );
      `);

      console.debug('Database initialized ');
    } catch (error) {
      console.debug('Database Error', error);
    }
  };
  return (
    <SQLite.SQLiteProvider databaseName="database.db" onInit={initializeDatabase} >
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
    </SQLite.SQLiteProvider>
  )
}
