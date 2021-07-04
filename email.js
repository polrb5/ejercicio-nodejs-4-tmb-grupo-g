const nodemailer = require("nodemailer");
const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

const transport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "stevie47@ethereal.email",
    pass: "WkZEv3nga2PXgMWcYf",
  },
});

const remitente = "stevie47@ethereal.email";

const enviarCorreo = async (destinatario, asunto, contenido) => {
  const mensaje = {
    from: remitente,
    to: destinatario,
    subject: asunto,
    text: contenido,
    html: await readFile("./infoParadas/paradas.txt", "utf8"),
  };
  console.log(mensaje);
  transport.sendMail(mensaje, (err, info) => {
    console.log(mensaje);
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
