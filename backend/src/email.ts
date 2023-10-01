import * as nodemailer from 'nodemailer'



// const html = `<p>ГИ-ги, Га-га</p>
//     <h1 style="color: blue;">Ваш код: 322093</h1>
// `;

async function sendMail(html : string, mail : string) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465, 
        secure: true,
        auth:{
            user: 'dragonofdead93@gmail.com',
            pass: 'reirjntepjfpoiud'
        }
    })
    

    const info = await transporter.sendMail({
        from: 'Vitia <project@Vitia.com>',
        to: mail,
        subject: 'Test',
        html: html,
    })


    console.log('Message send:' + info.messageId)
}
  


export default sendMail