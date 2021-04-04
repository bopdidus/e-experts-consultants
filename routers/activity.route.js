const express = require('express')
const activityController = require('../controllers/activity.controller')
const verify = require('../middlewares/verifytoken')

const router = express.Router();
 
//method verify should be add
router.get('/activity/:id',  activityController.findExperts)
router.get('/activity/lang',  activityController.getActivities)


module.exports = router;