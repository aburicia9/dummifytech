import nodemailer from 'nodemailer'

export const mail = {
  user: 'infodummifytech@gmail.com',
  pass: 'fxcv bzgv bzjd mhet'
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  tls: {
    rejectUnauthorized: false
  },
  secure: true,
  auth: {
    user: mail.user,
    pass: mail.pass
  }
})

export const sendVerificationNewUserEmailConfig = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: `INFO DummifyTech <${mail.user}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: 'Hello world?', // plain text body
      html // html body
    })
    return ''
  } catch (error) {
    console.log('Algo no va bien con el email ' + error)
  }
}

export const getTemplateVerificationNewUserEmailConfig = (name, token) => {
  return (
    `
      <head>
        <link rel="stylesheet" href="./style.css">
      </head>
  
      <div id="email___content">
        <img src="https://i.imgur.com/Gv19LWw.jpg" alt="" width="100px" height="100px">
        <h2>Hola ${name}</h2>
        <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
        <a
            href="http://localhost:8000/confirm/${token}"
            target="_blank"
        >Confirmar Cuenta</a>
      </div> 
    `
  )
}

export const sendDeleteConfig = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: `INFO DummifyTech <${mail.user}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: 'Hello world?', // plain text body
      html // html body
    })
    return ''
  } catch (error) {
    console.log('Algo no va bien con el email ' + error)
  }
}

export const getTemplateDeleteConfig = (name, type) => {
  return (
    `
      <head>
        <link rel="stylesheet" href="./style.css">
      </head>
  
      <div id="email___content">
        <img src="https://i.imgur.com/Gv19LWw.jpg" alt="" width="100px" height="100px">
        <h2>Hola ${name}</h2>
        <p>Tu ${type} ha sido eliminada de DummifyTech</p>
        <p>Motivos disciplinarios</p>
      </div> 
    `
  )
}
