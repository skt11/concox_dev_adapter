const { extractCodes, isInfoValid } = require('./utils');

const decodeLogin = (data) => {
    const { infoContent, errCheckCode, errCheckContent } = extractCodes(data)
    if (isInfoValid(errCheckContent, errCheckCode)) {
        return infoContent
    }
    return { error: "Invalid data" }
}

const decodeHeartBeat = (data) => {
    const extractedCodes = extractCodes(data)
    if (isInfoValid(extractedCodes.errCheckContent, extractedCodes.errCheckCode)) {
        return extractedCodes
    }
    return { error: "Invalid data" }
}

const decodeGPS = (data) => {
    const { infoContent, errCheckCode, errCheckContent } = extractCodes(data)
    if (isInfoValid(errCheckContent, errCheckCode)) {
        return infoContent
    }
    return { error: "Invalid data" }
}

module.exports = { decodeLogin, decodeHeartBeat, decodeGPS }