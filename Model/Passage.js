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
        this.selectBackgroundColor();
    }

    selectBackgroundColor(){
        if (this.magnitude < -3) {
            this.backgroundColor = "#198754";
        }
        else if (this.magnitude <- 2){
            this.backgroundColor = "#ffc107";
        }
    }

    utcToLocal() {
        //timestamp to date with timezone
        return moment(this.utcStart * 1000).tz(this.timeZone).format("DD/MM/YYYY HH:mm");

        /*
                date.setHours(date.getHours() + 1);
        */

    }


}