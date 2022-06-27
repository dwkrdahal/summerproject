const multer = require("multer");
const mystorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.cwd() + "/uploads")
    },
    filename: (req, file, cb) => {
        let file_name = Date.now() + "-" + file.originalname;
        cb(null, file_name);
    }
})

const imageFilter = (req, file, cb) => {
    let parts = file.originalname.split('.');
    let ext = parts[parts.length - 1];
    let allowed = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];

    if (allowed.includes(ext)) {
        cb(null, true)
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: mystorage,
    fileFilter: imageFilter
})

module.exports = upload;