const db = require("../models");
const Class = db.classes;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (req.body.id) {
    res.status(400).send({
      message: `Bad request: ID should not be provided, since it is determined automatically by the database.`
    });
  } else {
    Class.create(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "error"
      });
    });
   }
}



exports.findAll = (req, res) => {
  Class.findAll()
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Classes.`
        });
      }
    })
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Class.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Class with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Class with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Class.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Class was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Class with id=${id}. Maybe Class was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Class with id=" + id
      });
    });

};

exports.delete = (req, res) => {
  const id = req.params.id;
  Class.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Class was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Class with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Class with id=" + id
      });
    });
};