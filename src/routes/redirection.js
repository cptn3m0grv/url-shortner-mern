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
      const count = result[0].clicks + 1;
      await MernDB.updateOne({short: code}, {clicks: count}, (error) => {
        if(error){
          console.log("Clicks Not Updated!!!");
        }else{
          console.log("Clicks incremented!!!");
        }
      });
      return res.redirect(result[0].full);
    }else{
      return res.status(404).json({"msg": "404"})
    }
  }
});

module.exports = route;