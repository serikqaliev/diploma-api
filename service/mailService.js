const nodemailer = require("nodemailer");
const config = require("config");

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || config.get("smtpHost"),
            port: process.env.SMTP_PORT || config.get("smtpPort"),
            secure: false,
            auth: {
                user: process.env.SMTP_USER || config.get("smtpUser"),
                pass: process.env.SMTP_PASSWORD || config.get("smtpPassword")
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER || config.get("smtpUser"),
            to,
            subject: "Активация аккаунта на сайте " + process.env.API_URL || config.get("apiUrl"),
            text: "",
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new MailService();