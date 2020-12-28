const express = require("express")
const socketio = require('socket.io')
const http = require("http")
const { decodeGPS, decodeLogin, decodeHeartBeat } = require('./shared/decoders');
const { responseData } = require('./shared/Constants')
const { saveOutput } = require("./shared/utils")

const server = http.createServer(express())
const io = socketio(server)


io.on('connection', (socket) => {
    
    console.log(`Connected to device, ID: ${socket.id}`)
    console.log("-----")
    
    //On receiving login packet, decode the data and if there is no error log the data and emmit response
    socket.on("login", (data) => {
        const decodedData = decodeLogin(data.toLowerCase())
        if (!decodedData.error) {
            console.log(`Login Packet: ${JSON.stringify(decodedData, null, 2)}`)
            console.log("-----")
            socket.emit("loginResponse", responseData.login)
        }
    })
    
    //On receiving heartbeat packet, decode the data and if there is no error log the data and emmit response
    socket.on("heartBeat", (data) => {
        const decodedData = decodeHeartBeat(data.toLowerCase())
        if (!decodedData.error) {
            console.log(`Heart beat Packet: ${JSON.stringify(decodedData, null, 2)}`)
            console.log("-----")
            socket.emit("heartBeatResponse", responseData.heartBeat)
        }
    })

    //On receiving GPS packet, decode the data and if there is no error log the data, 
    //save the data in the output folder
    socket.on("gpsData", (data) => {
        const decodedData = decodeGPS(data.toLowerCase())
        if (!decodedData.error) {
            console.log(`GPS Packet: ${JSON.stringify(decodedData, null, 2)}`)
            console.log("-----")
            saveOutput(decodedData)
            console.log("-----")
        }
    })
    
    socket.on('disconnect', () => {
        console.log("Device disconnected")
    })
})

module.exports = server;