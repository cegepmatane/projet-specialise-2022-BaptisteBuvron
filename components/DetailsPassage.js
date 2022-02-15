import React from 'react';
import {Text, View} from "react-native";
import tw from "twrnc";
import MapView, {Marker, Polyline} from "react-native-maps";
import moment from "moment";


export default class DetailsPassage extends React.Component {

    constructor(props) {
        super();
        this.state = {
            passage: props.route.params.passage,
            location: props.route.params.location,
        };
    }


    render() {

        let coordinates = [];
        let passage = this.state.passage;
        for (let i = 0; i < passage.passeDetails.length; i++) {
            coordinates.push({
                latitude: passage.passeDetails[i].lat,
                longitude: passage.passeDetails[i].lon,
            });

        }


        return (
               <View>
                   <MapView
                       style={tw`h-2/3`}
                       initialRegion={{
                           latitude: this.state.location.lat,
                           longitude: this.state.location.lng,
                           latitudeDelta: 30,
                           longitudeDelta: 30,
                       }}
                   >
                       <Polyline coordinates={coordinates} strokeColor="#0000ff" strokeWidth={3}/>
                       <Marker coordinate={{
                           latitude: this.state.location.lat,
                           longitude: this.state.location.lng,
                       }}
                               title={this.state.location.city}

                       />
                   </MapView>
                   <View style={tw`mx-2`}>
                       <Text>Date : {this.utcToLocal(this.state.passage.utcStart,this.state.passage.timeZone)}</Text>
                       <Text>Magnitude : {this.state.passage.magnitude}</Text>
                   </View>
               </View>
        );
    }

    utcToLocal = (utcDate, timeZone) => {
        //timestamp to date with timezone
        return moment(utcDate*1000).tz(timeZone).format("DD/MM/YYYY HH:mm");

        /*
                date.setHours(date.getHours() + 1);
        */

    }

}