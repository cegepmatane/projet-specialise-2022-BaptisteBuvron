import React from "react";
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTailwind} from "tailwind-rn";
import {useSelector} from "react-redux";

const Home = () => {
  const tw = useTailwind();
  const location = useSelector(state => state.location.location);


  return (
      <SafeAreaView style={tw('h-full')}>
        <View style={tw('pt-12 items-center')}>
          <View style={tw('bg-blue-200 px-3 py-1 rounded-full')}>
            <Text style={tw('text-blue-800 font-semibold')}>
              Hello SeeISS, from {location.city}
            </Text>
          </View>
        </View>
      </SafeAreaView>
  );
};

export default Home;