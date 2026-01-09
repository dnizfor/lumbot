import Exercises from '@/lib/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ExerciseState = {
    exerciseList: string[],
    setExerciseList: (newExerciseList: string[]) => void,
    focusPeriod: number,
    setFocusPeriod: (newFocusPeriod: number) => void,
    dailyLapGoal: number,
    setDailyLapGoal: (newDailyLapGoal: number) => void,
    waterReminder: boolean,
    setWaterReminder: (enabled: boolean) => void,

}

const useExerciseStore = create<ExerciseState>()(
    persist(
        (set) => ({
            exerciseList: Exercises.categories.map(category => category.category_name),
            setExerciseList: (exerciseList) => set({ exerciseList }),
            focusPeriod: 30,
            setFocusPeriod: (focusPeriod) => set({ focusPeriod }),
            dailyLapGoal: 4,
            setDailyLapGoal: (dailyLapGoal) => set({ dailyLapGoal }),
            waterReminder: false,
            setWaterReminder: (waterReminder) => set({ waterReminder }),
        }),
        {
            name: 'exercise-storage',
            storage: createJSONStorage(() => AsyncStorage),

        },
    ),
)

export default useExerciseStore;