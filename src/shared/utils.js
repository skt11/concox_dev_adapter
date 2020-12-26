const crc16 = require('node-crc-itu');

const isInfoValid = (data, expected) => {
    const actual = crc16(data)
    return actual === expected
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

module.exports = { isInfoValid, extractCodes }