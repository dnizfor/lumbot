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
        breakPeriod,
        setExerciseList,
        setFocusPeriod,
        setBreakPeriod,
        waterReminder,
        setWaterReminder,
        focusGoal,
        setFocusGoal,
    } = useExerciseStore(
        useShallow((state) => ({
            exerciseList: state.exerciseList,
            focusPeriod: state.focusPeriod,
            breakPeriod: state.breakPeriod,
            setExerciseList: state.setExerciseList,
            setFocusPeriod: state.setFocusPeriod,
            setBreakPeriod: state.setBreakPeriod,
            waterReminder: state.waterReminder,
            setWaterReminder: state.setWaterReminder,
            focusGoal: state.focusGoal,
            setFocusGoal: state.setFocusGoal,
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

    const focusTimes = [{
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
    const breakTimes = [
        {
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

    const focusGoals = [...Array(24).keys()].map((index) => ({
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
                <Text style={styles.title} >Set Your Study Time</Text>
                <Text style={styles.subtitle}>
                    On the work headmap, the darker the color, the closer you are to reaching it.
                </Text>
                <WheelPicker
                    visibleItemCount={3}
                    style={{ backgroundColor: Colors[theme].background, borderRadius: 10 }}
                    data={focusTimes}
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
                <Text style={styles.title} >Set Your Break Time</Text>
                <Text style={styles.subtitle}>
                    On the work headmap, the darker the color, the closer you are to reaching it.
                </Text>
                <WheelPicker
                    visibleItemCount={3}
                    style={{ backgroundColor: Colors[theme].background, borderRadius: 10 }}
                    data={breakTimes}
                    value={breakPeriod}
                    onValueChanged={({ item: { value } }) => setBreakPeriod(value)}
                    itemTextStyle={{
                        color: Colors[theme].themeCross,
                    }}
                    enableScrollByTapOnItem={true}
                    overlayItemStyle={{
                        backgroundColor: Colors[theme].themeCross,
                    }}

                />
                <Text style={styles.title} >Set Your Focus Goal</Text>
                <Text style={styles.subtitle}>
                    On the work headmap, the darker the color, the closer you are to reaching it.
                </Text>
                <WheelPicker
                    visibleItemCount={3}
                    style={{ backgroundColor: Colors[theme].background, borderRadius: 10 }}
                    data={focusGoals}
                    value={focusGoal}
                    onValueChanged={({ item: { value } }) => setFocusGoal(value)}
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
                    On the work headmap, the darker the color, the closer you are to reaching it.
                </Text>
                <MultiCheck defaultSelectedList={exerciseList} theme={theme} onValueChange={setExerciseList} options={Exercises.categories.map(category => category.category_name)} />
                <Text style={styles.title} >Water Reminder </Text>
                <Text style={styles.subtitle}>
                    Reminds you to drink water while working.
                </Text>
                <SwitchButton theme={theme} title="Reminder" value={waterReminder} onToggle={setWaterReminder} />
                <Text style={styles.title}>Theme Mode</Text>

                <Text style={styles.subtitle}>
                    Change the app appearance to your preference.
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