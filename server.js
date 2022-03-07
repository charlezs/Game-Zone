const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

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

// //For image upload
// if (!fs.existsSync("./uploads")) {
//     fs.mkdirSync("./uploads");
// }

// // Multer setup
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./uploads");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });
// const cloudinary = require('cloudinary').v2
// cloudinary.config({
//     cloud_name: 'vjchblog',
//     api_key: '716937511967295',
//     api_secret: 'xLr30LmdJkY4EeNjCUeyp47fAbk'
// });

// var upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } });

// async function uploadToCloudinary(locaFilePath) {
//     var mainFolderName = "main";

//     var filePathOnCloudinary =
//         mainFolderName + "/" + locaFilePath;

//     return cloudinary.uploader
//         .upload(locaFilePath)
//         .then((result) => {
//             fs.unlinkSync(locaFilePath);
//             console.log("=======================");
//             console.log(result);
//             return {
//                 message: "Success",
//                 url: result.url,
//             };
//         })
//         .catch((error) => {

//             // Remove file from local uploads folder
//             fs.unlinkSync(locaFilePath);
//             return { message: "Fail" };
//         });
// }

// function buildSuccessMsg(urlList) {

//     // Building success msg to display on screen
//     var response = `<h1>
//                    <a href="/">Click to go to Home page</a><br>
//                   </h1><hr>`;
//     for (var i = 0; i < urlList.length; i++) {
//         response += "File uploaded successfully.<br><br>";
//         response += `FILE URL: <a href="${urlList[i]}">
//                     ${urlList[i]}</a>.<br><br>`;
//         response += `<img src="${urlList[i]}" width="200" height="200"/><br><hr>`;
//     }

//     response += `<br>
// <p>Now you can store this url in database or 
//   // do anything with it  based on use case.</p>
// `;
//     return response;
// }


// app.post(
//     "/profile-upload-single",
//     upload.single('profile-file'),
//     async (req, res, next) => {
//         console.log(JSON.stringify(req.file));
//         var locaFilePath = req.file.path;
//         var result = await uploadToCloudinary(locaFilePath);
//         var response = buildSuccessMsg([result.url]);
//         return res.send(response);
//     }
// );


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});



//https://api.cloudinary.com/v1_1/<cloud name>/<resource_type>/upload


// https://www.youtube.com/watch?v=LWB1s6P0wgE