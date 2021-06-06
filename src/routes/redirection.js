const { Router } = require("express");
const { findLongUrl } = require("../services/url-service");
const route = Router();

route.get("/:code", async (req, res) => {
  const code = req.params.code;
  // TODO: validate code is available

  const url = await findLongUrl(code);

  if (url) {
    return res.redirect(url.full);
  } else {
    return res.redirect('https://github.com/cptn3m0grv');
  }
});

module.exports = route;
