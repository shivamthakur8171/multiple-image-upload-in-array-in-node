const landingRoute = require('express').Router();
const imageUpload = require('../middleware/imageUpload')
const landing = require('../controller/landing');


landingRoute.post('/register',imageUpload.array('image'),landing.multipleImage);
landingRoute.get('/getdata',landing.imageGet);

module.exports = landingRoute