var express = require("express");
var router = express.Router();
var api = require('../api');
var multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/com115/Desktop/ppl/frontend/public/posts')
    },
    filename: function (req, file, cb) {
        console.log("file in system is +++++++", req.body)
        cb(null, file.originalname + "-" + new Date().toLocaleTimeString())
    }
})

var upload = multer({ storage: storage })

router.post('/getCategories', (req, res) => {
    try {
        api.Getcategories(req.body).then((data) => {

            res.send(data);
        })
    }
    catch (err) {
        res.send(err);
    }

})


router.post('/addCategories', upload.single("thumbnail"), async function (req, res, next) {
    try {

        console.log("comming here on server ------- categories******", req.file);

        req.body.thumbnail = req.file.filename;

        resultOfAddCategory = await api.Addcategory(req.body);

        res.send(resultOfAddCategory);

    }
    catch (err) {
        res.send(err)
    }
})

module.exports = router;