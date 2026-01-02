import exercisesData from '@/lib/data';
import useExerciseStore from '@/zustand/useExerciseStore';
import { useKeepAwake } from 'expo-keep-awake';
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeButton from "rn-swipe-button";
import { useShallow } from 'zustand/react/shallow';

export default function Index() {
  useKeepAwake();

  const { focusPeriod, waterReminder } = useExerciseStore(
    useShallow((state) => ({
      focusPeriod: state.focusPeriod,
      waterReminder: state.waterReminder,
    }))
  );

  const [categories] = useState(exercisesData.categories);
  const [secondsLeft, setSecondsLeft] = useState(focusPeriod * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [interrupted, setInterrupted] = useState(false);

  const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Ayarlardan süre değişirse ve sayaç boştaysa güncelle
  useEffect(() => {
    if (!isRunning && currentStep === 0 && !interrupted) {
      setSecondsLeft(focusPeriod * 60);
    }
  }, [focusPeriod]);

  // Sayaç Döngüsü
  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  // Süre Tamamen Bitince Otomatik Egzersiz Başlat
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
  else if (currentStep === 3) borderColor = '#00aaff';
  else {
    if (isRunning) borderColor = 'blue';
    else if (secondsLeft <= 0) borderColor = 'yellow';
    else if (interrupted) borderColor = 'red';
  }

  // EGZERSİZLERİ HAZIRLA
  const handleExerciseSelection = () => {
    const shuffledCategories = [...categories].sort(() => 0.5 - Math.random());
    const pickedCategories = shuffledCategories.slice(0, 2);
    const pickedExercises = pickedCategories.map(cat => {
      const randomEx = cat.exercises[Math.floor(Math.random() * cat.exercises.length)];
      return { ...randomEx, categoryName: cat.category_name };
    });

    setSelectedExercises(pickedExercises);
    setCurrentStep(1);
    setIsRunning(false); // Egzersiz sırasında süreyi durdur
  };

  // EGZERSİZ BİTİNCE ÇALIŞACAK MANTIK
  const finishExercises = () => {
    const wasTimerFinished = secondsLeft === 0;

    setCurrentStep(0);
    setSelectedExercises([]);
    setInterrupted(false);

    if (wasTimerFinished) {
      // Eğer 45 dk bittiği için egzersiz yapıldıysa süreyi sıfırla
      setSecondsLeft(focusPeriod * 60);
    }
    // Eğer mola verilip egzersiz yapıldıysa setSecondsLeft yapmıyoruz, 
    // böylece kaldığı saniyeden devam ediyor.

    setIsRunning(true);
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (waterReminder) setCurrentStep(3);
      else finishExercises();
    } else if (currentStep === 3) {
      finishExercises();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Çember Bölümü */}
      <View style={styles.topSection}>
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
            <Image source={require("@/assets/thumbnails/light/water.png")} style={styles.exerciseImage} resizeMode="contain" />
          ) : (
            <Image source={selectedExercises[currentStep - 1]?.lightSource} style={styles.exerciseImage} resizeMode="contain" />
          )}
        </TouchableOpacity>
      </View>

      {/* Alt Bölüm: Yazılar ve Pass Butonu */}
      <View style={styles.bottomSection}>
        {interrupted && currentStep === 0 && (
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.actionButton} onPress={handleExerciseSelection}>
              <Text style={styles.buttonText}>Exercise</Text>
            </TouchableOpacity>
            <SwipeButton
              title="Sonlandir"
              railBackgroundColor="#eee"
              railFillBackgroundColor="#9fc7e8"
              height={60} width={300}
              enableReverseSwipe={true}
              onSwipeSuccess={() => {
                setCurrentStep(0);
                setSelectedExercises([]);
                setSecondsLeft(focusPeriod * 60);
                setIsRunning(false);
                setInterrupted(false);
              }}
              railStyles={{ borderRadius: 30 }}
            />
          </View>
        )}

        {currentStep > 0 && (
          <View style={styles.exerciseTextWrapper}>
            <Text style={styles.exerciseNameText}>
              {currentStep === 3 ? "Drink Water" : selectedExercises[currentStep - 1]?.name}
            </Text>
            <Text style={styles.exerciseDescriptionText}>
              {currentStep === 3 ? "Stay hydrated! It's time to take a sip of water." : selectedExercises[currentStep - 1]?.description}
            </Text>
            <TouchableOpacity style={[styles.actionButton, styles.passButton]} onPress={handleContinue}>
              <Text style={styles.passButtonText}>Pass</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topSection: { flex: 3, justifyContent: 'center', alignItems: 'center' },
  bottomSection: { flex: 2, alignItems: 'center', justifyContent: 'flex-start' },
  bot: { width: 300, height: 300, borderRadius: 150, borderWidth: 10, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  title: { fontSize: 60, fontWeight: "bold" },
  exerciseImage: { width: '75%', height: '75%' },
  buttonGroup: { alignItems: 'center', gap: 12 },
  actionButton: { height: 60, width: 300, backgroundColor: 'blue', borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  passButton: { backgroundColor: '#f0f0f0', marginTop: 20, borderWidth: 1, borderColor: '#ddd' },
  passButtonText: { color: '#666', fontSize: 18, fontWeight: 'bold' },
  exerciseTextWrapper: { alignItems: 'center', paddingHorizontal: 30 },
  exerciseNameText: { fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 8 },
  exerciseDescriptionText: { fontSize: 16, color: '#666', textAlign: 'center' }
});