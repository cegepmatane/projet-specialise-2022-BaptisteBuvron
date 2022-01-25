import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
      <SafeAreaProvider>
        <View>
          <Text>SeeISS</Text>
        </View>
      </SafeAreaProvider>

  );
}


