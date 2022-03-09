const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const fs = require("fs");

//const bodyParser = require("body-parser");
///const fileUpload = require('express-fileupload')

//const bodyParser = require("body-parser");

//const fileupload = require("express-fileupload");

//const fileUpload = multer();
const app = express();
const PORT = process.env.PORT || 3001;
//app.use(fileupload());

//const streamifier = require('streamifier')
//const Formidable = require('formidable');
const sequelize = require("./config/connection");
//app.use(bodyParser.json());
const SequelizeStore = require('connect-session-sequelize')(session.Store);
//app.use(fileUpload());
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// require('dotenv').config();
// key = "716937511967295";
//const cloudinary = require('cloudinary').v2;
app.use(session(sess));

//const upload = multer({ dest: 'uploads/' });

const helpers = require('./utils/helpers');

const sequelize = require("./config/connection");
//app.use(bodyParser.json());
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const helpers = require('./utils/helper');
const hbs = exphbs.create({ helpers });


app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static("uploads"));

app.use(require('./controllers/'));

//veedit's image upload
if (!fs.existsSync("../../uploads")) {
    fs.mkdirSync("../../uploads");
}

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});