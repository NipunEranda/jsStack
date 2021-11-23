const config = require('./config');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

//Function to send the response
function sendResponse(res, status, data_value, err_value) {
    res.status(status);
    res.json({ data: data_value, error: err_value });
}

//Function to process MYSQL Procedure outputs
function processProcedureOutput(res, result, err_output) {
    if (result.data.rows.length < 3) {
        if (result.data.rows[1][0].output == 1) {
            return sendProcedureOutputData("success", 200, null);
        } else {
            return sendProcedureOutputData("fail", 400, err_output);
        }
    } else {
        return sendProcedureOutputData("fail", 400, result.data.rows[0][0].message);
    }
}

//Function to structure procedure outputs
function sendProcedureOutputData(data, code, error) {
    return {
        "data": data,
        "code": code,
        "error": error
    };
}

//Function to send Mails
function sendEmail(req, subject, body) {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            secureConnection: false,
            port: 587,
            tls: {
                ciphers: 'SSLv3'
            },
            auth: {
                user: config.emailUser,
                pass: config.emailPw
            },
        });

        let mailOptions = {
            from: 'beeplus.softwarendcreative@outlook.com',
            to: req.body.email,
            subject: subject,
            html: body
        };

        transporter.sendMail(mailOptions, function(err, success) {
            if (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
}

//Function to generate a random string to a given character count
function generateString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

//Function to compare User Passwords
const comparePassword = async(password, hash) => {
    try {
        if (await bcrypt.compare(password, hash)) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err.getMessage);
    }
}

//Function to verify the token passed to the server
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        next();
    } else {
        sendResponse(res, 403, null, "Access Denied");
    }
}

//FUnction to verify user and check for access permissions
function verifyUser(req, accessList) {
    const data = jwt.verify(req.token, config.secret);
    if (accessList.includes(data.user.roleId)) {
        return data;
    } else {
        return null;
    }
}

//Function to select an email template for the subject and body sections
function getEmailTemplate(option, data) {
    let format = '';
    switch (option) {
        case 1:
            format = {
                subject: 'Email Confirmation for BeePlus User Account.',
                body: '<html lang="en">' +
                    '<head>' +
                    '<title>Confirm User Account</title>' +
                    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
                    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
                    '<meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
                    '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />' +
                    '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.bundle.min.js">' +
                    '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>' +
                    '<style type="text/css">' +
                    '@media screen {' +
                    '@font-face {' +
                    'font-family: "Lato";' +
                    'font-style: normal;' +
                    'font-weight: 400;' +
                    'src: local("Lato Regular"), local("Lato-Regular"), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format("woff");}' +
                    '@font-face {' +
                    'font-family: "Lato";' +
                    'font-style: normal;' +
                    'font-weight: 700;' +
                    'src: local("Lato Bold"), local("Lato-Bold"), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format("woff");}' +
                    '@font-face {' +
                    'font-family: "Lato";' +
                    'font-style: italic;' +
                    'font-weight: 400;' +
                    'src: local("Lato Italic"), local("Lato-Italic"), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format("woff");}' +
                    '@font-face {' +
                    'font-family: "Lato";' +
                    'font-style: italic;' +
                    'font-weight: 700;' +
                    'src: local("Lato Bold Italic"), local("Lato-BoldItalic"), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format("woff");}}' +
                    'body,' +
                    'table,' +
                    'td,' +
                    'a {' +
                    '-webkit-text-size-adjust: 100%;' +
                    '-ms-text-size-adjust: 100%;' +
                    '}' +

                    'table,' +
                    'td {' +
                    'mso-table-lspace: 0pt;' +
                    'mso-table-rspace: 0pt;' +
                    '}' +

                    'img {' +
                    '-ms-interpolation-mode: bicubic;' +
                    '}' +

                    'img {' +
                    'border: 0;' +
                    'height: auto;' +
                    'line-height: 100%;' +
                    'outline: none;' +
                    'text-decoration: none;' +
                    '}' +

                    'table {' +
                    'border-collapse: collapse !important;' +
                    '}' +

                    'body {' +
                    'height: 100% !important;' +
                    'margin: 0 !important;' +
                    'padding: 0 !important;' +
                    'width: 100% !important;' +
                    '}' +

                    'a[x-apple-data-detectors] {' +
                    'color: inherit !important;' +
                    'text-decoration: none !important;' +
                    'font-size: inherit !important;' +
                    'font-family: inherit !important;' +
                    'font-weight: inherit !important;' +
                    'line-height: inherit !important;' +
                    '}' +

                    '@media screen and (max-width:600px) {' +
                    'h1 {' +
                    'font-size: 32px !important;' +
                    'line-height: 32px !important;' +
                    '}' +
                    '}' +

                    'div[style*="margin: 16px 0;"] {' +
                    'margin: 0 !important;' +
                    '}' +
                    '</style></head>' +

                    '<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">' +
                    '<!-- HIDDEN PREHEADER TEXT -->' +
                    '<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: "Lato", Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We\'re thrilled to have you here! Get ready to dive into your new account. </div>' +
                    '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
                    '<!-- LOGO -->' +
                    '<tr>' +
                    '<td bgcolor="#FFA73B" align="center">' +
                    '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
                    '<tr>' +
                    '<td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>' +
                    '</tr>' +
                    '</table>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">' +
                    '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
                    '<tr>' +
                    '<td bgcolor="#ffffff" align="center" valign="top" style="padding: 100px 50px 50px 50px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: "Lato", Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">' +
                    '<h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />' +
                    '</td>' +
                    '</tr>' +
                    '</table>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">' +
                    '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
                    '<tr>' +
                    '<td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: "Lato", Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
                    '<p style="margin:0;text-align:center;padding-left:20px;padding-right:20px">We\'re excited to have you get started. First, you need to confirm your account. Just press the button below.</p>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td bgcolor="#ffffff" align="left">' +
                    '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
                    '<tr>' +
                    '<td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">' +
                    '<table border="0" cellspacing="0" cellpadding="0">' +
                    '<tr>' +
                    '<td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="http://' + config.hostIP + ':5000/user/confirmUser/' + data.code + '" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm Account</a></td>' +
                    '</tr>' +
                    '</table>' +
                    '</td>' +
                    '</tr>' +
                    '</table>' +
                    '</td>' +
                    '</tr>' +
                    '<!-- COPY -->' +
                    '<tr>' +
                    '<td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: "Lato", Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
                    '<p style="margin:0;text-align:center;padding-left:20px;padding-right:20px">If that doesn\'t work, copy and paste the following link in your browser:</p>' +
                    '</td>' +
                    '</tr>' +
                    '<!-- COPY -->' +
                    '<tr>' +
                    '<td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: "Lato", Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
                    '<p style="margin:0;text-align:center;padding-left:20px;padding-right:20px"><a href="http://' + config.hostIP + ':5000/user/confirmUser/' + data.code + '" target="_blank" style="color: #FFA73B;">http://' + config.hostIP + ':5000/user/confirmUser/' + data.code + '</a></p>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: "Lato", Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
                    '<p style="margin:0;text-align:center;padding-left:20px;padding-right:20px">If you have any questions, just reply to this email. <br/>we\'re always happy to help out.</p>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: "Lato", Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
                    '<p style="margin:0;text-align:center;padding-left:20px;padding-right:20px">Cheers,<br>BeePLUS Team</p>' +
                    '</td>' +
                    '</tr>' +
                    '</table>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">' +
                    '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
                    '<tr>' +
                    '<td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: "Lato", Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">' +
                    '<h2 style="font-size: 20px; font-weight: 400; color: #111111; margin:0;text-align:center;padding:30px 30px 30px 30px;">Need more help?</h2>' +
                    '<p style="margin:0;text-align:center;padding:30px 30px 30px 30px;"><a href="mailto:' + config.emailUser + '" target="_blank" style="color: #FFA73B;">We&rsquo;re here to help you out</a></p>' +
                    '</td>' +
                    '</tr>' +
                    '</table>' +
                    '</td>' +
                    '</tr>' +
                    '</table>' +
                    '</body>' +

                    '</html>'
            };
            return format;
        case 2:
            format = {
                subject: 'New Password For the User',
                body: '<div style="margin:auto;text-align:center;left:50%;right:50%;float:none;border:0.5px;border-color:black;border-style: solid;width:50%;padding:20px;color:black;">' +
                    '<h1>BeePLUS New User Password</h1>' +
                    '<h4>Please use the following security password to login and reset to your new password.</h4><br/>' +
                    '<div><label style="font-size:25px">' + data.code + '</label></div></div>'
            };
            return format;
        default:
            break;
    }
}

//Exports list
module.exports = {
    sendResponse,
    generateString,
    comparePassword,
    processProcedureOutput,
    verifyToken,
    verifyUser,
    sendEmail,
    getEmailTemplate
}