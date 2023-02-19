const mongoose = require("mongoose");

const Hostelite = new mongoose.Schema({
    name: String,
    rollNo: String,
    transactionId: String,
    emailId: String,
    phoneNumber: String,
    address: String,
    roomNo: String,
});

module.exports = mongoose.model("Hostelite", Hostelite);