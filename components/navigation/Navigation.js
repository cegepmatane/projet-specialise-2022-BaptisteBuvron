import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import StackNavigation from "./StackNavigation";
import DrawerNavigation from "./DrawerNavigation";



export default class Navigation extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <DrawerNavigation></DrawerNavigation>
            </NavigationContainer>
        );
    }
}