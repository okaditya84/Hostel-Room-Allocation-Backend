const {allocateOne, allocateTwo} = require('../controllers/allocatePreferredRoom');

const express = require('express');
const router = express.Router();

router.post('/allocateOne', allocateOne);
router.post('/allocateTwo', allocateTwo);

module.exports = router;