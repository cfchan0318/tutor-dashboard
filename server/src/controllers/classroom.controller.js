const { classrooms } = require("pg/lib/defaults");
const db = require("../models");
const Classroom = db.classrooms;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  let isClassroomExist = false;

  Classroom.findAll({ where: { description: req.body.description }, limit: 1 })
    .then(classrooms => {
      if (classrooms.length > 0) {
        isClassroomExist = true;
      }
    })
    .then(() => {

      if (isClassroomExist) {
        res.status(500).send({
          message: "Classroom already exist"
        });
      } else {

        const classroom = { 
          description: req.body.description,
          schoolId: req.body.schoolId
        }

        Classroom.create(classroom)
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
  Classroom.findAll()
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Classrooms.`
        });
      }
    })
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Classroom.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Classroom with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Classroom with id=" + id
      });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Classroom.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Classroom was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Classroom with id=${id}. Maybe Classroom was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Classroom with id=" + id
        });
      });

};

exports.delete = (req, res) => {
  const id = req.params.id;
  Classroom.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Classroom was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Classroom with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Classroom with id=" + id
      });
    });
};