const { extractCodes, isInfoValid, hexToBin } = require('./utils');
const { protocolConstants } = require("./Constants");

const decodeLogin = (data) => {
    const extractedCodes = extractCodes(data)
    if (isInfoValid(extractedCodes)) {
        return extractedCodes
    }
    return { error: "Invalid data" }
}

const decodeHeartBeat = (data) => {
    const extractedCodes = extractCodes(data)

    if (isInfoValid(extractedCodes)) {
        const decodedData = {}

        const terminalInfoContentCode = extractedCodes.infoContent.substr(0, 2)
        const terminalInfoContentCodeBin = hexToBin(terminalInfoContentCode)
        const voltageLevelCode = extractedCodes.infoContent.substr(2, 4)
        const gsmSignalStrengthCode = extractedCodes.infoContent.substr(6, 2)
        const languageCode = extractedCodes.infoContent.substr(10, 2)

        decodedData["Voltage Level"] = parseInt(voltageLevelCode, 16) / 100
        decodedData["GSM Signal Strength"] = protocolConstants.heartBeat.gsmSignalStrength[gsmSignalStrengthCode]
        decodedData["Language"] = protocolConstants.heartBeat.language[languageCode]
        decodedData["Defense"] = protocolConstants.heartBeat.terminalInformationContent.bit[0][terminalInfoContentCodeBin[7]]
        decodedData["ACC"] = protocolConstants.heartBeat.terminalInformationContent.bit[1][terminalInfoContentCodeBin[6]]
        decodedData["Charge"] = protocolConstants.heartBeat.terminalInformationContent.bit[2][terminalInfoContentCodeBin[5]]
        decodedData["GPS tracking"] = protocolConstants.heartBeat.terminalInformationContent.bit[6][terminalInfoContentCodeBin[1]]
        decodedData["Oil and electricity"] = protocolConstants.heartBeat.terminalInformationContent
            .bit[7][terminalInfoContentCodeBin[0]]

        return decodedData
    }
    return { error: "Invalid data" }
}

const decodeGPS = (data) => {
    const extractedCodes = extractCodes(data)
    if (isInfoValid(extractedCodes)) {
        return extractedCodes
    }
    return { error: "Invalid data" }
}

module.exports = { decodeLogin, decodeHeartBeat, decodeGPS }