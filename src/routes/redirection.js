const { Router } = require("express");
// const { findLongUrl } = require("../services/url-service");
const MernDB = require("../models/db")
const route = Router();

route.get("/:code", async (req, res) => {
  const code = req.params.code;
  // TODO: validate code is available

  if(!code){
    return res.json({"msg": "No code provided"})
  }else{
    const result = await MernDB.find({short: code});
    if(result.length === 1){
      return res.redirect(result[0].full);
    }else{
      return res.status(404).json({"msg": "404"})
    }
  }
});

module.exports = route;