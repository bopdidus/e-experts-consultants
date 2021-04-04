 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const models = require('../models')
 
const { SubscriberphysiqueValidation, loginValidation, SubscriberUpdateValidation } = require('../middlewares/validation');
const {ActivationAccount }= require("../middlewares/email")

//CONSTANT
const TITLE_LIMIT = 3;
const CONTENT_LIMIT = 15;

 module.exports= {
     register: async function(req, res){
        let {error} = SubscriberphysiqueValidation(req.body);

        if(error) return res.status(400).send(error.details[0].message);
    
        //CHECKING IF USER IS ALREADY IN THE DATABASE
         let idCard = await models.Subscriber.findOne({where:{nic: req.body.nic}})
        
          if(idCard) return res.status(401).send("Abonné non existant");
    
        //HASH PASSWORD
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(req.body.password, salt);
    
       let user = models.Subscriber.build({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            nic: req.body.nic,
            sexe: req.body.sexe,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: hashedPassword,
            country: req.body.country,
            city: req.body.city,
            isCompany: req.body.isCompany,
            accept_conditions: req.body.accept_conditions,
        });
        
        ActivationAccount(user.email,'subscriber/activation-account', user.firstname+" "+user.lastname);
       try {       
              const userSaved = await user.save();
              delete userSaved.id
             res.send(userSaved);
        } catch (error) {
            console.log(error)
            res.status(400).send("error in server");
        }
     },

     login: async function(req, res){

        let {error} = loginValidation(req.body);

        if(error) return res.status(400).send(error.details[0].message);

        //CHECKING IF THE EMAIL EXISTS  IN THE DATABASE
        let user = await models.Subscriber.findOne({where:{email: req.body.email}, attributes:{exclude:['id']}})
        if(!user) return res.status(401).send("user does not exist");

        //PASSWORD IS CORRECT
        const validPass = await bcrypt.compare(req.body.password, user.password, function(errBcrypt, resBcrypt){
            if(resBcrypt){
                const token  = jwt.sign({email: user.email}, process.env.TOKEN_SECRET);
                res.setHeader('auth-token', token);
                res.json({'data':user});
            }else{
                return res.status(403).json({'error': 'invalid credentials'})
            }
        })

     },

     profil:function(req, res){
        const id = req.user;
        console.log(id)
        let {error} = SubscriberUpdateValidation(req.body);

        if(error) return res.status(400).send(error.details[0].message);
        models.Subscriber.update({
            email: req.body.email,
            phoneNumber: req.body.phone_number,
            country: req.body.country,
            city: req.body.city,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            nic: req.body.nic,
            sexe: req.body.sexe
        }, {
          where: { email: id },
          attributes:{exclude:['id']}
        })
          .then(subs => {
            if (subs) {
              const token  = jwt.sign({email: user.email}, process.env.TOKEN_SECRET);
              res.setHeader('auth-token', token);
              res.send({
                message: "subscriber was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update subscriber with id=${id}. Maybe subscriber  was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating subscriber with id=" + id
            });
          });
     },
     createMessage:function(req, res){
        
      let title = req.body.title;
      let content = req.body.content;
      let receiverId = req.body.receiverId;
      let senderId = req.user;
      let attachment = req.body.attachment

      if(title == null || content == null){
          return res.status(501).json({'error':'missing parameters'})
      }
      if( title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT){
          return res.status(500).json({'error':'invalid parameters'})
      }

      async.waterfall([
          function(done){
              models.Subscriber.findOne({
                  where:{ email: senderId}
              }).then(function(userFound){
                  done(nul, userFound)
              }).catch(function(err){
                  return res.status(500).send(err.message ||'unable to verify the user')
              })
          },
          function(userFound, done){
              if(userFound){
                  models.Message.create({
                      title: title,
                      content: content,
                      idSender: senderId,
                      idReceiver: receiverId,
                      attachment: attachment
                  }).then(function(newMessage){
                      done(null, userFound, newMessage);
                  })
              }else{
                  res.status(404).json({'error': 'user not found'})
              }
              
          }

        ], function(newMessage){
            if(newMessage){
              return res.status(201).json(newMessage)
            }else{
              return res.status(500).json({'error':'cannot post message'})
            }
        })

    },
    getMessage:function(req,res){
      models.Message.findOne({
          where:{id: req.params.id},
          attributes:{exclude:['id']}
      }).then(message=>{
          models.Expert.findOne({
              where:{ id: message.idReceiver},
              attributes:{exclude:['id']}
          }).then(subs=>{
              message.receipeient = subs;
              res.status(201).json({'data': message})
          }).catch(err=>{
              return res.status(500).send(err)
          })
      }).catch(err=>{
          return res.status(500).send(err || 'Some errors occured')
      })
    }
 }