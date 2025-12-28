import ReportAnimation from '@/assets/lotties/reports.json';
import ArrowForwarButton from '@/components/arrowForwarButton';
import HeadMap from "@/components/headMap";
import { useRouter } from "expo-router";
import LottieView from 'lottie-react-native';
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'left']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Text style={styles.monthText}>December</Text>

        <HeadMap />

        <LottieView
          autoPlay
          containerStyle={styles.lottieContainer}
          style={styles.lottie}
          source={ReportAnimation}
        />

        <ArrowForwarButton title={'Focus Goal'} onPress={() => router.push("/focusGoal")} />
        <ArrowForwarButton title={'Exercise Customization'} onPress={() => router.push("/customization")} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 5,
  },
  monthText: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    fontSize: 25,
  },
  lottieContainer: {
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center'
  },
  lottie: {
    width: '150%',
    aspectRatio: 16 / 9,
  }
});
