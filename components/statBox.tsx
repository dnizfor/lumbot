import { StatBoxProps } from '@/types/types';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function StatBox({ value, total, label, color }: StatBoxProps) {
    return (
        <View style={styles.statBox}>
            <View style={[styles.circle, { borderColor: color }]}>
                {
                    label === 'LAPS' ?
                        <FontAwesome5 name="running" size={24} color="black" /> :
                        label === 'H2O' ? <MaterialIcons name="water-drop" size={24} color="black" /> :
                            <MaterialCommunityIcons name="dumbbell" size={24} color="black" />
                }

            </View>
            <Text style={styles.statValue}>
                {value}
                <Text style={styles.statTotal}>/{total}</Text>
            </Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    statBox: {
        alignItems: "center",
        width: "30%",
    },

    circle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 4,
        justifyContent: "center",
        alignItems: "center",
    },

    statValue: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0F172A",
        marginTop: 8,

    },

    statTotal: {
        fontSize: 12,
        color: "#94A3B8",
    },

    statLabel: {
        fontSize: 12,
        color: "#64748B",
        fontWeight: "600",
    },
})