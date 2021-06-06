const MernDB  = require("../models/db");
const { int2radix64, radix64toint } = require("../services/radix64-service");

async function createRandomShortCode(link) {
  const genCode = parseInt(Math.random() * 999999999999);

  try{
    const exists = MernDB.findById(genCode);
    return await createRandomShortCode(link);
  }catch(error){
    const newPostDocument = new MernDB({
      id: genCode,
      full: link,
      short: int2radix64(genCode)
    })
    try{
      return await newPostDocument.save();
    }catch(error){
      return await error;
    }
  }
}

async function createCustomShortCode(code, link) {
  const idCode = radix64toint(code);

  try{
    const exists = MernDB.findById(idForCode);
    throw new Error("This shortcode [" + code + "] already exists");
  }catch(error){
    const newCustomCode = new MernDB({
      id: idCode,
      full: link,
      short: code,
    })
    try{
      return await newCustomCode.save();
    }catch(error){
      return await error;
    }
  }
}

async function findLongUrl(code) {
  const id = radix64toint(code);

  try{
    const exists = MernDB.findById(id);
    return await exists;
  }catch(error){
    return await error;
  }
}

module.exports = {
  createCustomShortCode,
  createRandomShortCode,
  findLongUrl,
};
