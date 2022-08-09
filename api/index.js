const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require('express-session');
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const teamsRoute = require("./routes/teams");
const messageRoute = require("./routes/messages");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require("path");
const passport = require('passport');
const flash = require('express-flash');
const methodOverride = require('method-override');

if (porcess.env.NODE_ENV !== 'production'){
  dotenv.config();
}

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: process.env.COOKIE_KEY
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

const mongoURL = process.env.MONGO_URL

mongoose.connect(
  mongoURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

// app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
// app.use(helmet());
// app.use(morgan("common"));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/teams", teamsRoute);
app.use("/api/messages", messageRoute);

app.listen(5000, () => {
  console.log("Api Server Running!!");
});
