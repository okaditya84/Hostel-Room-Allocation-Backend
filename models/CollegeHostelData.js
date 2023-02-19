const mongoose = require('mongoose');

const CollegeHostelSchema = new mongoose.Schema({
    rollNo: String,
    transactionId: String,
    name: String,
    emailId: String,
    phoneNumber: String,
    address: String,
});

module.exports = mongoose.model('CollegeHostelData', CollegeHostelSchema);