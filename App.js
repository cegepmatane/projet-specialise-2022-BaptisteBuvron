import React from "react";
import Home from "./components/Home";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';


export default function App() {
    return (
        <TailwindProvider utilities={utilities}>
            <SafeAreaProvider>
            <Home/>
            </SafeAreaProvider>

        </TailwindProvider>
    );
}


