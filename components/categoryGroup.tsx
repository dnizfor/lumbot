
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
export default function CategoryGroup({ onChange, categoryList }: { onChange: (id: String) => void, categoryList: any[] }) {
    return (
        <ScrollView
            horizontal showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 2 }}
            style={styles.container}>
            {
                categoryList.map(category => (
                    <TouchableOpacity
                        key={category.id}
                        style={styles.card}
                        onPress={() => onChange(category.id)}
                    >
                        {category.category_icon}
                        <Text style={styles.title}>{category.category_name}</Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 0,
        height: 60
    },
    card: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 30,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        gap: 5,
    },
    icon: {
        fontWeight: 'bold',
        fontSize: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'grey'

    }
})