import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import DetailsPassage from "../DetailsPassage";
import Home from "../Home";


const Stack = createStackNavigator();

export default class StackNavigation extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={
                    {
                        headerShown: false
                    }
                }/>
                <Stack.Screen name="DetailsPassage" component={DetailsPassage}
                />
            </Stack.Navigator>
        );
    }
}