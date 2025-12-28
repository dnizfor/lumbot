import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function ArrowForwarButton({ title, onPress }: { title: String, onPress: () => void }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={{ flex: 1 }}>
                <Text>
                    {title}
                </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderRadius: 10
    }
})