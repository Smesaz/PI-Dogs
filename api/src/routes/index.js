const { Router } = require('express');
const router = Router();

const routes_dogs = require('./dogs');
const route_temperament = require('./temperament');
const route_dog = require('./dog');

router.use('/dogs', routes_dogs);
router.use('/temperament', route_temperament);
router.use('/dog', route_dog);

module.exports = router;
