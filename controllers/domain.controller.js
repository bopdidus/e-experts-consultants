const models  = require('../models')
const crypto = require('crypto-js')
const dotenv = require('dotenv')
dotenv.config()


module.exports = {
    All:function(req, res){
        console.log(req.query.lang)
        var words = crypto.enc.Base64.parse(req.query.lang);
        let lang = crypto.enc.Utf8.stringify(words)// process.env.SECRET_KEY).toString(crypto.enc.Utf8)
        console.log(lang)

        models.Domain.findAll({where:{language: lang}, raw: true})
        .then(data =>{
            data = crypto.AES.encrypt(JSON.stringify({data}).toString(), process.env.SECRET_KEY).toString();
            
                res.json({'data':data})
        })
        .catch(err=> {
            res.status(500).send({
                message: err.message || "some error occured while retrieving domains"
            })
        })
    },
    insert:function(req, res){
       models.Domain.create({
           name:req.body.name,
           language:req.body.language
       }).then(data=>{
           res.send(data)
       }).catch(err=>{
           res.status(500).json({'error': 'cannot add a domain'})
       })
    }
}