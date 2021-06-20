const { Router } = require("express");
const { decrypt } = require("../services/decrypt")
const MernDB  = require("../models/db");
const route = Router();
require('dotenv').config()

route.post("/", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // TODO: validate link must exist
    if(await decrypt(username)===process.env.APP_ADMIN_USERNAME && await decrypt(password)===process.env.APP_ADMIN_PASSWORD){
        const result = await MernDB.find();
        return res.json(result);
    }else{
        return res.status(401).json({"msg": "Unauthorized"})
    }
});

module.exports = route;