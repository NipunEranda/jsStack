const express = require('express');
const user = require('./routes/user');
const cors = require('cors');
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const config = require('./config');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BeePLUS User Management API",
            version: "1.0.0",
            description: "BeePLUS User Management API Swagger Documentation",
        },
        servers: [{
            url: "http://" + config.hostIP + ":" + +config.hostPORT + "/user",
        }, ],
    },
    apis: ["./routes/*.js"]
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//Register /user route
app.use('/user', user)

//Initialization error handle
app.use((err, res) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });
    return;
});

//export the app
module.exports = app