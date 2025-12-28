import { Colors } from '@/constants/colors';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}>
            <Tabs.Screen
                name="exercise"
                options={{
                    title: 'Exercise',
                    tabBarIcon: ({ focused }) => <MaterialIcons name="fitness-center" size={24} color={focused ? Colors.light.primary : "black"} />,
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => <Entypo name="circle" size={24} color={focused ? Colors.light.primary : "black"} />,
                }}
            />
            <Tabs.Screen
                name="report"
                options={{
                    title: 'Report',
                    tabBarIcon: ({ focused }) => <MaterialIcons name="leaderboard" size={24} color={focused ? Colors.light.primary : "black"} />,
                }}
            />
        </Tabs>
    );
}
