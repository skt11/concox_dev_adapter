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
        protocolNumber: "22"
    }
}

module.exports = { protocolConstants }