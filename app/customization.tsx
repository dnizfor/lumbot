import MultiCheck from '@/components/multiCheck';
import Exercises from '@/lib/data';
import WheelPicker from '@quidone/react-native-wheel-picker';
import { Stack } from "expo-router";
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function Customization() {
    const [value, setValue] = useState(0);
    const focusTimes = [{
        value: 15,
        label: '15',

    },
    {
        value: 30,
        label: '30',
    }]
    const breakTimes = [{
        value: 0,
        label: 'auto',

    },
    {
        value: 1,
        label: '1',
    },
    {
        value: 5,
        label: '5',
    },
    {
        value: 15,
        label: '15',
    },

    {
        value: 20,
        label: '20',
    },
    {
        value: 30,
        label: '30',
    }]
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen
                options={{
                    title: "",
                    headerStyle: { backgroundColor: '#F1F5F9' },
                    headerShadowVisible: false,
                }}
            />
            <Text style={styles.title} >Set Your Study Time</Text>
            <Text style={styles.subtitle}>
                On the work headmap, the darker the color, the closer you are to reaching it.
            </Text>
            <WheelPicker
                data={focusTimes}
                value={value}
                onValueChanged={({ item: { value } }) => setValue(value)}
                enableScrollByTapOnItem={true}
            />

            <Text style={styles.title} >Set Your Break Time</Text>
            <Text style={styles.subtitle}>
                On the work headmap, the darker the color, the closer you are to reaching it.
            </Text>
            <WheelPicker
                data={breakTimes}
                value={value}
                onValueChanged={({ item: { value } }) => setValue(value)}
                enableScrollByTapOnItem={true}
            />

            <Text style={styles.title} >Customization </Text>
            <Text style={styles.subtitle}>
                On the work headmap, the darker the color, the closer you are to reaching it.
            </Text>
            <MultiCheck options={Exercises.categories.map(category => category.category_name)} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        rowGap: 16,
        paddingBottom: 30
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
})   