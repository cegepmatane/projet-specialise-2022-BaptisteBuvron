import React from "react";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Home from "./components/Home";
import {store} from "./store";
import {Provider} from 'react-redux'
import {AppRegistry, ScrollView} from 'react-native';

AppRegistry.registerComponent('main',() => App);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                    <SafeAreaProvider>
                        <Home/>
                    </SafeAreaProvider>
            </Provider>

        );
    }
}


