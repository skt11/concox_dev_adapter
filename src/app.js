const express = require("express")
const socketio = require('socket.io')
const http = require("http")

const server = http.createServer(express())
const io = socketio(server)


io.on('connection', (socket) => {
    console.log(`Connected to: ${socket}`)
    socket.on("login", (data) => {
        console.log(data)
        socket.emit("loginResponse", "loggedIn")
    })
    socket.on("heartBeat", (data) => {
        // console.log(data)
        socket.emit("heartBeatResponse", "Heart beat ACK")
    })
    socket.on("gpsData", (data) => {
        console.log(data)
        // socket.emit("heartBeatResponse", "Heart beat ACK")
    })
    socket.on('disconnect', ()=>{
        console.log("Device disconnected")
    })
})

module.exports = server;