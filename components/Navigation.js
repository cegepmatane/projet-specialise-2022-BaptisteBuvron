import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "./Home";
import DetailsPassage from "./DetailsPassage";

const Stack = createStackNavigator();


export default class Navigation extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} options={
                        {
                            headerShown: false
                        }
                    }/>
                    <Stack.Screen name="DetailsPassage" component={DetailsPassage} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}