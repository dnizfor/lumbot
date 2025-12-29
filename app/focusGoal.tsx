import WheelPicker from '@quidone/react-native-wheel-picker';
import { Stack } from "expo-router";
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FocusGoal() {
    const [value, setValue] = useState(0);

    const data = [...Array(25).keys()].map((index) => ({
        value: index,
        label: index.toString(),
    }))
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "",
                    headerStyle: { backgroundColor: '#F1F5F9' },
                    headerShadowVisible: false,
                }}
            />
            <Text style={styles.title} >Set Your Focus Goal</Text>
            <Text style={styles.subtitle}>
                On the work headmap, the darker the color, the closer you are to reaching it.
            </Text>
            <WheelPicker
                data={data}
                value={value}
                onValueChanged={({ item: { value } }) => setValue(value)}
                enableScrollByTapOnItem={true}
            />


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        rowGap: 16
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