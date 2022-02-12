import React from "react";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from "./store";
import {Provider} from 'react-redux'
import {AppRegistry} from 'react-native';
import Navigation from "./components/Navigation";

AppRegistry.registerComponent('main',() => App);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                    <SafeAreaProvider>
                        <Navigation />
                    </SafeAreaProvider>
            </Provider>

        );
    }
}


