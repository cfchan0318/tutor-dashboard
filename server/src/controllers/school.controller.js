const { school } = require("pg/lib/defaults");
const db = require("../models");
const School = db.schools;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  let isSchoolExist = false;

  School.findAll({ where: { description: req.body.description }, limit: 1 })
    .then(schools => {
      if (schools.length > 0) {
        isSchoolExist = true;
      }
    })
    .then(() => {

      if (isSchoolExist) {
        res.status(500).send({
          message: "School already exist"
        });
      } else {

        const school = { description: req.body.description }

        School.create(school)
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
    );
}



exports.findAll = (req, res) => {
  School.findAll()
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Schools.`
        });
      }
    })
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  School.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find School with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving School with id=" + id
      });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    School.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "School was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update School with id=${id}. Maybe School was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating School with id=" + id
        });
      });

};

exports.delete = (req, res) => {
  const id = req.params.id;
  School.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "School was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete School with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete School with id=" + id
      });
    });
};