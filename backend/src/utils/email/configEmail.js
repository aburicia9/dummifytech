import nodemailer from 'nodemailer'

export const mail = {
  user: 'infodummifytech@gmail.com',
  pass: 'fxcv bzgv bzjd mhet',
  admin: 'dummifytech@gmail.com'
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

export const getTemplateDeleteConfig = (username, type, contextEmail) => {
  return (
    `
      <head>
        <link rel="stylesheet" href="./style.css">
      </head>
  
      <div id="email___content">
        <img src="https://i.imgur.com/Gv19LWw.jpg" alt="" width="100px" height="100px">
        <h2>Hola ${username}</h2>
        <p>Tu <strong>${type}</strong> con <strong>"${contextEmail}"</strong> ha sido eliminad@ de DummifyTech</p>
        <p>Motivos disciplinarios</p>
      </div>
      <footer>
      <h5>Equipo de DummifyTech</h5>
      </footer> 
    `
  )
}
export const sendForgottenPasswordConfig = async (email, subject, html) => {
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

export const getTemplateForgottenPasswordConfig = (username, password) => {
  return (
    `
      <head>
        <link rel="stylesheet" href="./style.css">
      </head>
  
      <div id="email___content">
        <img src="https://i.imgur.com/Gv19LWw.jpg" alt="" width="100px" height="100px">
        <h2>Hola ${username}</h2>
        <p>Tu nueva password es <strong>"${password}"</strong>, ya puedes utilizarla para recuperar tu cuenta.</p>
      </div> 
      <footer>
      <h5>Equipo de DummifyTech</h5>
      </footer> 
    `
  )
}

export const sendReqCategoryConfig = async (subject, html) => {
  try {
    await transporter.sendMail({
      from: `INFO DummifyTech <${mail.user}>`, // sender address
      to: mail.admin, // list of receivers
      subject, // Subject line
      text: 'Hello world?', // plain text body
      html // html body
    })
    return ''
  } catch (error) {
    console.log('Algo no va bien con el email ' + error)
  }
}

export const getTemplateReqCategoryConfig = (username, categoryName, categoryReason, userEmail) => {
  return (
    `
      <head>
        <link rel="stylesheet" href="./style.css">
      </head>
  
      <div id="email___content">
        <img src="https://i.imgur.com/Gv19LWw.jpg" alt="" width="100px" height="100px">
        <h2>Petición de categoria</h2>
        <p>El usuario <strong>${username}</strong> ha solicitado la creación de la categoria: <strong>"${categoryName}"</strong>.</p>
        <p>El correo del usaurio es: ${userEmail}</p>
        <h3>Motivo</h3>
        <p>${categoryReason}</p>
        <footer>
        <h5>Equipo de DummifyTech</h5>
        </footer> 
      </div> 
    `
  )
}

export const sendResCategoryConfig = async (email, subject, html) => {
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

export const getTemplateResCategoryConfig = (username, categoryName, requestReason, accepted) => {
  return (
    `
      <head>
        <link rel="stylesheet" href="./style.css">
      </head>
  
      <div id="email___content">
        <img src="https://i.imgur.com/Gv19LWw.jpg" alt="" width="100px" height="100px">
        <h2>Petición de categoria</h2>
        <p>Querido usuario <strong>${username}</strong> le informamos que la peticion de la categoria <strong>"${categoryName}"</strong> ha sido <strong>${accepted}</strong></p>
        <h3>Motivo</h3>
        <p><strong>${requestReason}</strong></p>
        <footer>
        <h5>Equipo de DummifyTech</h5>
        </footer> 
      </div> 
    `
  )
}
