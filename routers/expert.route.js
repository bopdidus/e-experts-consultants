const express = require('express')
const expertController = require('../controllers/expert.controller')
const expertCompanyController = require('../controllers/expert.company.controller')
const verify = require('../middlewares/verifytoken')

const router = express.Router();
 
//method verify should be add
router.get('/expert/:id',  expertController.one)
//router.post('/domain',  domainController.insert)
router.post('/auth/expert/register', expertController.register)
router.put('/expert/change-password',verify, expertController.editPassword)
router.post('/auth/expert/login', expertController.login)
router.put('/expert/update-profile', verify, expertController.profil)
router.post('/auth/expert-company/register', expertCompanyController.register)
router.post('/auth/expert-company/login', expertCompanyController.login)
router.put('/expert-company/update-profile', verify, expertCompanyController.profil)

module.exports = router;