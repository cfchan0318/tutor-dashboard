const { course } = require("pg/lib/defaults");
const db = require("../models");
const Course = db.courses;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  let isSubjectExist = false;

  Course.findAll({ where: { description: req.body.description }, limit: 1 })
    .then(courses => {
      if (courses.length > 0) {
        isSubjectExist = true;
      }
    })
    .then(() => {

      if (isSubjectExist) {
        res.status(500).send({
          message: "Course already exist"
        });
      } else {

        const subject = req.body;

        Course.create(subject)
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
  Course.findAll()
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Courses.`
        });
      }
    })
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Course.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Course with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Course with id=" + id
      });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Course.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Course was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Course with id=" + id
        });
      });

};

exports.delete = (req, res) => {
  const id = req.params.id;
  Course.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Course was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Course with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Course with id=" + id
      });
    });
};