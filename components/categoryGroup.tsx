
import { Colors } from '@/constants/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
export default function CategoryGroup({ onChange, categoryList, theme, value }: { onChange: (id: string) => void, categoryList: any[], theme: 'light' | 'dark', value: string }) {
    const styles = useMemo(() => makeStyles(theme), [theme]);
    return (
        <ScrollView
            horizontal showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 5, paddingVertical: 30, paddingHorizontal: 5, alignItems: 'center' }}
            style={styles.container}>
            {
                categoryList.map(category => (
                    <TouchableOpacity
                        key={category.id}
                        style={[styles.card, category.id === value && { borderColor: Colors[theme].themeCross, backgroundColor: Colors[theme].themeCross }]}
                        onPress={() => onChange(category.id)}
                    >
                        <MaterialCommunityIcons name={category.category_icon_name} size={24} color={category.id === value ? Colors[theme].theme : Colors[theme].themeCross} />
                        <Text style={[styles.title, { color: category.id === value ? Colors[theme].theme : Colors[theme].themeCross }]}>{category.category_name}</Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    )
}
function makeStyles(theme: 'light' | 'dark') {
    return StyleSheet.create({
        container: {
            flexGrow: 0,
        },
        card: {
            borderWidth: 1,
            borderRadius: 30,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors[theme].secondary,
            borderColor: Colors[theme].textSecondary,
            gap: 5,
            height: 40,
        },
        icon: {
            fontWeight: 'bold',
            fontSize: 20
        },
        title: {
            fontWeight: 'bold',
            fontSize: 15,
        }
    })
}