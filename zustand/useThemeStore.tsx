import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ExerciseState = {
    theme: 'light' | 'dark',
    setTheme: (newTheme: 'light' | 'dark') => void,

}

const useThemeStore = create<ExerciseState>()(
    persist(
        (set) => ({
            theme: 'dark',
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'exercise-storage',
            storage: createJSONStorage(() => AsyncStorage),

        },
    ));

export default useThemeStore;