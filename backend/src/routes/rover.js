const roverController = require('../controllers/roverController');
const router = require('express').Router();

router.post('/', roverController.createOne);
router.get('/', roverController.fetchAll);

module.exports = router;
