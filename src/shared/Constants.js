const protocol_constants = {
    start_bit: "7878",
    stop_bit: "0d0a",
    protocol_number: {
        login_info: "01",
        gps_data: "22",
        heart_beat: "23"
    }
}

module.exports = { protocol_constants }