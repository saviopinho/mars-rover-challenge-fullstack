const roverController = require('../controllers/roverController');
const router = require('express').Router();

router.post('/', roverController.createOne);

module.exports = router;
