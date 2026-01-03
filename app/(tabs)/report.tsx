import ReportAnimation from '@/assets/lotties/reports.json';
import ArrowForwarButton from '@/components/arrowForwarButton';
import HeadMap from "@/components/headMap";
import { Colors } from '@/constants/colors';
import useThemeStore from '@/zustand/useThemeStore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import LottieView from 'lottie-react-native';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const theme = useThemeStore((state) => state.theme);

  const styles = useMemo(() => getStyles(theme), [theme]);

  const changeMonth = (direction: -1 | 1) => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + direction,
        1
      )
    )
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.monthText}>
            {currentDate.toLocaleString('en-US', { month: 'long' })}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => changeMonth(-1)}
            >
              <MaterialIcons name="arrow-back-ios" size={24} color={
                Colors[theme].themeCross
              } />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => changeMonth(1)}
            >
              <MaterialIcons name="arrow-forward-ios" size={24} color={
                Colors[theme].themeCross

              } />
            </TouchableOpacity>
          </View>
        </View>

        <HeadMap currentDate={currentDate} />

        <LottieView
          autoPlay
          containerStyle={styles.lottieContainer}
          style={styles.lottie}
          source={ReportAnimation}
        />

        <ArrowForwarButton theme={theme} title={'Customization'} onPress={() => router.push("/customization")} />

      </ScrollView>
    </SafeAreaView>
  );
};

function getStyles(theme: 'light' | 'dark') {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
      paddingTop: 10,
    },
    scrollContent: {
      alignItems: "center",
      paddingHorizontal: 20,
      gap: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 10,
      height: 40,
    },
    monthText: {
      fontWeight: 'bold',
      fontSize: 25,
      color: Colors[theme].themeCross,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    arrowButton: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'flex-end',
      borderRadius: 8,

    },
    lottieContainer: {
      borderWidth: 2,
      borderColor: Colors[theme].secondary,
      backgroundColor: Colors[theme].secondary,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center'
    },
    lottie: {
      width: '150%',
      aspectRatio: 16 / 9,
    }
  })
};
