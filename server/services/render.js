const axios = require("axios");

exports.homeRoute = (req, res) => {
  // Make a get request from database using axios Module
  axios
    .get("http://localhost:1230/api/users")
    .then(function (response) {
      res.render("index", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_user = (req, res) => {
  res.render("add_user");
};

// Update user get Request
exports.update_user = (req, res) => {
  axios
    .get("http://localhost:1230/api/users", {
      params: { id: req.query.id },
    })
    .then(function (userdata) {
      res.render("update_user", { user: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
