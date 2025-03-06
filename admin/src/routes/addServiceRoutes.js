const express = require('express');
const router = express.Router();
const { addService, removeService } = require('../controllers/addServiceController');

router.post('/service', addService); //add a new service

router.delete('/service/:id', removeService); //remove a service by id

module.exports = router;