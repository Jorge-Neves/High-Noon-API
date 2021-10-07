// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const session = require("express-session");
app.set("trust proxy", 1); 
//Security requirements from heroku
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      sameSite: false, //both fe and be are running on the same hostname
      httpOnly: false, //we are not using https
      maxAge: 60000000000000, //session time
    },
    rolling: true,
  })
);

//GOOGLE LOGIN
require("./config/passport");
const passport = require("passport");

//Initializes passport
app.use(passport.initialize());
//Initializes passport session
app.use(passport.session());




function getCurrentLoggedUser(req, res, next) {
  if (req.session && req.session.currentUser) {
      app.locals.loggedInUser = req.session.currentUser.username; //local variable from express
  } else { 
      app.locals.loggedInUser = "";

  }
  next(); //so we can leave the middleware
}

app.use(getCurrentLoggedUser);

// default value for title local
const projectName = "High-Noon_API";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const task = require("./routes/tasks");
app.use("/", task);

const skills = require("./routes/skills");
app.use("/", skills);

const habits = require("./routes/habits");
app.use("/", habits);

const auth = require("./routes/auth-routes");
app.use("/", auth);

const graphs = require("./routes/Graphs");
app.use("/", graphs);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
