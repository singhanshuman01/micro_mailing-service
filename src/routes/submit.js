const express = require("express");
const submitController = require('../controller/submitController');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

router.post("/", rateLimiter, submitController.submission);

module.exports=router;