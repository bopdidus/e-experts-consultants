const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

const EMAIL = "ksconsulting.cm@gmail.com"
const PASSWORD = "DIEU2019";

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:465,
    secure: true,
    auth: {
        user: EMAIL,
        pass: PASSWORD
    },
    tls:{
        rejectUnauthorized:false
    }
});

dotenv.config()


const activationAccount =  (userEmail, url, name)=>{
    console.log('echo')
    let emailtoken =  jwt.sign({email: userEmail}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    let link = `http://localhost:5000/api/auth/${url}/${emailtoken}`
    var mailOptions = {
        from: EMAIL,
        to: userEmail,
        subject: 'Activation de compte',
        html:`<br/>Bonjour / Bonsoir M./Mme ${name}
        <br/>
        <p>Veuillez cliquer sur le lien ci-dessous pour activer votre compte: ${link}</p>`
    };
    console.log(emailtoken)
    transporter.sendMail(mailOptions)
    .then(()=>{
        console.log("email sent")
    }).catch((error)=> console.error(error));

};

/*
const passwordRecovery = (userEmail, name, token)=>{
    let response = {
        body:{
            name,
            intro:`<h2>Cliquez sur le lien pour réinitialiser votre mot de passe</h2> <br>
            <p>${process.env.CLIENT_URL}/resetpassword?id=${token}</p>`
        }
    };

    let mail = mailGenerator.generate(response);

    let message = {
        from: EMAIL,
        to:userEmail,
        subject: "Réinitialisation de mot de passe",
        html:mail
    };

    transporter.sendMail(message)
    .then(()=>{
        console.log("email sent")
    }).catch((error)=> console.error(error));

}
*/
module.exports.ActivationAccount = activationAccount;
//module.exports.PasswordRecovery = passwordRecovery;