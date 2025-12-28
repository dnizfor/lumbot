import { Colors } from "@/constants/colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView
      style={styles.container}
    >
      <TouchableOpacity style={styles.bot}>
        <Text>Tab indexs</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  }, bot: {
    width: 300,
    height: 300,
    borderRadius: '50%',
    borderWidth: 10,
    borderColor: Colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center'
  }
})