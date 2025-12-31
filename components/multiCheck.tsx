import CheckBox from "@react-native-community/checkbox";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function MultiCheck({ options, onValueChange, defaultSelectedList }: { options: string[], onValueChange: (selected: string[]) => void, defaultSelectedList: string[] }) {
    const [selected, setSelected] = useState<string[]>(defaultSelectedList || options);

    const toggleOption = (option: string) => {
        let oldSelectedList = selected;
        if (selected.includes(option)) {
            if (selected.length > 1) {
                setSelected(selected.filter((o) => o !== option));
                oldSelectedList = selected.filter((o) => o !== option);
            }
        } else {
            setSelected([...selected, option]);
            oldSelectedList = [...selected, option];
        }
        onValueChange(oldSelectedList);
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
