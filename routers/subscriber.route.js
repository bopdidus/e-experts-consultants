const express = require('express')
const subscriberController = require('../controllers/subscriber.controller')
const subscriberCompanyController = require('../controllers/subscriber.company.controller')
const verify = require('../middlewares/verifytoken')

const router = express.Router();
 
router.post('/auth/subscriber/register', subscriberController.register)
router.post('/auth/subscriber/login', subscriberController.login)
router.put('/subscriber/update-profile', verify, subscriberController.profil)
router.post('/auth/subscriber-company/register', subscriberCompanyController.register)
router.post('/auth/subscriber-company/login', subscriberCompanyController.login)
router.put('/subscriber-company/update-profile', verify, subscriberCompanyController.profil)


module.exports = router;