import { Colors } from '@/constants/colors';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity } from 'react-native';

type SwitchButtonProps = {
    title: string;
    value: boolean; // dışardan gelen başlangıç değeri
    onToggle: (value: boolean) => void;
    theme: 'light' | 'dark';
};

export default function SwitchButton({ title, value, onToggle, theme }: SwitchButtonProps) {
    const [isEnabled, setIsEnabled] = useState(value);

    const styles = useMemo(() => {
        return makeStyles(theme);
    }, [theme]);

    useEffect(() => {
        setIsEnabled(value);
    }, [value]);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        onToggle(!isEnabled);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={toggleSwitch} activeOpacity={0.8}>
            <Text style={styles.title}>{title}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={Colors[theme].themeCross}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </TouchableOpacity>
    )
}
function makeStyles(theme: 'light' | 'dark') {
    return StyleSheet.create({
        container: {
            height: 50,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: Colors[theme].secondary,
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 20,
            borderRadius: 10
        },
        title: {
            fontSize: 16,
            color: Colors[theme].textSecondary,

        }
    })
}


