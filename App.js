import React from "react";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import Home from "./components/Home";
import {store} from "./store";
import {Provider} from 'react-redux'
import {AppRegistry} from 'react-native';

AppRegistry.registerComponent('main',() => App);

export default function App(){
    return (
        <Provider store={store}>
            <TailwindProvider utilities={utilities}>
                <SafeAreaProvider>
                    <Home/>
                </SafeAreaProvider>
            </TailwindProvider>
        </Provider>

    );
}


