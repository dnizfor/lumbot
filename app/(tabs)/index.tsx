import { Colors } from '@/constants/colors';
import exercisesData from '@/lib/data';
import useExerciseStore from '@/zustand/useExerciseStore';
import useThemeStore from '@/zustand/useThemeStore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAudioPlayer } from "expo-audio";
import { useKeepAwake } from 'expo-keep-awake';
import { useSQLiteContext, } from 'expo-sqlite';
import { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeButton from "rn-swipe-button";
import { useShallow } from 'zustand/react/shallow';

export default function Index() {
  useKeepAwake();

  const db = useSQLiteContext();

  const theme = useThemeStore(state => state.theme);

  const styles = useMemo(() => makeStyles(theme), [theme]);

  const { focusPeriod, waterReminder, dailyLapGoal } = useExerciseStore(
    useShallow((state) => ({
      focusPeriod: state.focusPeriod,
      waterReminder: state.waterReminder,
      dailyLapGoal: state.dailyLapGoal,
    }))
  );

  const [categories] = useState(exercisesData.categories);
  const [secondsLeft, setSecondsLeft] = useState(focusPeriod * 60);
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
      try {
        notificationPlayer.seekTo(0); // Sesi başa sar
        notificationPlayer.play();    // Sesi çal
      } catch (err) {
        console.log("Notification sound error:", err);
      }
      handleExerciseSelection();
    }
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;


  function getBorderColor() {
    if (currentStep === 1) return Colors[theme].textSecondary;
    if (currentStep === 2) return Colors[theme].successful;
    if (currentStep === 3) return '#00aaff';
    if (isRunning) return Colors[theme].primary;
    if (secondsLeft <= 0) return Colors[theme].textSecondary;
    if (interrupted) return Colors[theme].alert;
    return Colors[theme].themeCross;
  }

  const handleExerciseSelection = () => {
    const shuffledCategories = [...categories].sort(() => 0.5 - Math.random());
    const pickedCategories = shuffledCategories.slice(0, 2);
    const pickedExercises = pickedCategories.map(cat => {
      const randomEx = cat.exercises[Math.floor(Math.random() * cat.exercises.length)];
      return { ...randomEx, categoryName: cat.category_name };
    });

    setSelectedExercises(pickedExercises);
    setCurrentStep(1);
    setIsRunning(false);
  };

  const finishExercises = () => {
    const wasTimerFinished = secondsLeft === 0;
    setCurrentStep(0);
    setSelectedExercises([]);
    setInterrupted(false);

    if (wasTimerFinished) {
      setSecondsLeft(focusPeriod * 60);
    }

    setIsRunning(true);
  };

  const buttonPlayer = useAudioPlayer(require("@/assets/sounds/press.mp3")); // hook ile ses oluştur
  const notificationPlayer = useAudioPlayer(require("@/assets/sounds/notification.mp3")); // hook ile ses oluştur
  const slidePlayer = useAudioPlayer(require("@/assets/sounds/slide.mp3")); // hook ile ses oluştur


  const handleContinue = async (isPassed: boolean) => {

    const now = new Date();

    // Yerel tarih bilgisini alıyoruz
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 0-indexed
    const day = String(now.getDate()).padStart(2, '0');

    const today = `${year}-${month}-${day}`;
    console.log(today);


    if (!interrupted) {
      // Günlük durumu ekle (varsa yok say)
      await db.runAsync(
        `INSERT OR IGNORE INTO day_status (day , lap_goal) VALUES (?, ?)`,
        [today, dailyLapGoal]
      );
    }

    const addExercise = async (passed: number) => {
      // Egzersizi her zaman ekle
      await db.runAsync(
        `INSERT INTO exercises (day, category_name, exercise_name, passed) VALUES (?, ?, ?, ?)`,
        [today, selectedExercises[currentStep - 1]?.categoryName, selectedExercises[currentStep - 1]?.name, passed]
      );

      // Eğer egzersiz geçilmediyse (passed = 0), day_status'taki exercise_count'u güncelle
      if (passed === 0) {
        await db.runAsync(
          `UPDATE day_status SET exercise_count = exercise_count + 1 WHERE day = ?`,
          [today]
        );
      }
    };


    if (currentStep === 1) {
      setCurrentStep(2);
      if (!interrupted && !isPassed) await addExercise(0);
      else if (!interrupted && isPassed) await addExercise(1);
    } else if (currentStep === 2) {
      if (!interrupted) {
        // lap_count artır
        await db.runAsync(
          `UPDATE day_status SET lap_count = lap_count + 1 WHERE day = ?`,
          [today]
        );
      }
      if (!interrupted && !isPassed) await addExercise(0);
      else if (!interrupted && isPassed) await addExercise(1);


      if (waterReminder) setCurrentStep(3);
      else finishExercises();
    } else if (currentStep === 3) {
      if (!interrupted && !isPassed) {
        // water_count artır
        await db.runAsync(
          `UPDATE day_status SET water_count = water_count + 1 WHERE day = ?`,
          [today]
        );
      }

      finishExercises();
    }

  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.topSection, currentStep == 0 && !interrupted && { flex: 1, }]}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.bot,
            {
              borderColor: getBorderColor(),
              backgroundColor: currentStep > 0 ? (theme === 'light' ? '#ffffff' : '#000000') : Colors[theme].background,
            },
          ]}
          onPress={() => {
            try {
              buttonPlayer.play();
              buttonPlayer.seekTo(0);
            } catch {
              console.log('err')
            }
            if (currentStep === 0) {
              if (isRunning) { setIsRunning(false); setInterrupted(true); }
              else { setIsRunning(true); setInterrupted(false); }
            } else {
              handleContinue(false);
            }
          }}
        >
          {currentStep === 0 ? (
            <Text style={[styles.title, { color: getBorderColor() }]}>{formattedTime}</Text>
          ) : currentStep === 3 ? (
            <Image
              source={theme == 'light' ? require("@/assets/thumbnails/light/water.png") : require("@/assets/thumbnails/dark/water.png")}
              style={styles.exerciseImage}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={theme == 'light' ? selectedExercises[currentStep - 1]?.lightSource : selectedExercises[currentStep - 1]?.darkSource}
              style={styles.exerciseImage}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>

      </View>

      <View style={[styles.bottomSection, currentStep == 0 && !interrupted && { display: 'none' }]}>
        {interrupted && currentStep === 0 && (
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.actionButton} onPress={() => {
              buttonPlayer.play();
              buttonPlayer.seekTo(0);
              handleExerciseSelection()
            }}>
              <Text style={styles.buttonText}>Exercise</Text>
            </TouchableOpacity>
            <SwipeButton
              title="Finish"
              titleStyles={{ color: Colors[theme].themeCross, fontWeight: 'bold', fontSize: styles.buttonText.fontSize }}
              railBackgroundColor={Colors[theme].secondary}
              railFillBackgroundColor={Colors[theme].alert}
              titleColor={Colors[theme].themeCross}
              thumbIconBorderColor={Colors[theme].themeCross}
              thumbIconBackgroundColor={Colors[theme].themeCross}
              railBorderColor={Colors[theme].secondary}
              railFillBorderColor={Colors[theme].alert}
              thumbIconComponent={() => <MaterialIcons
                name="arrow-back-ios"
                size={30}
                color={Colors[theme].theme}
                style={{ marginLeft: 10 }}
              />}
              height={60}
              width={300}
              enableReverseSwipe={true}
              onSwipeSuccess={() => {
                setCurrentStep(0);
                setSelectedExercises([]);
                setSecondsLeft(focusPeriod * 60);
                setIsRunning(false);
                setInterrupted(false);
                try {
                  slidePlayer.seekTo(0);
                  slidePlayer.play();
                } catch (err) {
                  console.log("Notification sound error:", err);
                }

              }}
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
            <TouchableOpacity style={[styles.actionButton, styles.passButton]} onPress={() => {
              buttonPlayer.play();
              buttonPlayer.seekTo(0);
              handleContinue(true)
            }}>
              <Text style={styles.passButtonText}>Pass</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView >
  );
}
function makeStyles(theme: 'light' | 'dark') {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
    },

    topSection: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomSection: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },

    bot: {
      width: 300,
      height: 300,
      borderRadius: 150,
      borderWidth: 10,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    exerciseImage: {
      width: '75%',
      height: '75%',
      resizeMode: 'contain',
    },

    title: {
      fontSize: 60,
      fontWeight: 'bold',
    },
    exerciseTextWrapper: {
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    exerciseNameText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors[theme].themeCross,
      textAlign: 'center',
      marginBottom: 8,
    },
    exerciseDescriptionText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      lineHeight: 22,
    },

    buttonGroup: {
      alignItems: 'center',
      gap: 12,
    },
    actionButton: {
      width: 300,
      height: 60,
      borderRadius: 30,
      backgroundColor: Colors[theme].primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    passButton: {
      marginTop: 20,
      backgroundColor: Colors[theme].secondary,
    },
    passButtonText: {
      color: Colors[theme].themeCross,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
}