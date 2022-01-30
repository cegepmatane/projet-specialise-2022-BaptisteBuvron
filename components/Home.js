import React from "react";
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTailwind} from "tailwind-rn";



const Home = () => {
  const tailwind = useTailwind();

  return (
      <SafeAreaView style={tailwind('h-full')}>
        <View style={tailwind('pt-12 items-center')}>
          <View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>
            <Text style={tailwind('text-blue-800 font-semibold')}>
              Hello Tailwind
            </Text>
          </View>
        </View>
      </SafeAreaView>
  );
};

export default Home;