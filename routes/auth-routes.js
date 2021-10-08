const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    res.status(400).json({ errorMessage: "Fill username and password" });
    return;
  }

  const user = await User.findOne({ username });
  if (user !== null) {
    //found the user, it already exists
    res.status(400).json({ errorMessage: "User already exists" });
    return;
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const newUser = await User.create({
    username,
    password: hashedPassword,
  });
  res.status(200).json(newUser);
});

//GOOGLE LOGIN
const passport = require("passport");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }
    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }
    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout();
  res.status(200).json("logout success");
});

router.get("/isloggedin", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(200).json({});
});

//Route that will be called from our front-end
//For google authentication
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

//Route that will be called from the google servers
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_HOSTNAME}/projects`,
    failureRedirect: `${process.env.CLIENT_HOSTNAME}/login`,
  })
);

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    res.status(400).json({ errorMessage: "Fill username and password" });
    return;
  }
  const user = await User.findOne({ username });
  if (user === null) {
    res.status(401).json({ errorMessage: "Invalid login" });
    return;
  }

  if (bcrypt.compareSync(password, user.password)) {
    //passwords match - login successful
    req.session.currentUser = user;
    res.status(200).json(user);
  } else {
    res.status(401).json({ errorMessage: "Invalid login" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({message: "user logged out"});
});

router.get("/isloggedin", (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(200).json({});
  }
});

module.exports = router;
