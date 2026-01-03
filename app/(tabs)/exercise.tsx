import RelaxAnimation from '@/assets/lotties/relax.json';
import CategoryGroup from '@/components/categoryGroup';
import ExerciseCard from '@/components/exerciseCard';
import { Colors } from '@/constants/colors';
import Exercises from '@/lib/data';
import useThemeStore from '@/zustand/useThemeStore';
import LottieView from 'lottie-react-native';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {

  const [categoryId, setCategoryId] = useState(Exercises.categories[0].id)
  const theme = useThemeStore(state => state.theme);
  const styles = useMemo(() => {
    return makeStyles(theme);
  }, [theme]);



  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'right', 'left']}
    >
      <LottieView
        autoPlay
        style={styles.animation}
        source={RelaxAnimation}
      />
      <CategoryGroup theme={theme} categoryList={Exercises.categories} value={categoryId} onChange={setCategoryId} />

      <FlatList
        data={Exercises.categories.find(
          item => item.id === categoryId
        )?.exercises ?? []}
        contentContainerStyle={styles.flatListContainer}
        style={{ width: '100%' }}
        renderItem={({ item }) => <ExerciseCard
          title={item.name}
          description={item.description}
          source={theme === 'light' ? item.lightSource : item.darkSource}
          theme={theme}
        />}
        keyExtractor={item => item.id.toString()} />


    </SafeAreaView>
  );
}
function makeStyles(theme: 'light' | 'dark') {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: 5,
      backgroundColor: Colors[theme].background,

    },
    animation: {
      width: '100%',
      aspectRatio: 16 / 9,
    },
    flatListContainer: {
      alignItems: 'center',
      gap: 10,
      paddingBottom: 10,

    }

  })
}