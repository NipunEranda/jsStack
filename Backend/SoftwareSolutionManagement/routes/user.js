const express = require('express');
const helper = require('../helper');
const router = express.Router();
const config = require('../config');
const jwt = require('jsonwebtoken');

const userService = require('../services/user.service');

/**
 * @swagger
 * components:
 * 
 *   securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 * 
 *   schemas:
 * 
 *     DefaultResponseSuccess:
 *       type: object
 *       example:
 *         data: "success"
 *         error: null
 * 
 *     DefaultResponseFail:
 *       type: object
 *       example:
 *         data: null
 *         error : null or error message
 * 
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *       example:
 *         email: "test@gmail.com"
 *         password: "1234"
 * 
 *     LoginResponseSuccess:
 *       type: object
 *       example:
 *         data: {
 *            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MjksImVtYWlsIjoibmFtYXJhc2VrYXJhNzFAZ21haWwuY29tIiwicm9sZUlkIjoyLCJpc0NvbmZpcm1lZCI6MX0sImlhdCI6MTYzNzA1MTA4NSwiZXhwIjoxNjM3MDY5MDg1fQ.QVEjodm7tnFtCSXdw7EPDgxyni4Y541K7UqGKGyTGiA"
 *          }
 *         error : null
 * 
 *     LoginResponseFail:
 *       type: object
 *       example:
 *         data: null
 *         error : null
 * 
 * 
 *     RegistrationRequest:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - dob
 *         - phoneNo
 *         - gender
 *         - address
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name of the user
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *         dob:
 *           type: string
 *           description: Date of birth of the user
 *         phoneNo:
 *           type: string
 *           description: Phone number of the user
 *         gender:
 *           type: string
 *           description: Gender of the user
 *         address:
 *           type: string
 *           description: Address of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *       example:
 *         firstName: "Test"
 *         lastName: "Test"
 *         dob: "1998-11-25"
 *         phoneNo: "+94770524366"
 *         gender: "M"
 *         address: "Colombo"
 *         email: "test@gmail.com"
 *         password: "1234"
 * 
 *     RegistrationResponseSuccess:
 *       type: object
 *       example:
 *         data: "success"
 *         error: null
 * 
 *     RegistrationResponseFail:
 *       type: object
 *       example:
 *         "data": "fail"
 *         "error": "Duplicate key occurred"
 *
 *     UserUpdateRequest:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - dob
 *         - phoneNo
 *         - gender
 *         - address
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name of the user
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *         dob:
 *           type: string
 *           description: Date of birth of the user
 *         phoneNo:
 *           type: string
 *           description: Phone number of the user
 *         gender:
 *           type: string
 *           description: Gender of the user
 *         address:
 *           type: string
 *           description: Address of the user
 *       example:
 *         firstName: "Test"
 *         lastName: "Test"
 *         dob: "1998-11-25"
 *         phoneNo: "+94770524366"
 *         gender: "M"
 *         address: "Colombo"
 * 
 *
 *     ChangeUserPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: New password of the user
 *       example:
 *         email: "test@gmail.com"
 *         password: "4321"
 * 
 * 
 *     ForgotPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user
 *       example:
 *         email: "test@gmail.com"
 * 
 *     ConfirmUserRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user
 *       example:
 *         email: "test@gmail.com"
 * 
 *     UserDetailsResponseSuccess:
 *       type: object
 *       example:
 *         data: 
 *              id: 34
 *              fname: Nipun
 *              lname: Amarasekara
 *              dob: 1998-11-24T18:00:00.000Z
 *              phoneNo: "0770415266"
 *              gender: M
 *              address: 24/F, Dewata Rd, Kandegoda, Ambalangoda
 *              isActive: 1
 *              isDelete: 0
 *         error: null
 *      
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login to the system
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponseSuccess'
 *       400:
 *         description: Credentials are invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponseFail'
 *       500:
 *         description: Some server error
 */

router.post('/login', async function(req, res) {
    userService.loginUser(req, res);
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register user to the system
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistrationRequest'
 *     responses:
 *       200:
 *         description: Registered successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationResponseSuccess'
 *       400:
 *         description: Credentials are invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationResponseFail'
 *       500:
 *         description: Some server error
 */
router.post('/register', async function(req, res) {
    userService.registerUser(req, res);
});

/**
 * @swagger
 * /deleteUser:
 *   delete:
 *     summary: Remove a user from the system
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultResponseSuccess'
 *       400:
 *         description: Error message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultResponseFail'
 *       500:
 *         description: Some server error
 */
router.delete('/deleteUser', helper.verifyToken, async function(req, res) {
    accessList = [1, 2];
    const data = helper.verifyUser(req, accessList);
    if (data) {
        userService.removeUser(data.user.userId, res);
    } else {
        helper.sendResponse(res, 500, null, "Access Denied");
    }
});

/**
 * @swagger
 * /updateUser:
 *   put:
 *     summary: Update user details in the system
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateRequest'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultResponseSuccess'
 *       400:
 *         description: Error message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultResponseFail'
 *       500:
 *         description: Some server error
 */
router.put('/updateUser', helper.verifyToken, async function(req, res) {
    accessList = [1, 2];
    const data = helper.verifyUser(req, accessList);
    if (data) {
        req.body.id = data.user.userId;
        userService.updateUser(req, res);
    } else {
        helper.sendResponse(res, 500, null, "Access Denied");
    }
});

/**
 * @swagger
 * /changePassword:
 *   put:
 *     summary: Change user password in the system
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangeUserPasswordRequest'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultResponseSuccess'
 *       400:
 *         description: Error message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultResponseFail'
 *       500:
 *         description: Some server error
 */
router.put('/changePassword', helper.verifyToken, async function(req, res) {
    accessList = [1, 2];
    const data = helper.verifyUser(req, accessList);
    if (data) {
        userService.changeUserPassword(req, res);
    } else {
        helper.sendResponse(res, 500, null, "Access Denied");
    }
});

/**
 * @swagger
 * /forgotPassword:
 *   put:
 *     summary: Forgot password in the system
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       200:
 *         description: Password Reset successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultResponseSuccess'
 *       400:
 *         description: Error message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultResponseFail'
 *       500:
 *         description: Some server error
 */
router.put('/forgotPassword', async function(req, res) {
    userService.forgotUserPassword(req, res);
});

/**
 * @swagger
 * /confirmUser/{data}:
 *   get:
 *     summary: Confirm password of the user
 *     tags: [User]
 *     parameters:
 *       - name: data
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: String data of the user email and confirmation code( Eg - email,confirmationCode )
 *     responses:
 *       200:
 *         description: Password Reset successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultResponseSuccess'
 *       400:
 *         description: Error message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultResponseFail'
 *       500:
 *         description: Some server error
 */
router.get('/confirmUser/:data', async function(req, res) {
    userService.confirmUser(req.params.data, res);
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetailsResponseSuccess'
 *       400:
 *         description: Error message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultResponseFail'
 *       500:
 *         description: Some server error
 */
router.get('/', helper.verifyToken, async function(req, res) {
    accessList = [1, 2];
    const data = helper.verifyUser(req, accessList);
    if (data) {
        req.body.id = data.user.userId;
        userService.getUserDetails(req.body.id, res);
    } else {
        helper.sendResponse(res, 500, null, "Access Denied");
    }
});

router.get("/accountConfirmed", async function(req, res) {
    res.sendFile(__dirname + '/views/accountConfirmed.html');
});

module.exports = router;