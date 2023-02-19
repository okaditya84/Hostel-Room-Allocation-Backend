const RoomDB = require("../models/RoomDB");

function addRooms(req, res) {
        ["A", "B", "C"].forEach(
            element => { 
                for (let i = 1; i < 10; i++) {
                    console.log(`${element} 0${i}`)
                    const room = new RoomDB({RoomNo: `${element} 0${i}`});
                    room.save();

                }
            })
    res.sendStatus(200);
}

module.exports = { addRooms };