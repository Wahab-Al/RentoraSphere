import nodemailer from 'nodemailer'
import _config from '../config/env.js'
const transporter = nodemailer.createTransport({
  host: _config.email_host,
  port: Number(_config.email_port) || 587,
  secure: Number(_config.email_port) === 465, 
  auth: {
    user: _config.email_user,
    pass: _config.email_pass
  }
})

const sendEmail = async(to, subject, html) =>{
  try {
    const mailOptions = {
      from: `"Rentora Sphere", <${_config.rentora_email}>`,
      to, subject, html
    }

    const info = await transporter.sendMail(mailOptions)
    return info

  } catch (error) {
    console.error("[Emai Service Error]: Failed to send email.")
    console.error `issue: ${error.message}`
    throw error
  }
}

export default sendEmail