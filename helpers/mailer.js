const nodemailer = require("nodemailer");

async function enviarMailPedido(emailCliente, numero_pedido, qrBase64) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // Validar que qrBase64 no sea null/undefined
  let base64Data = "";
  if (qrBase64) {
    base64Data = qrBase64.startsWith("data:image")
      ? qrBase64.split(",")[1]
      : qrBase64;
  }

  await transporter.sendMail({
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_USER}>`,
    to: emailCliente,
    subject: `Tu pedido ${numero_pedido} está listo 🎉`,
    html: `
      <p>Hola, tu pedido <b>${numero_pedido}</b> ya está listo.</p>
      <p>Mostrá este QR al retirar:</p>
      ${
        base64Data
          ? `<img src="cid:qrpedido" alt="QR Pedido" style="width:200px;height:200px;"/>`
          : `<p><i>No se pudo generar el QR</i></p>`
      }
    `,
    attachments: base64Data
      ? [
          {
            filename: "qr.png",
            content: base64Data,
            encoding: "base64",
            cid: "qrpedido",
          },
        ]
      : [],
  });
}

module.exports = { enviarMailPedido };
