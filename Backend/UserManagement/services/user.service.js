const helper = require('../helper');
const config = require('../config');
const e = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function loginUser(req, res) {
    try {
        var result = await config.executeQuery('SELECT * FROM usr_Login where email = "' + req.body.email + '"');
        const password = req.body.password;
        if (result.data.rows.length > 0) {
            const hash = result.data.rows[0].password;
            const comparePassword = async function(password, hash) {
                try {
                    if (await bcrypt.compare(password, hash)) {
                        let data = {
                            userId: result.data.rows[0].userId,
                            email: result.data.rows[0].email,
                            roleId: result.data.rows[0].roleId,
                            isConfirmed: result.data.rows[0].isConfirmed
                        }
                        jwt.sign({ user: data }, config.secret, { expiresIn: config.tokenExpireAfter }, (err, token) => {
                            helper.sendResponse(res, 200, { token: token }, null);
                        });
                    } else {
                        helper.sendResponse(res, 400, null, "Credentials are invalid.");
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            await comparePassword(password, hash);
        } else {
            helper.sendResponse(res, 400, null, "Credentials doesn't exist");
        }
    } catch (err) {
        console.log(err);
        helper.sendResponse(res, 500, null, err);
    }
}

async function registerUser(req, res) {
    try {
        //Generate Confirmation code
        let code = helper.generateString(6);
        encryptedPassword = await bcrypt.hash(req.body.password, 10);
        var result = await config.executeQuery('CALL customer_Registration("' + req.body.firstName + '", "' + req.body.lastName + '", "' + req.body.dob + '", "' + req.body.phoneNo + '", "' + req.body.gender + '", "' + req.body.address + '", "' + req.body.email + '", "' + encryptedPassword + '", 2, "' + code + '", @output); SELECT @output as output;');
        const output = helper.processProcedureOutput(res, result, "Something went wrong in registration.");
        if (output.code == 200) {
            //Send the generated code via mail
            helper.sendEmail(req, helper.getEmailTemplate(1, { code: req.body.email + '+' + code }).subject, helper.getEmailTemplate(1, { code: req.body.email + '+' + code }).body);
        }
        helper.sendResponse(res, output.code, output.data, output.error);
    } catch (err) {
        helper.sendResponse(res, 500, null, err);
    }
}

async function removeUser(id, res) {
    try {
        var result = await config.executeQuery('CALL customer_deleteCustomer("' + id + '", @output); SELECT @output as output;');
        const output = helper.processProcedureOutput(res, result, "Something went wrong in remove user.");
        helper.sendResponse(res, output.code, output.data, output.error);
    } catch (err) {
        helper.sendResponse(res, 500, null, err);
    }
}

async function updateUser(req, res) {
    try {
        var result = await config.executeQuery('CALL user_updateUserDetails("' + req.body.firstName + '", "' + req.body.lastName + '", "' + req.body.dob + '", "' + req.body.phoneNo + '", "' + req.body.gender + '", "' + req.body.address + '", "' + req.body.id + '", @output); SELECT @output as output;');
        const output = helper.processProcedureOutput(res, result, "Something went wrong in update user.");
        helper.sendResponse(res, output.code, output.data, output.error);
    } catch (err) {
        helper.sendResponse(res, 500, null, err);
    }
}

async function changeUserPassword(req, res) {
    try {
        encryptedPassword = await bcrypt.hash(req.body.password, 10);
        var result = await config.executeQuery('CALL user_changePassword("' + encryptedPassword + '", "' + req.body.email + '", @output); SELECT @output as output;');
        const output = helper.processProcedureOutput(res, result, "Something went wrong in change user password.");
        helper.sendResponse(res, output.code, output.data, output.error);
    } catch (err) {
        helper.sendResponse(res, 500, null, err);
    }
}

async function forgotUserPassword(req, res) {
    try {
        //Check if the email exists or not
        var result = await config.executeQuery('SELECT userId FROM usr_Login WHERE email = "' + req.body.email + '"');

        //Create a new password using code generator
        const code = helper.generateString(10);
        encryptedPassword = await bcrypt.hash(code, 10);

        //Send the generated code via email
        helper.sendEmail(req, helper.getEmailTemplate(2, { code: code }).subject, helper.getEmailTemplate(2, { code: code }).body);

        //Update the password
        var result = await config.executeQuery('CALL user_forgotPassword("' + encryptedPassword + '", "' + result.data.rows[0].userId + '", @output); SELECT @output as output;');

        const output = helper.processProcedureOutput(res, result, "Something went wrong in forgot user password.");
        helper.sendResponse(res, output.code, output.data, output.error);
    } catch (err) {
        helper.sendResponse(res, 500, null, err);
    }
}

async function confirmUser(data, res) {
    try {
        const email = data.split("~")[0];
        const code = data.split("~")[1];
        var result = await config.executeQuery('SELECT userId FROM usr_Login WHERE email = "' + email + '" AND confirmationCode = "' + code + '"');
        if (result.data.rows.length > 0) {
            result = await config.executeQuery('UPDATE usr_Login SET isConfirmed=1 WHERE email = "' + email + '" AND confirmationCode = "' + code + '"');
            if (result.data.rows.affectedRows == 1) {
                helper.sendResponse(res, 200, "Success", null);
            } else {
                helper.sendResponse(res, 400, null, null);
            }
        } else {
            helper.sendResponse(res, 400, null, "Credentials doesn't exist");
        }
    } catch (err) {
        helper.sendResponse(res, 500, null, err);
    }
}

async function getUserDetails(id, res) {
    try {
        var result = await config.executeQuery('SELECT * FROM usr_User WHERE id = ' + id);
        if (result.data.rows.length > 0) {
            helper.sendResponse(res, 200, result.data.rows[0], null);
        } else {
            helper.sendResponse(res, 400, null, "User doesn't exist.");
        }
    } catch (err) {
        helper.sendResponse(res, 500, null, err);
    }
}

module.exports = {
    loginUser,
    registerUser,
    removeUser,
    updateUser,
    changeUserPassword,
    forgotUserPassword,
    confirmUser,
    getUserDetails
}