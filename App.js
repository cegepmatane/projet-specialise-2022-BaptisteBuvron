import React from "react";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {persistor, store} from "./store";
import {Provider} from 'react-redux'
import {AppRegistry} from 'react-native';
import Navigation from "./components/Navigation";
import {PersistGate} from "redux-persist/integration/react";

AppRegistry.registerComponent('main',() => App);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <SafeAreaProvider>
                        <Navigation />
                    </SafeAreaProvider>
                </PersistGate>
            </Provider>

        );
    }
}


