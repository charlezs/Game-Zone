const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

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

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/uploads", express.static("uploads"));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});


// =========================================================

const multer = require('multer');
const fs = require("fs");
const cloudinary = require('cloudinary').v2

// Multer setup
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});

cloudinary.config({
    cloud_name: 'vjchblog',
    api_key: '716937511967295',
    api_secret: 'xLr30LmdJkY4EeNjCUeyp47fAbk'
});
if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

var upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } });
//const upload = multer({ dest: 'uploads/' });

async function uploadToCloudinary(locaFilePath) {
    var mainFolderName = "main";

    var filePathOnCloudinary =
        mainFolderName + "/" + locaFilePath;

    return cloudinary.uploader
        .upload(locaFilePath)
        .then((result) => {
            fs.unlinkSync(locaFilePath);

            return {
                message: "Success",
                url: result.url,
            };
        })
        .catch((error) => {

            // Remove file from local uploads folder
            fs.unlinkSync(locaFilePath);
            return { message: "Fail" };
        });
}

function buildSuccessMsg(urlList) {

    // Building success msg to display on screen
    var response = `<h1>
                   <a href="/">Click to go to Home page</a><br>
                  </h1><hr>`;
    for (var i = 0; i < urlList.length; i++) {
        response += "File uploaded successfully.<br><br>";
        response += `FILE URL: <a href="${urlList[i]}">
                    ${urlList[i]}</a>.<br><br>`;
        response += `<img src="${urlList[i]}" width="200" height="200"/><br><hr>`;
    }

    response += `<br>
<p>Now you can store this url in database or 
  // do anything with it  based on use case.</p>
`;
    return response;
}


app.post(
    "/profile-upload-single",
    upload.single('profile-file'),
    async(req, res, next) => {
        console.log(JSON.stringify(req.file));
        var locaFilePath = req.file.path;
        var result = await uploadToCloudinary(locaFilePath);
        var response = buildSuccessMsg([result.url]);
        return res.send(response);
    }
);