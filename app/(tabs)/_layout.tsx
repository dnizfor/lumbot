import { Colors } from '@/constants/colors';
import useThemeStore from '@/zustand/useThemeStore';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
    const theme = useThemeStore(state => state.theme);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: Colors[theme].background,
                    borderTopColor: Colors[theme].secondary,
                }
            }}>
            <Tabs.Screen
                name="exercise"
                options={{
                    title: 'Exercise',
                    tabBarIcon: ({ focused }) => <MaterialIcons name="fitness-center" size={24} color={focused ? Colors.light.primary : Colors[theme].textSecondary} />,
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => <Entypo name="circle" size={24} color={focused ? Colors.light.primary : Colors[theme].textSecondary} />,
                }}
            />
            <Tabs.Screen
                name="report"
                options={{
                    title: 'Report',
                    tabBarIcon: ({ focused }) => <MaterialIcons name="leaderboard" size={24} color={focused ? Colors.light.primary : Colors[theme].textSecondary} />,
                }}
            />
        </Tabs>
    );
}
