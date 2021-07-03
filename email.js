const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "riley.blanda22@ethereal.email",
    pass: "672db4haCpsuG2JZ79",
  },
});

const remitente = "riley.blanda22@ethereal.email";

const enviarCorreo = (destinatario, asunto, contenido) => {
  const mensaje = {
    from: remitente,
    to: destinatario,
    subject: asunto,
    html: contenido,
  };
  transport.sendMail(mensaje, (err, info) => {
    if (err) {
      console.log(`No se ha podido enviar el correo. ${err.message}`);
    } else {
      console.log(`Correo enviado. ${info}`);
    }
  });
};

module.exports = {
  enviarCorreo,
};
