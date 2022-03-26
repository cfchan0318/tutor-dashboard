const { subject } = require("pg/lib/defaults");
const db = require("../models");
const Subject = db.subjects;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  let isSubjectExist = false;

  Subject.findAll({ where: { description: req.body.description }, limit: 1 })
    .then(subjects => {
      if (subjects.length > 0) {
        isSubjectExist = true;
      }
    })
    .then(() => {

      if (isSubjectExist) {
        res.status(500).send({
          message: "Subject already exist"
        });
      } else {

        const subject = { description: req.body.description }

        Subject.create(subject)
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
  Subject.findAll()
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
  Subject.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Subject with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Subject with id=" + id
      });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Subject.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Subject was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Subject with id=${id}. Maybe Subject was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Subject with id=" + id
        });
      });

};

exports.delete = (req, res) => {
  const id = req.params.id;
  Subject.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Subject was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Subject with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Subject with id=" + id
      });
    });
};