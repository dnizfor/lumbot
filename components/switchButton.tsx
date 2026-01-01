import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity } from 'react-native';

type SwitchButtonProps = {
    title: string;
    value: boolean; // dışardan gelen başlangıç değeri
    onToggle: (value: boolean) => void;
};

export default function SwitchButton({ title, value, onToggle }: SwitchButtonProps) {
    const [isEnabled, setIsEnabled] = useState(value);

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
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderRadius: 10
    },
    title: {
        fontSize: 16,
    }
});
