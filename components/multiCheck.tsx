import CheckBox from "@react-native-community/checkbox";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function MultiCheck({ options }: { options: string[] }) {
    const [selected, setSelected] = useState<string[]>([options[0]]);

    const toggleOption = (option: string) => {
        if (selected.includes(option)) {
            if (selected.length > 1) {
                setSelected(selected.filter((o) => o !== option));
            }
        } else {
            setSelected([...selected, option]);
        }
    };

    return (
        <View >
            {options.map((option) => (
                <View key={option} style={{ flexDirection: "row", alignItems: "center" }}>
                    <CheckBox
                        value={selected.includes(option)}
                        onValueChange={() => toggleOption(option)}
                        tintColors={{ true: "blue", false: "gray" }}
                    />
                    <Text style={{ fontSize: 20, }}>{option}</Text>
                </View>
            ))}
        </View>
    );
}
