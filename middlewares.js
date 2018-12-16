module.exports = {
  isConnected: function (req, res, next) {
    console.log("isConnected!")
    console.log(req.user)
    if (req.user) next()
    else res.redirect('/join')
  }
};
