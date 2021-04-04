const models  = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const async = require('async')


const { ExpertphysiqueValidation, loginValidation, ExpertUpdateValidation, passwordValidation } = require('../middlewares/validation');
const {ActivationAccount }= require("../middlewares/email")

//CONSTANT
const TITLE_LIMIT = 3;
const CONTENT_LIMIT = 15;

module.exports = {
    register: async function(req, res){
        let domain = req.body.company_activity

        delete req.body.company_activity;
        let {error} = ExpertphysiqueValidation(req.body);

        if(error) return res.status(400).send(error.details[0].message);
    
        //CHECKING IF USER IS ALREADY IN THE DATABASE
         let idCard = await models.Expert.findOne({where:{nic: req.body.nic}})
        
          if(idCard) return res.status(401).send("Expert non existant");
    
        //HASH PASSWORD
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(req.body.password, salt);
    
      /* let user = models.Expert.build({
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
            niu: req.body.niu,
            national_order: req.body.national_order,
            international_order: req.body.international_order
        });
        */
       // ActivationAccount(user.email,'expert/activation-account', user.firstname+" "+user.lastname);
       try {       
            async.waterfall([
                function(done){
                models.Expert.create({
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
                    niu: req.body.niu,
                    national_order: req.body.national_order,
                    international_order: req.body.international_order
                }).then(function(userCreated){
                    done(null, userCreated)
                })
                .catch(err=>{
                    return res.status(500).send(err.message ||'unable to save the expert')
                })
                },
                function(userCreated, done){
                for (let d of domain) {
                    models.Domain.findOne({where:{id: d}})
                    .then(dom=>{
                        userCreated.addDomain(dom)
                    })
                }
                done(null, null,userCreated) 
                }
            ],function(userCreated){
                return res.status(201).json({"message": "Expert registered"})
                
            })   
        } catch (error) {
            console.log(error)
            res.status(400).send("error in server");
        }
     },
     login: async function(req, res){

        let {error} = loginValidation(req.body);

        if(error) return res.status(400).send(error.details[0].message);

        //CHECKING IF THE EMAIL EXISTS  IN THE DATABASE
        let user = await models.Expert.findOne({where:{email: req.body.email}, attributes:{exclude:['id']}, include:[{model: models.Domain, attributes:['name']}]})
        if(!user) return res.status(401).send("user does not exist");

        //PASSWORD IS CORRECT
        const validPass = await bcrypt.compare(req.body.password, user.password, function(errBcrypt, resBcrypt){
            if(resBcrypt){
                const token  = jwt.sign({email: user.email}, process.env.TOKEN_SECRET);
                return res.json({'data':user, 'token':token});
            }else{
                return res.status(403).json({'error': 'invalid credentials'})
            }
        })

     },
     profil:async function(req, res){
        const id = req.user.email;
        console.log(id)
        let {error} = ExpertUpdateValidation(req.body);

        if(error) return res.status(400).send(error.details[0].message);
        let expert = await models.Expert.findOne({where: { email: id }});
        
            expert.firstName= req.body.firstname,
            expert.lastName= req.body.lastname,
            expert.nic= req.body.nic,
            expert.sexe= req.body.sexe,
            expert.email= req.body.email,
            expert.phoneNumber= req.body.phoneNumber,
            expert.country= req.body.country,
            expert.city= req.body.city,
            expert.niu= req.body.niu,
            expert.experience = req.body.experience,
            expert.working_place = req.body.working_place,
            expert.national_order= req.body.national_order,
            expert.international_order= req.body.international_order
        
            expert.save()

        if (expert) {
               
            const token  = jwt.sign({email: expert.email}, process.env.TOKEN_SECRET);
            res.json({
                'token':token,
                'data':expert
            });
        } else {
            res.send({
                message: `Cannot update Expert with id=${id}. Maybe Expert  was not found or req.body is empty!`
            });
        }
     },
    all:function(req, res){ 
       
    },
    one: function(req, res){
        models.Expert.findOne({where: { id: req.params.id}})
        .then(data=> res.send(data))
        .catch(err=>{
            res.status(500).send({
                message: err.message || "some error occured while retrieving experts"
            })
        })
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
                models.Expert.findOne({
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
            models.Subscriber.findOne({
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
    },

    editPassword: async function(req, res){
        const id = req.user.email;
        let {error} = passwordValidation(req.body);

        if(error) return res.status(400).send(error.details[0].message);

        let expert = await models.Expert.findOne({where: { email: id }});

       const validPass = await bcrypt.compare(req.body.oldPassword, expert.password)
       console.log(validPass)    
       if(validPass == true){
                //HASH PASSWORD
                let salt = await bcrypt.genSalt(10);
                let hashedPassword = await bcrypt.hash(req.body.password, salt);
                expert.password = hashedPassword
                expert.save()
                return res.status(200).json({'message': 'Operation done with success!!!'});
        }else{
            return res.status(403).json({'error': "invalid password"})
        }
        
    }
}