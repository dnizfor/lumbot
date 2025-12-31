import useExerciseStore from '@/zustand/exerciseStore';
import WheelPicker from '@quidone/react-native-wheel-picker';
import { Stack } from "expo-router";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

export default function FocusGoal() {

    const data = [...Array(24).keys()].map((index) => ({
        value: index + 1,
        label: (index + 1).toString(),
    }))

    const {
        focusGoal,
        setFocusGoal,
    } = useExerciseStore(
        useShallow((state) => ({
            focusGoal: state.focusGoal,
            setFocusGoal: state.setFocusGoal,
        }))
    )

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
                value={focusGoal}
                onValueChanged={({ item: { value } }) => setFocusGoal(value)}
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