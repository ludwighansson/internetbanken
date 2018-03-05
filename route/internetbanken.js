"use strict";

const express    = require("express");
const router     = express.Router();
const skolan2    = require("../src/internetbanken.js");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false});

router.get("/index", (req, res) => {
    let data = {
        title: "Welcome to the internetbank"
    };

    res.render("bankIndex/index", data);
});

module.exports = router;
