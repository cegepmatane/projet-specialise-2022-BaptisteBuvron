import React, {useState} from "react";
import {View, Text, ImageBackground, ScrollView, Button} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import {GOOGLE_MAPS_APIKEY} from "@env";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import locationReducer, {setLocation} from "../slices/locationSlice";
import {Input} from "react-native-elements";
import axios from "axios";
import Toast from "react-native-simple-toast";
import ListPassages from "./ListPassages";
import tw from "twrnc";




const Home = ({navigation}) => {
    const location = useSelector((state) => state.locationReducer.location);
    const notification = useSelector((state) => state.notificationReducer.notification);
    const dispatch = useDispatch();
    let placeholder = "Choisissez une ville / " + location.city;

    return (
        <ScrollView>
            <SafeAreaView style={tw`h-full bg-gray-100`}>
                <ImageBackground
                    source={require("../assets/images/iss.webp")}
                    resizeMode="cover"
                    style={{
                        flex: 0,
                        justifyContent: "center",
                    }}>
                    <View style={tw`pt-12 items-center mb-4`}>
                        <View style={tw`bg-blue-50 px-3 py-1 rounded-full`}>
                            <Text style={tw`text-blue-900 font-bold text-3xl`}>See ISS</Text>
                        </View>
                    </View>
                </ImageBackground>

                <View style={tw`mx-3 my-4`}>


                    <Input
                        inputContainerStyle={tw`bg-white rounded-md px-4`}
                        inputStyle={tw`text-sm`}
                        placeholder={placeholder}
                        onSubmitEditing={(event) => {
                            let input = event.nativeEvent.text;
                            if (input.length > 0) {
                                //call api
                                let url =
                                    "https://nominatim.openstreetmap.org/search?format=json&q=" +
                                    encodeURIComponent(input);
                                axios.get(url).then((response) => {
                                    let data = response.data;
                                    if (data.length > 0) {
                                        let locationData = data[0];
                                        let array = locationData.display_name.split(",");
                                        let country = array[array.length - 1].trim();
                                        let city = array[0];
                                        dispatch(
                                            setLocation({
                                                lat: parseFloat(locationData.lat),
                                                lng: parseFloat(locationData.lon),
                                                city: city,
                                                country: country,
                                            })
                                        );
                                        Toast.showWithGravity(
                                            "La localisation à bien été enregistrée",
                                            Toast.LONG,
                                            Toast.BOTTOM
                                        );
                                    }
                                });
                            }
                        }}
                    />

                    <Text style={tw`text-center my-3`}>
                        Les passages depuis :
                        <Text style={tw`font-bold`}> {location.city}</Text>
                    </Text>

                    <ListPassages location={location} navigation={navigation} notification={notification} dispatch={dispatch}/>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default Home;
