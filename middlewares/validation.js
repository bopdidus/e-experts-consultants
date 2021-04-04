//VALIDATION
const Joi = require("joi");

//register validation expert physique

const ExpertphysiqueValidation = data =>{
    const schema = Joi.object({
        firstname: Joi.string().alphanum().min(4).required(),
        lastname: Joi.string().alphanum().min(2).required(),
        nic: Joi.number().integer().min(6).required(),
        sexe: Joi.valid('F', 'M').required(),
        email: Joi.string().min(6).max(50).required().email(),
        phoneNumber: Joi.number().integer().min(8).required(),
        password: Joi.string().min(6).required(),
        country: Joi.string().min(4).required(),
        city: Joi.string().required(),
        niu: Joi.string().required(),
        experience: Joi.number().positive(),
        isCompany: Joi.boolean().default('false'),
        //domain_activity: Joi.array().items().required(),
        accept_conditions: Joi.boolean().required(),
        working_place: Joi.string(),
        avatar: Joi.any().optional(),
        national_order: Joi.any().optional(),
        international_order: Joi.any().optional(),
        
    });

    return schema.validate(data);
};

//update expert
const ExpertUpdateValidation = data =>{
    const schema = Joi.object({
        firstname: Joi.string().alphanum().min(4).required(),
        lastname: Joi.string().alphanum().min(2).required(),
        nic: Joi.number().integer().min(6).required(),
        sexe: Joi.valid('F', 'M').required(),
        experience: Joi.number().positive(),
        email: Joi.string().min(6).max(50).required().email(),
        phoneNumber: Joi.number().integer().min(8).required(),
        country: Joi.string().min(4).required(),
        city: Joi.string().required(),
        niu: Joi.string().required(),
        working_place: Joi.string(),
        national_order: Joi.any().optional(),
        international_order: Joi.any().optional(),  
        
    });

    return schema.validate(data);
};

const ExpertCompanyUpdateValidation = data =>{
    const schema = Joi.object({
        company_name:Joi.string().required(),
        trade_id: Joi.string().alphanum().min(6).required(),
        niu:Joi.string().required(),
        email:Joi.string().min(6).max(50).required().email(),
        phoneNumber:Joi.number().integer().min(8).required(),
        social_reason:Joi.string().required(),
        website:Joi.string(),
        country:Joi.string().min(4).required(),
        city:Joi.string().required(),
        working_place:Joi.string().required(),
        
    });

    return schema.validate(data);
};

//register validation for company expert

const ExpertmoraleValidation = data =>{
    const schema = Joi.object({
        company_name:Joi.string().required(),
        trade_id: Joi.string().alphanum().min(6).required(),
        avatar: Joi.any().optional(),
        niu:Joi.string().required(),
        email:Joi.string().min(6).max(50).required().email(),
        phoneNumber:Joi.number().integer().min(8).required(),
        password:Joi.string().min(6).required(),
        accept_conditions:Joi.boolean().required(),
        isCompany: Joi.boolean().default('true'),
        social_reason:Joi.string().required(),
        website:Joi.string(),
        country:Joi.string().min(4).required(),
        city:Joi.string().required(),
        working_place:Joi.string().required(),
    });

    return schema.validate(data);
};

//register validation for company not expert

const SubscribermoraleValidation = data =>{
    const schema = Joi.object({
        company_name:Joi.string().required(),
        trade_id: Joi.string().alphanum().min(6).required(),
        avatar: Joi.any().optional,
        niu:Joi.string(),
        email:Joi.string().min(6).max(50).required().email(),
        phoneNumber:Joi.number().integer().min(8).required(),
        password:Joi.string().min(6).required(),
        accept_conditions:Joi.boolean().required(),
        isCompany: Joi.boolean().default('true'),
        social_reason:Joi.string().required(),
        website:Joi.string(),
        country:Joi.string().min(4).required(),
        city:Joi.string().required(),
        working_place:Joi.string(),
    });

    return schema.validate(data);
};
//register validation subscriber physique

const SubscriberphysiqueValidation = data =>{
    const schema = Joi.object({
        firstname: Joi.string().alphanum().min(4).required(),
        lastname: Joi.string().alphanum().min(2).required(),
        nic: Joi.number().integer().min(6).required(),
        sexe: Joi.valid('F', 'M').required(),
        email: Joi.string().min(6).max(50).required().email(),
        phoneNumber: Joi.number().integer().min(8).required(),
        password: Joi.string().min(6).required(),
        country: Joi.string().min(4).required(),
        city: Joi.string().required(),
        isCompany: Joi.boolean().default('false'),
        accept_conditions: Joi.boolean().required(),
        avatar: Joi.any().optional(),
        
    });

    return schema.validate(data);
};

// update subscriber
const SubscriberCompanyUpdateValidation = data =>{
    const schema = Joi.object({
        company_name:Joi.string().required(),
        trade_id: Joi.string().alphanum().min(6).required(),
        niu:Joi.string(),
        email:Joi.string().min(6).max(50).required().email(),
        phoneNumber:Joi.number().integer().min(8).required(),
        password:Joi.string().min(6).required(),
        social_reason:Joi.string().required(),
        website:Joi.string(),
        country:Joi.string().min(4).required(),
        city:Joi.string().required(),
        working_place:Joi.string(),
    });

    return schema.validate(data);
};
const SubscriberUpdateValidation = data =>{
    const schema = Joi.object({
        firstname: Joi.string().alphanum().min(4).required(),
        lastname: Joi.string().alphanum().min(2).required(),
        nic: Joi.number().integer().min(6).required(),
        sexe: Joi.valid('F', 'M').required(),
        email: Joi.string().min(6).max(50).required().email(),
        phoneNumber: Joi.number().integer().min(8).required(),
        country: Joi.string().min(4).required(),
        city: Joi.string().required(),
    });

    return schema.validate(data);
};

const loginValidation = data =>{
    const schema = Joi.object({
        email: Joi.string().min(6).max(50).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const passwordValidation = data =>{
    const schema = Joi.object({
        oldPassword: Joi.string().min(8).max(20).required(),
        password: Joi.string().min(8).max(20).required()
    });
    return schema.validate(data);
};


module.exports.SubscribermoraleValidation = SubscribermoraleValidation;
module.exports.SubscriberUpdateValidation = SubscriberUpdateValidation;
module.exports.SubscriberphysiqueValidation = SubscriberphysiqueValidation;
module.exports.SubscriberCompanyUpdateValidation = SubscriberCompanyUpdateValidation;
module.exports.ExpertphysiqueValidation = ExpertphysiqueValidation;
module.exports.ExpertmoraleValidation = ExpertmoraleValidation;
module.exports.ExpertUpdateValidation = ExpertUpdateValidation;
module.exports.ExpertCompanyUpdateValidation = ExpertCompanyUpdateValidation;
module.exports.loginValidation = loginValidation;
module.exports.passwordValidation = passwordValidation;