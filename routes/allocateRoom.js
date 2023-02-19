const { allocateOne, allocateTwo, getAllocatedRoom, getDetails, getDetailsOfTwo } = require('../controllers/allocateRoom');

const express = require('express');
const router = express.Router();

router.get("/getAllocatedRooms", getAllocatedRoom);
router.get("/:id", getDetails);
router.get("/two/:id", getDetailsOfTwo)

router.post('/allocateOne', allocateOne);
router.post('/allocateTwo', allocateTwo);

module.exports = router;