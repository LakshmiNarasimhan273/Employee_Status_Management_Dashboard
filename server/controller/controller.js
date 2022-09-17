var Userdb = require("../model/model");

// Create and Save a New Users;

exports.create = (req, res) => {
  // validation for user request

  if (!req.body) {
    res.status(400).send({ message: "DataFields Cannot Be Empty" });
    return;
  }

  //   Creating a New user

  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //   Save the data in the database
  user
    .save(user)
    .then((data) => {
      // res.send(data);
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some Error Occured while creating a create operation",
      });
    });
};

// Retrive a All user & Retrive a Single user

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        // res.redirect("/");
        if (!data) {
          res.status(404).send({
            message: "No User Records Found for this id :" + id,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error while retriving ths user details with id : " + id,
        });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Error Occured while retriving a user Details from Database",
        });
      });
  }
};

// Update a unified user

exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Update Data Fields cannot be Empty" });
  }

  const id = req.params.id;

  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user for the id : ${id}. May be user Not Found in the Database`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "User Update has some Error" });
    });
};

// delete a user in database

exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete user id: ${id}. May be user Not Found in the Database`,
        });
      } else {
        res.send({
          message: "User Details was Deleted Successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not Delete User " + id,
      });
    });
};
