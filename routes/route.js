const express = require("express")
const knex = require('../database/db')
const router = express.Router()
const jwt = require('jsonwebtoken')
router.use(express.json())


router.get("/home", (req, res) => {
    try{const token = req.headers.cookie.split('=')[1]
    console.log(token)
    jwt.verify(token,'tushar',(err,data)=>{
        if (err) res.send('err');
        console.log(data)
        res.send("This is our home page")

    })}catch(err){
        res.send('err')
    }
});


router.post('/signup', (req,res) =>{
    knex.select('*').from('signup').where('email',req.body.email).then((data) => {
        if (data.length < 1){
            knex('signup').insert(req.body).then((data) => {
                res.send({"data" : "inserted"})
            }).catch((err) => {
                res.send(err)
            })
        } else {
            res.send("Your id is already in this data..")
        }
    })
})



router.get('/login', (req,res) => {
    knex.select("*").from('signup').where('email', req.body.email).then((data) => {
        if (data < 1) {
            res.send('You cant login this page\nBecause you did not signup yet..')
        } else if (data[0].password !== req.body.password){
            res.send("You write the wrong password :")
        } else {
            const token = jwt.sign({email:data[0].email},'tushar')
            console.log(token);
            res.cookie("token",token)
            res.send("Your login has successed fully.. ")
        }
    })
})

module.exports = router
