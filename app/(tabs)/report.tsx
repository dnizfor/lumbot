import ReportAnimation from '@/assets/lotties/reports.json';
import ArrowForwarButton from '@/components/arrowForwarButton';
import HeadMap from "@/components/headMap";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

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
          {/* Ay ismi, dikeyde ortalı */}
          <Text style={styles.monthText}>
            {currentDate.toLocaleString('tr-TR', { month: 'long' })}
          </Text>

          {/* Butonlar sağda, yan yana */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => changeMonth(-1)}
            >
              <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => changeMonth(1)}
            >
              <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
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

        <ArrowForwarButton title={'Focus Goal'} onPress={() => router.push("/focusGoal")} />
        <ArrowForwarButton title={'Customization'} onPress={() => router.push("/customization")} />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 7,
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
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center'
  },
  lottie: {
    width: '150%',
    aspectRatio: 16 / 9,
  }
});
