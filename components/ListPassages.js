import React from "react";
import {ActivityIndicator, FlatList, View} from "react-native";
import tw from "twrnc";
import axios from "axios";
import {ListItem} from 'react-native-elements'
import moment from "moment";
import "moment-timezone";

export default class ListPassages extends React.Component {


    constructor(props) {
        super();
        this.state = {
            data: null,
            location: props.location
        };
        this.getDataApi();
    }

    getDataApi() {
        let lat = this.state.location.lat;
        let lng = this.state.location.lng;
        let url = "https://seeiss.com/api/passes?lat=" + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(lng) + "&day=15&lang=fr";
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            this.setState({
                    data: response.data
                }
            );
        });

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location !== this.props.location) {
            await this.setState({location: this.props.location});
            await this.setState({data: null});
            this.getDataApi();
        }
    }


    render() {
        if (!this.state.data) {
            return this.listPassagesLoading();
        } else {
            return this.listPassages();
        }

    }

    listPassagesLoading = () => {
        return (
            <View style={tw`my-4`}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    };

    listPassages = () => {
        return (

                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.data}
                        renderItem={this.renderItem}
                        nestedScrollEnabled={true}
                    />

        )
    }

    keyExtractor = (item, index) => index;

    renderItem = ({item}) => (
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{this.utcToLocal(item.utcStart, item.timeZone)}</ListItem.Title>
                <ListItem.Subtitle>Magnitude : {item.magnitude}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron/>
        </ListItem>
    )

    utcToLocal = (utcDate, timeZone) => {
        //timestamp to date with timezone
        return moment(utcDate*1000).tz(timeZone).format("DD/MM/YYYY HH:mm");

/*
        date.setHours(date.getHours() + 1);
*/

    }

}



