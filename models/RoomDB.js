const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    roomNo: String,
    Roommates: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref : 'Hostelite'
        }
    ]
});

module.exports = mongoose.model("Room", RoomSchema);