const express = require('express')
const domainController = require('../controllers/domain.controller')
const verify = require('../middlewares/verifytoken')

const router = express.Router();
 
//method verify should be add
router.get('/domain',  domainController.All)
router.post('/domain',  domainController.insert)

module.exports = router;