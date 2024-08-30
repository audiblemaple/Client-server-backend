const nodemailer = require('nodemailer');
const pug = require('pug');
const {htmlToText} = require('html-to-text');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.username = user.username;
        this.url = url;
        this.query_subject = user.query_subject;
        this.message = user.message;
        this.from = `MarketPath <${process.env.EMAIL_FROM}>`;
    }

    newTransport() { // TODO: in userController signup, to uncomment the Email send action
        return nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD,
            }
        })
    }

    // send the actual email 
    async send(template, subject) {
        // 1. Render HTML based on a pug template
        const html = pug.renderFile(
            `${__dirname}/../views/emails/${template}.pug`, 
            {
                username: this.username,
                url: this.url,
                query_subject: this.query_subject,
                message: this.message,
                subject,
            }
        );

        // 2. define the email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText(html)
        };

        // 3. create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send(
            'welcome', 
            'Welcome to our MarketPath App!'
            );
    }

    async sendContactUs() {
        await this.send(
            'contactUs',
            'Thank You for Contacting Us! We Have Received Your Message'
        )
    }

    // async sendPasswordReset() {
    //     await this.send(
    //         'passwordReset', 
    //         'Solid Clock - Your password reset token (valid only for 30 minutes)'
    //     );
    // }
};
