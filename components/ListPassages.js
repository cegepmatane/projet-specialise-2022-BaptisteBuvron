import React from "react";
import {ActivityIndicator, FlatList, Text, View} from "react-native";
import tw from "twrnc";
import axios from "axios";
import {ListItem} from 'react-native-elements'
import "moment-timezone";
import Passage from "../Model/Passage";
import countdown from "countdown";
import moment from "moment";


export default class ListPassages extends React.Component {


    constructor(props) {
        super();
        this.state = {
            data: null,
            location: props.location
        };
        /*this.getDataJson();*/
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
        }).then(async response => {
            let data = response.data;
            let passages = [];
            for (let i = 0; i < data.length; i++) {
                passages.push(new Passage(data[i].utcStart, data[i].utcMax, data[i].utcEnd, data[i].azStartDegres, data[i].azMaxDegres, data[i].azEndDegres, data[i].azStartDirection, data[i].azMaxDirection, data[i].azEndDirection, data[i].startEl, data[i].maxEl, data[i].endEl, data[i].magnitude, data[i].duration, data[i].timeZone, data[i].passeDetails));
            }
            let timer = null;
            await this.setState({
                data: passages

            });
            if (passages.length > 0 && this.state.data != null) {
                this.interval = setInterval(() => this.setState({
                    timer: countdown(new Date(moment().tz(this.state.data[0].timeZone)), new Date(this.state.data[0].exactStart.toString()), countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS).toLocaleString()
                }), 1000);
            }
            else {
                this.setState({
                    timer: "Pas de passages dans les 15 prochains jours"
                });
            }

        });

    }

    getDataJson(){
        let data = require('../passes.json');
        let passages = [];
        for (let i = 0; i < data.length; i++) {
            passages.push(new Passage(data[i].utcStart, data[i].utcMax, data[i].utcEnd, data[i].azStartDegres, data[i].azMaxDegres, data[i].azEndDegres, data[i].azStartDirection, data[i].azMaxDirection, data[i].azEndDirection, data[i].startEl, data[i].maxEl, data[i].endEl, data[i].magnitude, data[i].duration, data[i].timeZone, data[i].passeDetails));
        }
        this.setState({
                data: passages
            }
        );
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location !== this.props.location) {
            clearInterval(this.interval);
            this.setState({
                timer: null
            });
            await this.setState({location: this.props.location});
            await this.setState({data: null});
            this.getDataApi();
            /*this.getDataJson();*/
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
            <View>
                <Text style={tw`mb-2`}>Prochain passage dans : <Text style={tw`font-bold`}>{this.state.timer}</Text></Text>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    nestedScrollEnabled={true}
                />
            </View>

        )
    }

    keyExtractor = (item, index) => index;

    renderItem = ({item}) => (
        <ListItem bottomDivider button onPress={() => this.props.navigation.navigate('DetailsPassage', {
            passage: item,
            location: this.state.location
        })}
                  containerStyle={{backgroundColor: item.backgroundColor}}


        >
            <ListItem.Content>
                <ListItem.Title style={tw`font-bold`}>{item.utcToLocal()}</ListItem.Title>
                <ListItem.Content>
                    <View style={tw`flex flex-row flex-wrap justify-center`}>
                        <Text style={tw`w-50`}>Mag {item.magnitude}</Text>
                        <Text>Durée  {item.duration} (s)</Text>
                    </View>
                </ListItem.Content>
            </ListItem.Content>
            <ListItem.Chevron/>
        </ListItem>
    )


}


