"use strict";

const express    = require("express");
const router     = express.Router();
const bank    = require("../src/internetbanken.js");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false});

router.get("/index", (req, res) => {
    let data = {
        title: "Welcome to the internetbank"
    };

    res.render("bankIndex/index", data);
});

router.get("/register", (req, res) => {
    let data = {
        title: "Register To Internetbanken"
    };

    res.render("bankIndex/register", data);
});

router.get("/login", (req, res) => {
    let data = {
        title: "Login to Internetbanken"
    };

    res.render("bankIndex/login", data);
});

router.get("/dashboard", (req, res) => {
    let data = {
        title: "Dashboard"
    };

    res.render("bankIndex/dashboard", data);
});

router.get("/accounts", (req, res) => {
    let data = {
        title: "Viewing accounts for user ID"
    };

    res.render("bankIndex/accounts", data);
});

router.get("/swish", (req, res) => {
    let data = {
        title: "Swish App"
    };

    res.render("bankIndex/swishapp", data);
});

module.exports = router;
