const protocolConstants = {
    startBit: "7878",
    stopBit: "0d0a",
    login: {
        protocolNumber: "01"
    },
    heartBeat: {
        protocolNumber: "23",
        terminalInformationContent: {
            bit: [
                { 0: "Defense Deactivated", 1: "Defense Activated" },
                { 0: "ACC high", 1: "ACC low" },
                { 0: "Charge on", 1: "Charge off" },
                "Extended",
                "Extended",
                "Extended",
                { 0: "Gps tracking off", 1: "Gps tracking on" },
                { 0: "Oil and electricity disconnected", 1: "Oil and electricity connected" },
            ]
        },
        gsmSignalStrength: {
            "00": "No Signal",
            "01": "extremely weak signal",
            "02": "very weak signal",
            "03": "good signal",
            "04": "strong signal"
        },
        language: {
            "01": "Chinese",
            "02": "English"
        }
    },
    gps: {
        protocolNumber: "22",
        acc: {
            "00": "Low",
            "01": "High",
            "06": "Not Available"
        },
        dataUploadMode: {
            "00": "Upload by time interval",
            "01": "Upload by distance interval",
            "02": "Inflection point upload",
            "03": "ACC status upload",
            "04": "Re - upload the last GPS point when back to static.",
            "05": "Upload the last effective point when network recovers.",
            "06": "Update ephemeris and upload GPS data compulsorily",
            "07": "Upload location when side key triggered",
            "08": "Upload location after power on",
            "09": "Unused",
            "0a": "Upload the last longitude and latitude when device is static; time updated",
            "0d": "Upload the last longitude and latitude when device is static",
            "0e": "Gpsdup upload(Upload regularly in a static state.)."
        },
        gpsRealTimeReupload: {
            "00": "Real time upload",
            "01": "Re-upload"
        },
        courseStatus: {
            bit_5: { 0: "Real Time GPS", 1: "Differential positioning" },
            bit_4: { 0: "GPS not positioned", 1: " GPS has been positioned" },
            bit_3: { 0: "East Longitude", 1: "West Longitude" },
            bit_2: { 0: "South Latitude", 1: "North Latitude" }
        }

    }
}

const responseData = {
    login: "7878050100059FF80D0A",
    heartBeat: "787805230100670E0D0A",
}

module.exports = { protocolConstants, responseData }