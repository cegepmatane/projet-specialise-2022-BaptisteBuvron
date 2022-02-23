import moment from "moment";

export default class Passage {


    constructor(utcStart, utcMax, utcEnd, azStartDegres, azMaxDegres, azEndDegres, azStartDirection, azMaxDirection, azEndDirection, startEl, maxEl, endEl, magnitude, duration, timeZone, passeDetails) {
        this.utcStart = utcStart;
        this.utcMax = utcMax;
        this.utcEnd = utcEnd;
        this.azStartDegres = azStartDegres;
        this.azMaxDegres = azMaxDegres;
        this.azEndDegres = azEndDegres;
        this.azStartDirection = azStartDirection;
        this.azMaxDirection = azMaxDirection;
        this.azEndDirection = azEndDirection;
        this.startEl = startEl;
        this.maxEl = maxEl;
        this.endEl = endEl;
        this.magnitude = magnitude;
        this.duration = duration;
        this.timeZone = timeZone;
        this.passeDetails = passeDetails;
        this.backgroundColor = "#fff";
        this.hourStart = moment(utcStart*1000).tz(timeZone).format("HH:mm:ss");
        this.hourMax = moment(utcMax*1000).tz(timeZone).format("HH:mm:ss");
        this.hourEnd = moment(utcEnd*1000).tz(timeZone).format("HH:mm:ss");
        this.selectBackgroundColor();
    }

    selectBackgroundColor(){
        if (this.magnitude < -3) {
            this.backgroundColor = "#6AE4AB";
        }
        else if (this.magnitude <- 2){
            this.backgroundColor = "#FFE082";
        }
    }

    utcToLocal() {
        //timestamp to date with timezone
        return moment(this.utcStart * 1000).tz(this.timeZone).format("DD/MM HH:mm");

        /*
                date.setHours(date.getHours() + 1);
        */
    }



}