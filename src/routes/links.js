const { Router } = require("express");
const MernDB  = require("../models/db");
const route = Router();
const { int2radix64, radix64toint } = require("../services/radix64-service");
// const {
//     createCustomShortCode,
//     createRandomShortCode,
//     findLongUrl,
//   } = require("../services/url-service");

/**
 * POST /api/links
 * BODY
 *      link: http://xxxx.xxxx/xxxx/xxxx
 *      --- optional ---
 *      code: xxxxx
 */
route.post("/", async (req, res) => {
    const link = req.body.link;
    const code = req.body.code;
    // TODO: validate link must exist
    
    if(!code){
        let genCodeInt = parseInt(Math.random() * 999999999999);
        let genResult = await MernDB.find({genCode: genCodeInt});

        while(genResult.length !== 0){
            genCodeInt = parseInt(Math.random() * 999999999999);
            genResult = await MernDB.find({genCode: genCodeInt});
        }

        const newPostDocument = new MernDB({
            genId: genCodeInt,
            full: link,
            short: int2radix64(genCodeInt)
          })
          try{
            const ll = await newPostDocument.save();
            return res.json(ll);
          }catch(error){
            return await res.json(error);
          }
    }else{
        const genInt = radix64toint(code);
        const result = await MernDB.find({genId: genInt});
        if(result.length !== 0){
            return res.json({"msg": "Short Code Already exists"})
        }else{
            const newPostDocument = new MernDB({
                genId: genInt,
                full: link,
                short: code
            })
            try{
                const ll = await newPostDocument.save();
                return res.json(ll);
            }catch(error){
                return await res.json(error)
            }
        }
    }
});

/**
 * GET /api/links/xxxxx
 * RESPONSE
 *      link:
 */
route.get("/:code", async (req, res) => {
    const code = req.params.code;
    const codeInt = radix64toint(code);
    const result = await MernDB.find({genId: codeInt});
    if(result.length !== 0){
        return res.json(result[0]);
    }else{
        return res.json({"msg": "No such short code"})
    }
});

module.exports = route;