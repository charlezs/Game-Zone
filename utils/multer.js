const multer = require('multer');
const path = require('path');

//Multer config
module.exports = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "../../uploads");
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    })
});
