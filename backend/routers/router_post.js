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

router.post('/upload', upload.single("image"), async function (req, res, next) {
    try {

        console.log("result to router ------", req.body)

        req.body.file = req.file.filename;

        let resultOfUpload = await api.Upload(req.body)

        res.send(resultOfUpload);
    }
    catch (err) {
        res.send(err);
    }
})

router.post('/myPosts', async function (req, res) {
    try {
        console.log("data comming to backend is +++++++", req.body);

        let result = await api.myPosts(req.body)

        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
})

router.post('/allPosts', (req, res) => {
    try {
        api.Allposts(req.body).then((data) => {

            res.send(data);
        })
    }
    catch (err) {
        res.send(err);
    }
})

router.post('/singlePost', async function (req, res, next) {

    try {

        console.log("comming here on server ------- object******", req.body);

        // req.body.thumbnail = req.file.filename;

        api.Single(req.body).then((data) => {

            console.log(data);

            res.send(data);
        })

    }
    catch (err) {
        res.send(err)
    }
})

router.post('/diffPosts', (req, res) => {

    // console.log("data %%%%$$$$$$$$$$$$$##########comming to backend is +++++++",req.body);

    try {
        api.Diffposts(req.body).then((data) => {

            res.send(data);
        })
    }
    catch (err) {
        res.send(err);
    }

    // console.log(data);

})

module.exports = router;