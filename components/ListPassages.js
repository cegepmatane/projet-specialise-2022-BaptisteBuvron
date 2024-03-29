import React from "react";
import {ActivityIndicator, FlatList, Text, View} from "react-native";
import tw from "twrnc";
import axios from "axios";
import {ListItem} from 'react-native-elements'
import "moment-timezone";
import Passage from "../Model/Passage";
import countdown from "countdown";
import moment from "moment";
import { AsyncStorage } from 'react-native';
import * as Notifications from "expo-notifications";
import {useSelector} from "react-redux";
import {setNotification} from "../slices/NotificationSlice";

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
        };
    },
});


export default class ListPassages extends React.Component {


    constructor(props) {
        super();
        this.state = {
            data: null,
            location: props.location,
            notification: props.notification,
            dispatch: props.dispatch,
        };
        /*this.getDataJson();*/
        countdown.setLabels(
            ' milliseconde| seconde| minute| heure| jour| semaine| mois| année| décennie| siècle| millénaire',
            ' millisecondes| secondes| minutes| heures| jours| semaines| mois| années| décennies| siècles| millénaires',
            ' et ',
            ', ',
            'maintenant');
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
                await this.setTimer();
               this.interval = setInterval(() =>  this.setTimer(), 1000);
               await this.setNotification();
            }

        });

    }

    async setTimer(){
        let firstPassage = this.state.data[0];
        this.setState({
            timer: countdown(new Date(moment().tz(firstPassage.timeZone)), new Date(firstPassage.exactStart.toString()), countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS).toLocaleString()
        });
    }

    async setNotification() {
        if (this.state.notification.identifier != null){
            await Notifications.cancelScheduledNotificationAsync(this.state.notification.identifier);
        }
        const firstPassage = this.state.data[0];
        const dateUTC = new Date(firstPassage.utcStart *1000);
        const trigger = new Date(new Date(dateUTC.getTime()));
        trigger.setMinutes(trigger.getMinutes() - 10);
        const identifier = await Notifications.scheduleNotificationAsync({
            content: {
                title: "Bientôt un passage de l'ISS 🛰️",
                body: "Préparez-vous à observer un passage de l'ISS dans 10 min."
            },
            trigger,
        });
        await this.state.dispatch(setNotification({
            identifier: identifier
        }))
    }

    getDataJson() {
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
        if (this.state.data.length > 0){
            return (
                <View>
                    <Text style={tw`mb-2`}>Passage dans <Text style={tw`font-bold`}>{this.state.timer}</Text></Text>
                    {/*
            TODO: Afficher les passages avec un data Map
*/}
                    {/*{
                    data.map((item)=> <Somthing item={item}/>)
                }*/}
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.data}
                        renderItem={this.renderItem}
                        nestedScrollEnabled={true}
                    />
                    <Text style={tw`text-center mt-5`}>
                        Data from : www.seeiss.com
                    </Text>
                </View>

            )
        }
        else {
            return (
                <View>
                    <Text style={tw`font-bold text-center`}>Pas de passage dans les 15 prochains jours</Text>
                </View>
            )
        }

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
                        <Text>Durée {item.duration} (s)</Text>
                    </View>
                </ListItem.Content>
            </ListItem.Content>
            <ListItem.Chevron/>
        </ListItem>
    )


}


