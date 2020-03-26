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

router.post('/login', async function (req, res) {
    try {

        console.log("result to router ------", req.body)

        let resultOfLogin = await api.login(req.body)
        console.log("result from api++++++", resultOfLogin)

        if (resultOfLogin.length != 0) {
            if (resultOfLogin[0].password === req.body.password) {
                res.send(resultOfLogin);
            }
            else {
                res.send("incorrect password");
            }
        }
        else {
            res.send("incorrect email");
        }
    }
    catch (err) {
        res.send(err);
    }
})

router.post('/adduser', upload.single("image"), async function (req, res) {
    try {
        console.log("comming here------", req.body);
        let resultOfFind = await api.userFind(req.body)

        console.log("result of find ++++ ", resultOfFind.length)

        if (resultOfFind.length === 0) {
            await api.userCreate(req.body).then((data) => {

                console.log("user created +++++ server")

                res.send("created");
            })

        }
        else {
            console.log("already ++ ", resultOfFind);
            res.send("exists");
        }
    }
    catch (err) {
        res.send(err)
    }
})

router.post('/changeUsername',async function(req,res){
    try
    {
        console.log("for username change********",req.body);
        api.changeUsername(req.body).then((data)=>{

            console.log("data returned after updation!!!!!!!!!",data);

            res.send(req.body);
        })
    }
    catch(err)
    {
        res.send(err);
    }
})

module.exports = router;