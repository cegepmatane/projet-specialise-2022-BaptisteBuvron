import React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import Settings from "../Settings";
import StackNavigation from "./StackNavigation";
import Home from "../Home";

const Drawer = createDrawerNavigator();

export default class DrawerNavigation extends React.Component {
    render() {
        return (
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={StackNavigation} options={
                    {
                        headerShown: false
                    }
                } />
                <Drawer.Screen name="Settings" component={Settings} options={
                    {
                        headerShown: false
                    }
                } />
            </Drawer.Navigator>
        );
    }
}