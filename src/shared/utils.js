const crc16 = require('node-crc-itu');
const { protocolConstants } = require("./Constants");
const fs = require('fs');
const path = require('path');

const isInfoValid = (data) => {
    const actual = crc16(data.errCheckContent)
    return actual === data.errCheckCode
        && data.startBit === protocolConstants.startBit
        && data.stopBit === protocolConstants.stopBit
}

const extractCodes = (data) => {
    return ({
        startBit: data.substring(0, 4),
        packetLength: data.substring(4, 6),
        protocolNumber: data.substring(6, 8),
        infoContent: data.substring(8, data.length - 12),
        infoSerialNumber: data.substr(-12, 4),
        errCheckContent: data.substring(4, data.length - 8),
        errCheckCode: data.substr(-8, 4),
        stopBit: data.substr(-4, 4)
    })
}

const saveOutput = (data, outputFile = "gpsData.json") => {
    
    const opPath = path.join(__dirname, "..", "output", outputFile)
    let json = []
    
    try {
        
        const jsonStr = fs.readFileSync(opPath)
        json = JSON.parse(jsonStr)
    
    } catch (e) {
        fs.openSync(opPath, 'w')
    }
    
    json.push(data)
    fs.writeFileSync(opPath, JSON.stringify(json, null, 2))
}

const hexToBin = (hex) => {
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

module.exports = { isInfoValid, extractCodes, hexToBin, saveOutput }