"use strict";

const port    = process.env.DBWEBB_PORT || 1337;
const path    = require("path");
const express = require ("express");
const session = require("express-session");
const app     = express();
const routeIndex = require("./route/internetbanken.js");
const middleware = require("./middleware/index.js");

app.set("view engine", "ejs");

app.use(session({
    secret : "internetbanken",
    resave: false,
    saveUninitialized: true
}));

app.use(middleware.logIncomingToConsole);
app.use(express.static(path.join(__dirname, "public")));
app.use(/^\/(?!user\/login).*/, middleware.authenticatedOrLogin);
app.use("/bank", routeIndex);
app.listen(port, logStartUpDetailsToConsole);

function logStartUpDetailsToConsole() {
    let routes = [];

    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            routes.push(middleware.route);
        } else if (middleware.name === "router") {
            middleware.handle.stack.forEach((handler) => {
                let route;

                route = handler.route;
                route && routes.push(route);
            });
        }
    });

    console.info(`Server is listening on port ${port}.`);
    console.info("Available routes are:");
    console.info(routes);
}
