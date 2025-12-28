import React from 'react'
import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function ExerciseCard({ title, description, source }: {
    title: string
    , description: string,
    source: ImageProps
}) {
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
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
        fontWeight: 'bold'
    },
    description: {
        fontSize: 12,
        marginTop: 4
    }
})
