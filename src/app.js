const express = require("express")
const socketio = require('socket.io')
const http = require("http")
const { decodeGPS, decodeLogin, decodeHeartBeat } = require('./shared/decoders');

const server = http.createServer(express())
const io = socketio(server)


io.on('connection', (socket) => {
    console.log(`Connected to: ${socket}`)
    socket.on("login", (data) => {
        const decodedData = decodeLogin(data)
        if (!decodedData.error) {
            console.log(`Login Packet: ${decodedData}`)
            socket.emit("loginResponse", "loggedIn")
        }
    })
    socket.on("heartBeat", (data) => {
        const decodedData = decodeHeartBeat(data)
        if (!decodedData.error) {
            console.log(`Heart beat Packet: ${decodedData}`)
            socket.emit("heartBeatResponse", "Heart beat ACK")
        }
    })
    socket.on("gpsData", (data) => {
        const decodedData = decodeGPS(data)
        if (!decodedData.error) {
            console.log(`GPS Packet: ${decodedData}`)
        }
    })
    socket.on('disconnect', () => {
        console.log("Device disconnected")
    })
})

module.exports = server;