const models  = require('../models')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    getActivities: function(req, res){
        /*console.log(req.params.lang)
        let lang = crypto.AES.decrypt(req.params.lang, process.env.SECRET_KEY).toString(crypto.enc.Utf8)
        console.log(lang)
        models.Activity.findAll({where:{ language: lang}})
        .then(data=>{
          encryptedData = crypto.AES.encrypt(data, process.env.SECRET_KEY).toString()
          res.send(encryptedData)
        })*/
    },
    findExperts:function(req, res){ 
        let tab = [];
        models.Activity.findAll({where:{domainId: req.params.id}, include:[{model: models.Expert}]})
        .then(data =>{
            data.forEach(element => {
                tab.push(element.Expert)
            });
            
            res.send(tab)
        })
        .catch(err=> {
            res.status(500).send({
                message: err.message || "some error occured while retrieving experts"
            })
        })
    },
    
}