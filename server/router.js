const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send("server is running and up");
})

module.exports = router