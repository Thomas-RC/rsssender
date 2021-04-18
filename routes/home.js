const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/home');

router.get('/', homeController.getHome);

module.exports = router;