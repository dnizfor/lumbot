import ReportAnimation from '@/assets/lotties/reports.json';
import ArrowForwarButton from '@/components/arrowForwarButton';
import DailyReportCard from '@/components/dailyReportCard';
import HeadMap from "@/components/headMap";
import { Colors } from '@/constants/colors';
import { DayStatus } from '@/types/types';
import useThemeStore from '@/zustand/useThemeStore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { useSQLiteContext } from 'expo-sqlite';
import LottieView from 'lottie-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Report() {
  const router = useRouter();
  const db = useSQLiteContext();
  const theme = useThemeStore((state) => state.theme);

  const [currentDate, setCurrentDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const [monthlyData, setMonthlyData] = useState<DayStatus[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDayData, setSelectedDayData] = useState<DayStatus | undefined>();

  const styles = useMemo(() => getStyles(theme), [theme]);

  const today = new Date().toISOString().split('T')[0];

  const changeMonth = (direction: -1 | 1) => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + direction,
        1
      )
    );
  };

  useEffect(() => {
    const year = currentDate.getFullYear().toString();
    const month = currentDate.getMonth() + 1;

    getMonthDayStatus(year, month).then((data) => {
      setMonthlyData(data);
    });
  }, [currentDate]);

  const onDaySelect = (day: string) => {
    setSelectedDate(day);
  };

  const getMonthDayStatus = async (year: string, month: number): Promise<DayStatus[]> => {
    try {
      const startDate = new Date(parseInt(year), month - 1, 1);
      const endDate = new Date(parseInt(year), month, 0);

      const startStr = startDate.toISOString().split('T')[0];
      const endStr = endDate.toISOString().split('T')[0];

      const dayStatusList = await db.getAllAsync<DayStatus>(
        `SELECT * FROM day_status WHERE day BETWEEN ? AND ? ORDER BY day ASC`,
        [startStr, endStr]
      );

      return dayStatusList;
    } catch (error) {
      console.error('Failed to fetch month day_status:', error);
      return [];
    }
  };

  const shouldShowLottie =
    !selectedDate ||
    selectedDate === today ||
    !selectedDayData;

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
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color={Colors[theme].themeCross}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => changeMonth(1)}
            >
              <MaterialIcons
                name="arrow-forward-ios"
                size={24}
                color={Colors[theme].themeCross}
              />
            </TouchableOpacity>
          </View>
        </View>

        <HeadMap
          currentDate={currentDate}
          setSelectedDayData={setSelectedDayData}
          monthlyData={monthlyData}
          onSelect={onDaySelect}
        />

        {shouldShowLottie ? (
          <LottieView
            autoPlay
            containerStyle={styles.lottieContainer}
            style={styles.lottie}
            source={ReportAnimation}
          />
        ) : (
          <DailyReportCard dayStatus={selectedDayData}
            selectedDate={selectedDate} />
        )}

        <ArrowForwarButton
          theme={theme}
          title={'Customization'}
          onPress={() => router.push("/customization")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

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
  });
}
