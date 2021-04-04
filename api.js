const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//Route
const ExpertRoute = require('./routers/expert.route')
const ActivityRoute = require('./routers/activity.route')
const SubscriberRoute = require('./routers/subscriber.route')
const DomainRoute = require('./routers/domain.route')
const ConsultationRoute = require('./routers/consultation.route')

var whitelist = ['http://localhost:4200', '*']

const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
//INSTANTIATE SERVER
const server = express();

//BODYPARSER CONFIGURATION
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors())

//CONFIGURE ROUTES
server.use('/api', ExpertRoute)
server.use('/api', ActivityRoute)
server.use('/api', SubscriberRoute)
server.use('/api', DomainRoute)
server.use('/api', ConsultationRoute)


server.listen(5000, function(){
    console.log("server is starting")
})