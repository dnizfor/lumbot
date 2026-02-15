import { Colors } from '@/constants/colors';
import { DayStatus } from '@/types/types';
import useThemeStore from '@/zustand/useThemeStore';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Pulse from './pulse';

type HeadMapProps = {
    currentDate: Date;
    monthlyData: DayStatus[],
    onSelect: (day: string) => void,
    setSelectedDayData: (data: DayStatus | undefined) => void
};

export default function HeadMap({ currentDate, monthlyData, onSelect, setSelectedDayData }: HeadMapProps) {
    const today = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let day = 1;

    const totalCells = firstDay + daysInMonth;
    const totalRows = Math.ceil(totalCells / 7);

    const theme = useThemeStore((state) => state.theme);
    const styles = useMemo(() => makeStyles(theme), [theme]);

    // renderDay artık key parametresi alıyor
    const renderDay = (key: number) => {
        if (day > daysInMonth) return <View key={key} style={styles.ghostBox} />;

        const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        const dayStatus = monthlyData.find(d => new Date(d.day).getDate() === day);

        let opacity = 1;

        if (dayStatus) {
            opacity = dayStatus.exercise_count / (dayStatus.lap_goal * 2);
            if (opacity > 1) {
                opacity = 1
            }
        }


        return (
            <TouchableOpacity onPress={() => dayStatus === undefined ? setSelectedDayData(undefined) : setSelectedDayData(dayStatus)}
                key={key} style={[styles.box, isToday && styles.today,]} >
                {isToday && (
                    <Pulse
                        color="green"
                        numPulses={1}
                        diameter={80}
                        speed={50}
                        duration={1000}
                    />
                )
                }
                <View style={[styles.box, isToday && styles.today, dayStatus && !isToday && {
                    backgroundColor: Colors[theme].successful, opacity: opacity
                }]}>
                    <Text style={[styles.label, dayStatus && !isToday && { color: 'white' }]}>{day++}</Text>

                </View>
            </TouchableOpacity >
        );
    };

    return (
        <View style={styles.container}>

            <View style={styles.row}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <View key={i} style={styles.labelBox}>
                        <Text style={styles.label}>{d}</Text>
                    </View>
                ))}
            </View>

            {Array.from({ length: totalRows }).map((_, rowIndex) => {
                const isLastRow = rowIndex === totalRows - 1;
                const cellsInLastRow = totalCells % 7 || 7;
                if (isLastRow && cellsInLastRow === 0) return null;

                return (
                    <View key={rowIndex} style={styles.row}>
                        {Array.from({ length: 7 }).map((_, colIndex) => {
                            const cellIndex = rowIndex * 7 + colIndex;
                            if (cellIndex < firstDay || day > daysInMonth) {
                                return <View key={colIndex} style={styles.ghostBox} />;
                            }
                            return renderDay(cellIndex);
                        })}
                    </View>
                );
            })}
        </View>
    );
}

function makeStyles(theme: 'light' | 'dark') {
    return StyleSheet.create({
        container: {
            rowGap: 5,
            width: '100%',
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        labelBox: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
        },
        label: {
            color: Colors[theme].textSecondary,
        },
        ghostBox: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: 'transparent'
        },
        box: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors[theme].secondary,
            borderRadius: 5,
        },
        today: {
            borderWidth: 3,
            borderColor: 'green',
        },
    });

}