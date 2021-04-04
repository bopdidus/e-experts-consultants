const models  = require('../models')




module.exports = {
    
    getConsultationByExpert:function(req, res){
       const id  = req.user.email;

       models.Expert.findOne(
           {
            where:{email:id},
            include:{
                model: models.Consultation,
            }
           }
       ).then(consultations=>{
           if(consultations){
               res.send(consultations)
           }else{
               res.status(400).send("consultations not found")
           }
       }).catch(err=>{
           res.status(500).send(err.message)
       })
    }
}