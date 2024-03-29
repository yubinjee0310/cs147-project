import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function SettingsScreen({ route, navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Text> [CURRENTLY UNIMPLEMENTED] </Text>
      <Text> You'll be able to change specific preferences on this page! </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  }
});
