const nodemailer = require('nodemailer')

const sendEmail = async(options)=>{
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    
    auth:{
        user : "fashionhub421@gmail.com",
        pass : "jwtfrokeiyjtmbuz"
    },
    

})
const mailOptions = {
    from : process.env.email,
    to : options.email,
    subject : options.subject,
    text : options.message
}

await transporter.sendMail(mailOptions,(error, info) => {
    if (error) {
        return console.log(error.message);
    }
    console.log('success');
})
}
module.exports = sendEmail