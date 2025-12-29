import RelaxAnimation from '@/assets/lotties/relax.json';
import CategoryGroup from '@/components/categoryGroup';
import ExerciseCard from '@/components/exerciseCard';
import Exercises from '@/lib/data';
import LottieView from 'lottie-react-native';
import { useState } from 'react';
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {

  const [categoryId, setCategoryId] = useState(Exercises.categories[2].id)

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
      <CategoryGroup categoryList={Exercises.categories} onChange={setCategoryId} />

      <FlatList
        data={Exercises.categories.find(item => item.id === categoryId)!.exercises}
        contentContainerStyle={styles.flatListContainer}
        style={{ width: '100%' }}
        renderItem={({ item }) => <ExerciseCard
          title={item.name}
          description={item.description}
          source={item.lightSource}
        />}
        keyExtractor={item => item.id.toString()} />


    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 5
  },
  animation: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  flatListContainer: {
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,

  }

})