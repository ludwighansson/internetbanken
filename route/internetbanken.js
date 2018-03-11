"use strict";

const express          = require("express");
const router           = express.Router();
const bank             = require("../src/internetbanken.js");
const bodyParser       = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false});
const user             = require("../src/user.js");

router.get("/index", (req, res) => {
    let data = {
        title: "Welcome to the internetbank",
        user: req.session.kundID || null
    };

    res.render("bankIndex/index", data);
});

router.get("/management", (req, res) => {
    let data = {
        title: "Welcome to the internetbank",
        user: req.session.kundID || null
    };

    res.render("bankIndex/management", data);
});

router.get("/customerList", async (req, res) => {
    let data = {
        title: "Våra kunder",
        user: req.session.kundID || null
    };

    data.res = await bank.customerList();

    res.render("bankIndex/customerList", data);
})

router.get("/register", (req, res) => {
    let data = {
        title: "Register To Internetbanken",
        user: req.session.kundID || null
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
        title: "Register Complete",
        user: req.session.kundID || null
    };

    res.render("bankIndex/register-complete", data);
});

router.post("/register/complete", urlencodedParser, async (req, res) => {
      res.redirect("/bank/login");
});

router.get("/login", (req, res) => {
    let data = {
        title: "Login to Internetbanken",
        user: req.session.kundID || null
    };

    res.render("user/login", data);
});


router.post("/login", urlencodedParser, async (req, res) => {
    let result = await user.login(req.body.kundID, req.body.pinkod);

    if (result && result[0] && result[0].kundID) {
        console.info(`Inloggning lyckades, användare ${result[0].kundID} är inloggad.`);
        req.session.kundID = result[0].kundID;
    }
    console.log(result);
    res.redirect("/bank/index");
});

router.get("/logout", (req, res) => {
    let data = {
        title: "Logga ut från Internetbanken",
        user: req.session.kundID || null
    };

    res.render("user/logout", data);
});

router.post("/logout", (req, res) => {
    console.info(`Logging out user '${req.session.kundID}'.`);
    delete req.session.kundID;

    res.redirect("/bank/login");
});


router.get("/dashboard", async (req, res) => {
    let id = req.session.kundID;
    console.log(id);
    let data = {
        title: "Viewing accounts for user ID",
        user: req.session.kundID || null,
        customer: id
    };

    data.res = await bank.showCustomer(id);

    res.render("bankIndex/dashboard", data);
});

router.get("/accounts", async (req, res) => {
    let id = req.session.kundID;
    let data = {
        title: "Viewing accounts for user ID",
        user: req.session.kundID || null,
        customer: id
    };

    data.res = await bank.showCustomer(id);

    res.render("bankIndex/accounts", data);
});

router.get("/transfer-money/:id", async (req, res) => {
    let id = req.params.id;
    let userID = req.session.kundID;
    let data = {
        title: "Viewing accounts for user ID",
        user: req.session.kundID || null,
        accID: id
    };

    data.res = await bank.showCustomer(userID);
    data.id = id;

    res.render("bankIndex/transfer-money", data);
});

router.post("/transfer-money/:id", urlencodedParser, async (req, res) => {
    await bank.transferMoney(req.body.ownId, req.body.idBankkonto, req.body.amount);

    res.redirect("/bank/accounts");
});

router.get("/swish", (req, res) => {
    let data = {
        title: "Swish App",
        user: req.session.kundID || null
    };

    res.render("bankIndex/swishapp", data);
});

module.exports = router;
