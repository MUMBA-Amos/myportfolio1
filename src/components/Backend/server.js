require('dotenv').config({ path: 'C:/Users/Mumba Ntambo/Documents/GitHub/portfolio/.env' });


const express = require("express");
const cors = require("cors");
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(cors());
app.use(express.json());

console.log("SendGrid API Key:", process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/send-email", (req, res) => {
    const { name, email, phone, message } = req.body;

    const msg = {
        to: 'mumbantambo@gmail.com', // Your email where you want to receive the inquiries
        from: 'mumbantambo@gmail.com', // Verified SendGrid sender or your Gmail address
        subject: `New message from ${name}`,
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}
        `,
    };

    sgMail.send(msg)
        .then(() => {
            console.log('Email sent');
            res.send({ success: true, message: "Email sent successfully!" });
        })
        .catch((error) => {
            console.error("SendGrid Error:", error);
            res.status(500).send({ success: false, message: "Email failed to send." });
        });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
