import { Colors } from '@/constants/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ArrowForwarButton({ title, onPress, theme }: { title: String, onPress: () => void, theme: 'light' | 'dark' }) {
    const styles = useMemo(() => makeStyles(theme), [theme]);
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={24} color={Colors[theme].themeCross} />
        </TouchableOpacity>
    )
}

function makeStyles(theme: 'light' | 'dark') {
    return StyleSheet.create({
        container: {
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 20,
            backgroundColor: Colors[theme].secondary,
            borderRadius: 10
        }, title: {
            color: Colors[theme].themeCross,
        }
    })
}
const styles = StyleSheet.create({

})