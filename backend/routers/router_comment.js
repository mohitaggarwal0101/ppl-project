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

router.post('/addComment', (req, res) => {

    try {
        api.Addcomment(req.body).then((data) => {
            res.send(req.body);
        })
    }
    catch (err) {
        res.send(err);
    }
})

router.post('/getComments', (req, res) => {
    try {
        api.Getcomments(req.body).then((data) => {

            res.send(data);
        })

    }
    catch (err) {
        res.send(err);
    }
})

router.post('/getlikes', (req, res) => {
    try {
        api.Getlikes(req.body).then((data) => {

            res.send({ temp: data[0].likes.length })
        })
    }
    catch (err) {
        res.send(err);
    }
})

router.post('/onlike', (req, res) => {
    try {
        api.Onlike(req.body).then((data) => {

            res.send(data);
        })
    }
    catch (err) {
        res.send(err);
    }
})
module.exports = router;