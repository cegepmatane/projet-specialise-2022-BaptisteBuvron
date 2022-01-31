import React from "react";
import {View, Text, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTailwind} from "tailwind-rn";
import {useDispatch, useSelector} from "react-redux";
import {GOOGLE_MAPS_APIKEY} from "@env";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {setLocation} from "../slices/locationSlice";

const Home = () => {
    const tw = useTailwind();
    const location = useSelector(state => state.location.location);
    const dispatch = useDispatch();

    let placeholder = "Choisissez une ville / " + location.city;

    return (


        <SafeAreaView style={tw('h-full bg-gray-100')}>

            <ImageBackground
                source={require('../assets/images/iss.webp')}
                resizeMode="cover"
                style={{
                    flex: 0,
                    justifyContent: "center"
                }}>
                <View style={tw('pt-12 items-center mb-4')}>
                    <View style={tw('bg-blue-50 px-3 py-1 rounded-full')}>
                        <Text style={tw('text-blue-900 font-bold text-3xl')}>
                            See ISS
                        </Text>

                    </View>
                </View>
            </ImageBackground>


            <View style={tw('h-auto mx-4 my-4')}>
                <GooglePlacesAutocomplete
                    styles={
                        {
                            container: {
                                flex: 0,
                            },
                            textInput: {
                                height: 38,
                                color: '#5d5d5d',
                                fontSize: 16,
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },
                        }
                    }
                    placeholder={placeholder}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "fr",
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    onPress={(data, details = null) => {
                        dispatch(setLocation({
                            lat: details.geometry.location.lat,
                            lng: details.geometry.location.lng,
                            city: details.name,
                            country: details.address_components[details.address_components.length - 1].long_name
                        }))
                    }}
                    fetchDetails={true}
                    debounce={400}
                    minLength={2}
                    enablePoweredByContainer={false}
                />
                <Text style={tw('text-center')}>Les passages depuis :
                <Text style={tw('font-bold')}> {location.city}</Text>
                </Text>


            </View>



        </SafeAreaView>
    );
};

export default Home;