import exercisesData from '@/lib/data';
import useExerciseStore from '@/zustand/useExerciseStore'; // Tipi import etmeyi unutma
import { useKeepAwake } from 'expo-keep-awake';
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeButton from "rn-swipe-button";
import { useShallow } from 'zustand/react/shallow';

export default function Index() {
  useKeepAwake();

  const {
    focusPeriod,
    waterReminder,
  } = useExerciseStore(
    useShallow((state) => ({
      focusPeriod: state.focusPeriod,
      waterReminder: state.waterReminder,
    }))
  );

  const TOTAL_SECONDS = (focusPeriod || 30) * 60;

  const [categories] = useState(exercisesData.categories);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [interrupted, setInterrupted] = useState(false);

  const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isRunning && currentStep === 0 && !interrupted) {
      setSecondsLeft(focusPeriod * 60);
    }
  }, [focusPeriod]);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0 && isRunning && currentStep === 0) {
      handleExerciseSelection();
    }
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  let borderColor = 'black';
  if (currentStep === 1) borderColor = 'yellow';
  else if (currentStep === 2) borderColor = 'green';
  else if (currentStep === 3) borderColor = '#00aaff'; // Mavi
  else {
    if (isRunning) borderColor = 'blue';
    else if (secondsLeft <= 0) borderColor = 'yellow';
    else if (interrupted) borderColor = 'red';
  }

  const handleExerciseSelection = () => {
    const shuffledCategories = [...categories].sort(() => 0.5 - Math.random());
    const pickedCategories = shuffledCategories.slice(0, 2);
    const pickedExercises = pickedCategories.map(cat => {
      const randomEx = cat.exercises[Math.floor(Math.random() * cat.exercises.length)];
      return { ...randomEx, categoryName: cat.category_name };
    });

    setSelectedExercises(pickedExercises);
    if (secondsLeft > 0 && interrupted) {
      setSecondsLeft(prev => Math.max(prev - 5 * 60, 0));
    }
    setCurrentStep(1);
    setIsRunning(false);
  };

  const resetToStart = () => {
    setCurrentStep(0);
    setSelectedExercises([]);
    setSecondsLeft(focusPeriod * 60);
    setIsRunning(true);
    setInterrupted(false);
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (waterReminder) {
        setCurrentStep(3); // Water Reminder TRUE ise 3. adıma git
      } else {
        resetToStart();
      }
    } else if (currentStep === 3) {
      resetToStart();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.bot, { borderColor }]}
        onPress={() => {
          if (currentStep === 0) {
            if (isRunning) { setIsRunning(false); setInterrupted(true); }
            else { setIsRunning(true); setInterrupted(false); }
          } else {
            handleContinue();
          }
        }}
      >
        {currentStep === 0 ? (
          <Text style={[styles.title, { color: borderColor }]}>{formattedTime}</Text>
        ) : currentStep === 3 ? (
          <Image
            source={require("@/assets/thumbnails/light/water.png")}
            style={styles.exerciseImage}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={selectedExercises[currentStep - 1]?.lightSource}
            style={styles.exerciseImage}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>

      <View style={styles.actionContainer}>
        {interrupted && currentStep === 0 && (
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.actionButton} onPress={handleExerciseSelection}>
              <Text style={styles.buttonText}>Exercise</Text>
            </TouchableOpacity>
            <SwipeButton
              title="Sonlandir"
              railBackgroundColor="#eee"
              railFillBackgroundColor="#9fc7e8"
              height={60}
              width={300}
              enableReverseSwipe={true}
              onSwipeSuccess={resetToStart}
              railStyles={{ borderRadius: 30 }}
            />
          </View>
        )}

        {currentStep > 0 && currentStep < 3 && (
          <View style={styles.exerciseTextWrapper}>
            <Text style={styles.exerciseNameText}>{selectedExercises[currentStep - 1]?.name}</Text>
            <Text style={styles.exerciseDescriptionText}>{selectedExercises[currentStep - 1]?.description}</Text>
          </View>
        )}

        {currentStep === 3 && (
          <View style={styles.exerciseTextWrapper}>
            <Text style={[styles.exerciseNameText, { color: '#00aaff' }]}>Drink Water</Text>
            <Text style={styles.exerciseDescriptionText}>Take a sip of water to stay focused and healthy!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: "center", justifyContent: "center" },
  bot: {
    width: 300, height: 300, borderRadius: 150, borderWidth: 10,
    justifyContent: 'center', alignItems: 'center', overflow: 'hidden'
  },
  title: { fontSize: 60, fontWeight: "bold" },
  exerciseImage: { width: '75%', height: '75%' },
  actionContainer: { marginTop: 40, width: '100%', alignItems: 'center', minHeight: 140 },
  buttonGroup: { alignItems: 'center', gap: 12 },
  actionButton: {
    height: 60, width: 300, backgroundColor: 'blue', borderRadius: 30,
    justifyContent: 'center', alignItems: 'center'
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  exerciseTextWrapper: { alignItems: 'center', paddingHorizontal: 30 },
  exerciseNameText: { fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 8 },
  exerciseDescriptionText: { fontSize: 16, color: '#666', textAlign: 'center' }
});