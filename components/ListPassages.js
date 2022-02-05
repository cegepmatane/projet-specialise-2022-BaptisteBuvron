import React, {useEffect} from "react";
import {ActivityIndicator, Text, View} from "react-native";
import tw from "twrnc";


export default class ListPassages extends React.Component {


    constructor(props) {
        super();
        this.state = {
            data: null,
            city: props.city
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.city !== this.props.city) {
            this.setState({city: this.props.city});
        }
    }


    render() {
        if (!this.state.data){
            return this.listPassagesLoading();
        }
        else {
            return (
                <Text>Passages au dessus de {this.state.city} : </Text>
            );
        }

    }

    listPassagesLoading = () => {
        this.setState({
                data: "Bonjour"
            }
        );
        return (
            <View style={tw`my-4`}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    };

}



