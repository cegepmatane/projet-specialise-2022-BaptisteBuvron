import React from 'react';
import {Text} from "react-native";

export default class DetailsPassage extends React.Component {

    constructor(props) {
        super();
        this.state = {
            passage: props.route.params.passage,
        };
    }


    render() {
        return (
            <Text>{this.state.passage.utcStart}</Text>
        );
    }

}