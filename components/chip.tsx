import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Chip({ label, bg, text }: any) {
    return <View style={[styles.chip, { backgroundColor: bg }]}>
        <Text style={[styles.chipText, { color: text }]}>{label}</Text>
    </View>
};

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },

    chipText: {
        fontSize: 12,
        fontWeight: "700",
    },
})