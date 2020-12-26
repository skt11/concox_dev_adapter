const express = require("express")
const socketio = require('socket.io')
const http = require("http")
const { decodeGPS, decodeLogin, decodeHeartBeat } = require('./shared/decoders');

const server = http.createServer(express())
const io = socketio(server)


io.on('connection', (socket) => {
    console.log(`Connected to: ${socket}`)
    socket.on("login", (data) => {
        const decodedData = decodeLogin(data.toLowerCase())
        if (!decodedData.error) {
            console.log(`Login Packet: ${JSON.stringify(decodedData)}`)
            socket.emit("loginResponse", "loggedIn")
        }
    })
    socket.on("heartBeat", (data) => {
        const decodedData = decodeHeartBeat(data.toLowerCase())
        if (!decodedData.error) {
            console.log(`Heart beat Packet: ${JSON.stringify(decodedData)}`)
            socket.emit("heartBeatResponse", "Heart beat ACK")
        }
    })
    socket.on("gpsData", (data) => {
        const decodedData = decodeGPS(data.toLowerCase())
        if (!decodedData.error) {
            console.log(`GPS Packet: ${JSON.stringify(decodedData)}`)
        }
    })
    socket.on('disconnect', () => {
        console.log("Device disconnected")
    })
})

module.exports = server;