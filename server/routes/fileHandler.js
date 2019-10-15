const express = require('express');
const router = express.Router();

//File download and upload
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploaded')
    },
    filename: function (req, file, cb) {
        //cb(null, Date.now() + '-' + file.originalname)
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage }).array('file')

router.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
            // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(501).json(err);
            // An unknown error occurred when uploading.
        }
        return res.status(200).send(req.file);
        // Everything went fine.
    })
});




module.exports = router;
