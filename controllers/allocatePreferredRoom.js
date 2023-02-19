const CollegeHostelData = require('../models/CollegeHostelData');
const Hostelite = require('../models/Hostelite');
const RoomDB = require('../models/RoomDB');
const Room = require('../models/RoomDB');

const allocateOne = async (req, res) => {
    const Student = req.body;
    if (!Student) return res.status(201).json({ msg: "Kindly Enter All details" })
    // Check if already allocated
    const isAllocated = await Hostelite.findOne({ rollNo: Student.rollNo });
    if (isAllocated) {
        return res.status(201).json({ msg: "Already allocated" });
    }
    const isValid = await CollegeHostelData.findOne({ transactionId: Student.transactionId, rollNo: Student.rollNo });
    if (!isValid) {
        return res.status(201).json({ msg: "Wrong transactionId or Roll Number" })
    }
    try {
        let room = await Room.findById(Student.id);
        if (!room) {
            return res.status(201).json({ msg: "Room not Found" });
        }
        if (room.Roommates.length === 2) {
            return res.status(201).json({ msg: "Room is full" });
        }
        const student = new Hostelite({
            name: Student.name,
            rollNo: Student.rollNo,
            transactionId: Student.transactionId,
            emailId: Student.emailId,
            phoneNumber: Student.phoneNumber,
            address: Student.address,
            roomNo: room.roomNo,
        });
        try {
            await student.save();
            room.Roommates.push(student._id);
            await room.save();
            return res.status(200).json({
                msg: "Success",
                data: student._id
            });
        } catch (err) {
            console.log(err);
            return res.status(201).json({ msg: "Server error" });
        }
    } catch (error) {
        return res.status(201).json({ msg: "Server error" });
    }
}

const allocateTwo = async (req, res) => {
    const [Student1, Student2] = req.body;
    if (!Student1 || !Student2) return res.status(201).json({ msg: "Please Enter All details" });
    // Check if already allocated
    if (Student1.rollNo === Student2.rollNo) {
        return res.status(201).json({ msg: "Both students cannot have same roll no" });
    }
    const isValid1 = await CollegeHostelData.findOne({ rollNo: Student1.rollNo, transactionId: Student1.transactionId });
    if (!isValid1) {
        return res.status(201).json({ msg: "Wrong Transaction Id or Roll No" });
    }
    const isValid2 = await CollegeHostelData.findOne({ rollNo: Student2.rollNo, transactionId: Student2.transactionId });
    if (!isValid2) {
        return res.status(201).json({ msg: "Wrong Transaction Id or Roll No" });
    }
    if (Student1.id !== Student2.id) {
        return res.status(201).json({ msg: "Both students must be in same room" });
    }
    const hostelite = await Hostelite.find({
        rollNo: {
            $in: [Student1.rollNo, Student2.rollNo]
        }
    });
    if (hostelite.length > 0) {
        return res.status(201).json({ msg: "Already allocated" })
    }
    try {

        const room = await Room.findById((Student1.id));
        if (!room) {
            return res.status(201).json({ msg: "No room available" });
        }
        if (room.Roommates.length !== 0) {
            return res.status(201).json({ msg: "Room is full" });
        }
        const roomNo = room.roomNo;
        const student1 = new Hostelite({
            name: Student1.name,
            rollNo: Student1.rollNo,
            transactionId: Student1.transactionId,
            emailId: Student1.emailId,
            phoneNumber: Student1.phoneNumber,
            address: Student1.address,
            roomNo: roomNo,
        });
        const student2 = new Hostelite({
            name: Student2.name,
            rollNo: Student2.rollNo,
            transactionId: Student2.transactionId,
            emailId: Student2.emailId,
            phoneNumber: Student2.phoneNumber,
            address: Student2.address,
            roomNo: roomNo,
        });
        try {
            await student1.save();
            await student2.save();
            room.Roommates.push(student1._id);
            room.Roommates.push(student2._id);
            await room.save();
            return res.status(200).json({
                msg: "Success",
                data: [
                    student1._id,
                    student2._id
                ]
            });
        } catch (err) {
            console.log(err);
            return res.status(201).json({ msg: "Server error" });
        }
    } catch (error) {
        return res.status(201).json({ msg: "Server error" });
    }
}

module.exports = { allocateOne, allocateTwo };