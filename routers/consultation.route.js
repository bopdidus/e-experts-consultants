const express = require('express')
const consultationController = require('../controllers/consultation.controller')
const verify = require('../middlewares/verifytoken')

const router = express.Router();
 
//method verify should be add
router.get('/consultation', verify, consultationController.getConsultationByExpert)


module.exports = router;