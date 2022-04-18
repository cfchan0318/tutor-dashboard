const db = require("../models");
const Student = db.students;

exports.create = (req, res) => {
    //create student object
    const student = {
        studentNumber: req.body.studentNumber,
        name: req.body.name,
        chineseName: req.body.chineseName,
        sex: req.body.sex,
        birthday: req.body.birthday,
        hkid: req.body.hkid,
        address: req.body.address,
        joinDate: req.body.joinDate
    };

    Student.create(student)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "error"
            });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Student.findOne({id: id})
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status.send({
                    message: `Cannot find Student with id=${id}.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Subject with id= ${id}`
            })
        })
}

exports.findAll = (req, res) => {
    Student.findAll()
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Students.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `error retrieving students. error: ${err}`
            });
        })
}


exports.update = (req, res) => {
    const id = req.params.id
    Student.update(req.body, { where: { id: id } })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "student was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: ""
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Subject.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Stduent was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Stduent with id=${id}. Maybe Stduent was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Stduent with id=" + id
        });
      });
  };