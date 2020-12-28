const { extractCodes, isInfoValid, hexToBin } = require('./utils');
const { protocolConstants: { heartBeat, gps, login } } = require("./Constants");

/**
 * All the decode functions take the data pakcet as input
 * Extracts the hex codes, checks if it's valid with CRC-ITU check
 * validates corresponding protocol numbers
 * returns an error object if data is not valid
 * Otherwise Decodes the hex codes according to the protocol document and returns the decodedData object
 */

//Decodes the login packet
const decodeLogin = (data) => {
    const extractedCodes = extractCodes(data)

    if (isInfoValid(extractedCodes) && extractedCodes.protocolNumber === login.protocolNumber) {
        const decodedData = {}

        const terminalIDCode = extractedCodes.infoContent.substr(0, 16)
        const typeIDCode = extractedCodes.infoContent.substr(16, 4)
        const timeZoneCode = extractedCodes.infoContent.substr(20, 3)
        const gmtZoneBit = hexToBin(extractedCodes.infoContent.substr(23, 2))[0]

        decodedData["Terminal ID"] = terminalIDCode
        decodedData["Type ID"] = typeIDCode
        decodedData["Time Zone"] = `GMT ${gmtZoneBit === '0' ? '+' : '-'} ${parseInt(timeZoneCode, 16) / 100}`

        return decodedData
    }
    return { error: "Invalid data" }
}

//Decodes the heartBeat packet
const decodeHeartBeat = (data) => {
    const extractedCodes = extractCodes(data)

    if (isInfoValid(extractedCodes) && extractedCodes.protocolNumber === heartBeat.protocolNumber) {
        const decodedData = {}

        const terminalInfoContentCode = extractedCodes.infoContent.substr(0, 2)
        const terminalInfoContentCodeBin = hexToBin(terminalInfoContentCode)
        const voltageLevelCode = extractedCodes.infoContent.substr(2, 4)
        const gsmSignalStrengthCode = extractedCodes.infoContent.substr(6, 2)
        const languageCode = extractedCodes.infoContent.substr(10, 2)

        decodedData["Voltage Level"] = parseInt(voltageLevelCode, 16) / 100
        decodedData["GSM Signal Strength"] = heartBeat.gsmSignalStrength[gsmSignalStrengthCode]
        decodedData["Language"] = heartBeat.language[languageCode]
        decodedData["Defense"] = heartBeat.terminalInformationContent.bit[0][terminalInfoContentCodeBin[7]]
        decodedData["ACC"] = heartBeat.terminalInformationContent.bit[1][terminalInfoContentCodeBin[6]]
        decodedData["Charge"] = heartBeat.terminalInformationContent.bit[2][terminalInfoContentCodeBin[5]]
        decodedData["GPS tracking"] = heartBeat.terminalInformationContent.bit[6][terminalInfoContentCodeBin[1]]
        decodedData["Oil and electricity"] = heartBeat.terminalInformationContent.bit[7][terminalInfoContentCodeBin[0]]

        return decodedData
    }
    return { error: "Invalid data" }
}

//Decodes the GPS packet
const decodeGPS = (data) => {
    const extractedCodes = extractCodes(data)

    if (isInfoValid(extractedCodes) && extractedCodes.protocolNumber === gps.protocolNumber) {
        const decodedData = {}

        const [year, month, day, hour, min, sec] = [
            parseInt(extractedCodes.infoContent.substr(0, 2), 16),
            parseInt(extractedCodes.infoContent.substr(2, 2), 16),
            parseInt(extractedCodes.infoContent.substr(4, 2), 16),
            parseInt(extractedCodes.infoContent.substr(6, 2), 16),
            parseInt(extractedCodes.infoContent.substr(8, 2), 16),
            parseInt(extractedCodes.infoContent.substr(10, 2), 16),
        ]
        const quantityOfGPSSatelitesCode = parseInt(extractedCodes.infoContent.substr(12, 2), 16).toString()
        const latitudeCode = extractedCodes.infoContent.substr(14, 8)
        const longitudeCode = extractedCodes.infoContent.substr(22, 8)
        const speedCode = extractedCodes.infoContent.substr(30, 2)
        const courseStatusCode = extractedCodes.infoContent.substr(32, 4)
        const courseStatusCodeBin = hexToBin(courseStatusCode.substr(0, 2)) + hexToBin(courseStatusCode.substr(2, 2))
        const mccCode = extractedCodes.infoContent.substr(36, 4)
        const mncCode = extractedCodes.infoContent.substr(40, 2)
        const lacCode = extractedCodes.infoContent.substr(42, 4)
        const cellIDCode = extractedCodes.infoContent.substr(46, 6)
        const accCode = extractedCodes.infoContent.substr(52, 2)
        const dataUploadModeCode = extractedCodes.infoContent.substr(54, 2)
        const gpsRealTimeReuploadCode = extractedCodes.infoContent.substr(56, 2)
        const mileageCode = extractedCodes.infoContent.substr(52, 8)

        decodedData["DateTime"] =
            `${day}/${month}/20${year}, ${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
        decodedData["GPS Information Length"] = quantityOfGPSSatelitesCode[0]
        decodedData["Positioning Satelite Number"] = quantityOfGPSSatelitesCode[1]
        decodedData["Latitude"] = parseInt(latitudeCode, 16) / 1800000
        decodedData["Longitude"] = parseInt(longitudeCode, 16) / 1800000
        decodedData["Speed"] = parseInt(speedCode, 16)
        decodedData["MCC"] = parseInt(mccCode, 16)
        decodedData["MNC"] = parseInt(mncCode, 16)
        decodedData["LAC"] = parseInt(lacCode, 16)
        decodedData["Cell ID"] = parseInt(cellIDCode, 16)
        decodedData["ACC"] = gps.acc[accCode]
        decodedData["Data Upload Mode"] = gps.dataUploadMode[dataUploadModeCode]
        decodedData["GPS Real Time Re-upload"] = gps.gpsRealTimeReupload[gpsRealTimeReuploadCode]
        decodedData["Mileage"] = parseInt(mileageCode, 16) / 100
        decodedData["GPS status"] =
            `${gps.courseStatus.bit_5[courseStatusCodeBin[2]]}, ${gps.courseStatus.bit_4[courseStatusCodeBin[3]]}, ${gps.courseStatus.bit_3[courseStatusCodeBin[4]]}, ${gps.courseStatus.bit_2[courseStatusCodeBin[5]]}`
        decodedData["GPS Course"] = `${parseInt(courseStatusCodeBin.substr(6), 2)}\u00B0`

        return decodedData
    }
    return { error: "Invalid data" }
}

module.exports = { decodeLogin, decodeHeartBeat, decodeGPS }