import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Pulse from './pulse';

type HeadMapProps = {
    currentDate: Date;
};

export default function HeadMap({ currentDate }: HeadMapProps) {
    const today = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let day = 1;

    const totalCells = firstDay + daysInMonth;
    const totalRows = Math.ceil(totalCells / 7);

    // renderDay artık key parametresi alıyor
    const renderDay = (key: number) => {
        if (day > daysInMonth) return <View key={key} style={styles.ghostBox} />;

        const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        return (
            <View key={key} style={[styles.box, isToday && styles.today]}>
                {isToday && (
                    <Pulse
                        color="green"
                        numPulses={1}
                        diameter={80}
                        speed={50}
                        duration={1000}
                    />
                )}
                <View style={[styles.box, isToday && styles.today]}>
                    <Text style={styles.label}>{day++}</Text>

                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>

            {/* LABEL BOXLAR */}
            <View style={styles.row}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <View key={i} style={styles.labelBox}>
                        <Text style={styles.label}>{d}</Text>
                    </View>
                ))}
            </View>

            {/* TAKVİM */}
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
                            return renderDay(cellIndex); // key parametresi verildi
                        })}
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
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
        color: 'grey',
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
        backgroundColor: 'white',
        borderRadius: 5,
    },
    today: {
        borderWidth: 3,
        borderColor: 'green',
    },
});
