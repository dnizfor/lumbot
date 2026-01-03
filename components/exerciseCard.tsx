import { Colors } from '@/constants/colors';
import React, { useMemo } from 'react';
import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ExerciseCard({ title, description, source, theme }: {
    title: string
    , description: string,
    source: ImageProps,
    theme: 'light' | 'dark'
}) {
    const styles = useMemo(() => makeStyle(theme), [theme]);
    return (
        <TouchableOpacity style={styles.container}>
            <Image
                style={styles.image}
                source={source}
            />

            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>
                    {description}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
function makeStyle(theme: 'light' | 'dark') {
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            backgroundColor: Colors[theme].secondary,
            width: '80%',
            padding: 10,
            borderRadius: 10,
            gap: 10
        },
        image: {
            width: 100,
            height: 100,
            borderRadius: 8
        },
        textContainer: {
            flexShrink: 1
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors[theme].themeCross,
        },
        description: {
            fontSize: 12,
            marginTop: 4,
            color: Colors[theme].textSecondary,
        }
    })

}

