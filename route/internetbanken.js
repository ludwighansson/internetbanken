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

router.post("/register", urlencodedParser, async (req, res) => {
    await bank.registerKund(req.body.fornamn, req.body.efternamn, req.body.fodd,
      req.body.adress, req.body.ort, req.body.pinkod);
      res.redirect("/bank/register/complete");
});

router.get("/register/complete", (req, res) => {
    let data = {
        title: "Register Complete"
    };

    res.render("bankIndex/register-complete", data);
});

router.post("/register/complete", urlencodedParser, async (req, res) => {
      res.redirect("/bank/login");
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

router.get("/accounts/:id", async (req, res) => {
    let id = req.params.id;
    let data = {
        title: "Viewing accounts for user ID",
        customer: id
        };

    data.res = await bank.showCustomer(id);

    res.render("bankIndex/accounts", data);
});

router.get("/swish", (req, res) => {
    let data = {
        title: "Swish App"
    };

    res.render("bankIndex/swishapp", data);
});

module.exports = router;
