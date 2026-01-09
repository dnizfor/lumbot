import MultiCheck from '@/components/multiCheck';
import SwitchButton from '@/components/switchButton';
import { Colors } from '@/constants/colors';
import Exercises from '@/lib/data';
import useExerciseStore from '@/zustand/useExerciseStore';
import useThemeStore from '@/zustand/useThemeStore';
import WheelPicker from '@quidone/react-native-wheel-picker';
import { Stack } from "expo-router";
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useShallow } from 'zustand/react/shallow';
export default function Customization() {


    const {
        exerciseList,
        focusPeriod,
        setExerciseList,
        setFocusPeriod,
        waterReminder,
        setWaterReminder,
        dailyLapGoal,
        setDailyLapGoal,
    } = useExerciseStore(
        useShallow((state) => ({
            exerciseList: state.exerciseList,
            focusPeriod: state.focusPeriod,
            setExerciseList: state.setExerciseList,
            setFocusPeriod: state.setFocusPeriod,
            waterReminder: state.waterReminder,
            setWaterReminder: state.setWaterReminder,
            dailyLapGoal: state.dailyLapGoal,
            setDailyLapGoal: state.setDailyLapGoal,
        }))
    )


    const {
        theme,
        setTheme,
    } = useThemeStore(
        useShallow((state) => ({
            theme: state.theme,
            setTheme: state.setTheme,
        }))
    )
    const styles = useMemo(() => {
        return makeStyles(theme);
    }, [theme]);

    const focusDurationData = [{
        value: 1, // use for test
        label: '1',
    }, {
        value: 15,
        label: '15',

    },
    {
        value: 30,
        label: '30',
    },
    {
        value: 45,
        label: '45',
    },
    {
        value: 60,
        label: '60',
    },
    {
        value: 90,
        label: '90',
    },
    {
        value: 120,
        label: '120',
    },]


    const lapGoalsData = [...Array(12).keys()].map((index) => ({
        value: index + 1,
        label: (index + 1).toString(),
    }))

    return (
        <SafeAreaView style={{ flex: 1 }}
            edges={['right', 'left', 'bottom']}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Stack.Screen
                    options={{
                        title: "",
                        headerStyle: { backgroundColor: Colors[theme].background },
                        headerTintColor: Colors[theme].themeCross,
                        headerShadowVisible: false,
                    }}
                />
                <Text style={styles.title} >Focus Duration</Text>
                <Text style={styles.subtitle}>
                    Choose how long you want to focus on each focus session.
                </Text>
                <WheelPicker
                    visibleItemCount={3}
                    style={{ backgroundColor: Colors[theme].background, borderRadius: 10 }}
                    data={focusDurationData}
                    value={focusPeriod}
                    onValueChanged={({ item: { value } }) => setFocusPeriod(value)}
                    itemTextStyle={{
                        color: Colors[theme].themeCross,
                    }}
                    enableScrollByTapOnItem={true}
                    overlayItemStyle={{
                        backgroundColor: Colors[theme].themeCross,
                    }}
                />

                <Text style={styles.title} >Daily Lap Goal</Text>
                <Text style={styles.subtitle}>
                    Set how many laps you aim to complete today.
                </Text>
                <WheelPicker
                    visibleItemCount={3}
                    style={{ backgroundColor: Colors[theme].background, borderRadius: 10 }}
                    data={lapGoalsData}
                    value={dailyLapGoal}
                    onValueChanged={({ item: { value } }) => setDailyLapGoal(value)}
                    itemTextStyle={{
                        color: Colors[theme].themeCross,
                    }}
                    enableScrollByTapOnItem={true}
                    overlayItemStyle={{
                        backgroundColor: Colors[theme].themeCross,
                    }}
                />
                <Text style={styles.title} >Customization </Text>
                <Text style={styles.subtitle}>
                    Pick the exercises you want to include in your routine.
                </Text>
                <MultiCheck defaultSelectedList={exerciseList} theme={theme} onValueChange={setExerciseList} options={Exercises.categories.map(category => category.category_name)} />
                <Text style={styles.title} >Water Reminder </Text>
                <Text style={styles.subtitle}>
                    Reminds you to drink water while working.
                </Text>
                <SwitchButton theme={theme} title="Reminder" value={waterReminder} onToggle={setWaterReminder} />
                <Text style={styles.title}>App Theme</Text>

                <Text style={styles.subtitle}>
                    Switch between Light and Dark mode according to your preference.
                </Text>

                <SwitchButton theme={theme}
                    title="Theme"
                    value={theme === 'light'}
                    onToggle={(value) => setTheme(!value ? 'dark' : 'light')}
                />


            </ScrollView>
        </SafeAreaView>
    )
}


function makeStyles(theme: 'light' | 'dark') {
    return StyleSheet.create({
        container: {
            paddingHorizontal: 20,
            rowGap: 16,
            paddingBottom: 30,
            backgroundColor: Colors[theme].background,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: Colors[theme].themeCross,
        },
        subtitle: {
            fontSize: 16,
            color: Colors[theme].textSecondary,
        },
    })
}