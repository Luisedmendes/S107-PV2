const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.EMAIL);
console.log(process.env.PASSWORD);
async function main() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // seu e-mail
      pass: process.env.PASSWORD, // sua senha
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL, // remetente
    to: process.env.RECIPIENT_EMAIL, // destinatário
    subject: 'Pipeline Executado', // Assunto
    text: 'O pipeline foi executado com sucesso!', // corpo do e-mail
  });

  console.log('Mensagem enviada: %s', info.messageId);
}

main().catch(console.error);
