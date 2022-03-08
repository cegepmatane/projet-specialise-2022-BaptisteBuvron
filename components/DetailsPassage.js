import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import tw from "twrnc";
import MapView, {Marker, Polyline} from "react-native-maps";
import moment from "moment";
import {Col, Row, Rows, Table, TableWrapper} from "react-native-table-component";
import countdown from "countdown";

export default class DetailsPassage extends React.Component {

    constructor(props) {
        super();
        this.state = {
            passage: props.route.params.passage,
            location: props.route.params.location,
            timer: countdown(new Date(moment().tz(props.route.params.passage.timeZone)), new Date(props.route.params.passage.exactStart.toString()), countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS).toLocaleString()
        };
    }


    componentDidMount() {
        this.interval = setInterval(() => this.setState({
            timer: countdown(new Date(moment().tz(this.state.passage.timeZone)), new Date(this.state.passage.exactStart.toString()), countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS).toLocaleString()
        }), 1000);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
        const CONTENT = {
            tableHead: ['', 'Début', 'Max', 'Fin'],
            tableTitle: ['Heure', 'Azimut', 'Elévation'],
            tableData: [
                [this.state.passage.hourStart, this.state.passage.hourMax, this.state.passage.hourEnd],
                [this.state.passage.azStartDirection + " (" + this.state.passage.azStartDegres + "°)", this.state.passage.azMaxDirection + " (" + this.state.passage.azMaxDegres + "°)", this.state.passage.azEndDirection + " (" + this.state.passage.azEndDegres + "°)"],
                [Math.round(this.state.passage.startEl) + "°", Math.round(this.state.passage.maxEl) + "°", Math.round(this.state.passage.endEl) + "°"],
            ],
        };


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
                <View style={styles.container}>
                    <Text>Passage
                        dans <Text style={tw`font-bold`}>
                            {this.state.timer} </Text>
                    </Text>
                    <Text style={tw`mb-2`}>Information sur le passage : </Text>
                    <Table borderStyle={{borderWidth: 1}}>
                        <Row
                            data={CONTENT.tableHead}
                            flexArr={[1, 1, 1, 1]}
                            style={styles.head}
                            textStyle={styles.text}
                        />
                        <TableWrapper style={styles.wrapper}>
                            <Col
                                data={CONTENT.tableTitle}
                                style={styles.title}
                                heightArr={[28, 28]}
                                textStyle={styles.text}
                            />
                            <Rows
                                data={CONTENT.tableData}
                                flexArr={[1, 1, 1]}
                                style={styles.row}
                                textStyle={styles.text}
                            />
                        </TableWrapper>
                    </Table>
                </View>
            </View>
        );
    }

    utcToLocal = (utcDate, timeZone) => {
        //timestamp to date with timezone
        return moment(utcDate * 1000).tz(timeZone).format("DD/MM/YYYY HH:mm");

        /*
                date.setHours(date.getHours() + 1);
        */

    }

}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 16, paddingTop: 30},
    head: {height: 40, backgroundColor: '#B5BABF'},
    wrapper: {flexDirection: 'row'},
    title: {flex: 1},
    row: {height: 28},
    text: {textAlign: 'center'},
});

