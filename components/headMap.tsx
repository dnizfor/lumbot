import Pulse from '@/components/pulse';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default function HeadMap() {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.labelBox}><Text style={styles.label}>S</Text></View>
                <View style={styles.labelBox}><Text style={styles.label}>S</Text></View>
                <View style={styles.labelBox}><Text style={styles.label}>M</Text></View>
                <View style={styles.labelBox}><Text style={styles.label}>T</Text></View>
                <View style={styles.labelBox}><Text style={styles.label}>W</Text></View>
                <View style={styles.labelBox}><Text style={styles.label}>T</Text></View>
                <View style={styles.labelBox}><Text style={styles.label}>F</Text></View>
            </View>
            <View style={styles.row}>
                <View style={styles.ghostBox}></View>
                <View style={styles.box}><Text style={styles.label}>M</Text></View>
                <View style={styles.box}><Text style={styles.label}>T</Text></View>
                <View style={styles.box}><Text style={styles.label}>W</Text></View>
                <View style={styles.box}><Text style={styles.label}>T</Text></View>
                <View style={styles.box}><Text style={styles.label}>F</Text></View>
                <View style={styles.box}><Text style={styles.label}>S</Text></View>
            </View>
            <View style={styles.row}>
                <View style={styles.box}><Text style={styles.label}>S</Text></View>
                <View style={styles.box}><Text style={styles.label}>M</Text></View>
                <View style={styles.box}><Text style={styles.label}>T</Text></View>
                <View style={styles.box}><Text style={styles.label}>W</Text></View>
                <View style={styles.box}><Text style={styles.label}>T</Text></View>
                <View style={styles.box}><Text style={styles.label}>F</Text></View>
                <View style={styles.box}><Text style={styles.label}>S</Text></View>
            </View>
            <View style={styles.row}>
                <View style={styles.box}><Text style={styles.label}>S</Text></View>
                <View style={styles.box}><Text style={styles.label}>M</Text></View>
                <View style={styles.box}><Text style={styles.label}>T</Text></View>
                <View style={styles.box}><Text style={styles.label}>W</Text></View>
                <View style={styles.box}><Text style={styles.label}>T</Text></View>
                <View style={{ ...styles.box, borderWidth: 3, borderColor: 'blue' }}><Text style={styles.label}>F</Text></View>
                <View style={{ ...styles.box, borderWidth: 3, borderColor: 'green' }}><Text style={styles.label}>S</Text>
                    <Pulse color='green' numPulses={3} diameter={70} speed={50} duration={1000} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    labelBox: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: 'grey',
    },

    ghostBox: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'transparent'
    },
    box: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
    },

})
