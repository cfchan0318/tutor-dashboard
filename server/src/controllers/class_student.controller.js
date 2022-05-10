const db = require("../models");
const classStudent = db.ClassStudent;

exports.create = (req, res) => {
    classStudent.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err
            });
        });
}

exports.findAll = (req, res) => {
    const classId = req.params.class_id;
    const studentId = req.params.student_id;

    let where = {};
    if (classId && studentId) {
        where = {
            class_id: classId,
            student_id: studentId
        };
    } else if (classId) {
        where = {
            class_id: classId
        };
    } else if (studentId) {
        where = {
            student_id: studentId
        };
    }
    
    classStudent.findAll({
        where: where
    })
        .then(data => {
            res.send(data)
        })
}

exports.update = (req, res) => {
    const classId = req.body.class_id;
    const studentId = req.body.student_id;

    classStudent.update(req.body, {
            where: {
                class_id: classId,
                student_id: studentId
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "updated successfully."
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
}

exports.delete = (req, res) => {
    const classId = req.body.class_id;
    const studentId = req.body.student_id;

    classStudent.destroy({
        where: {
            class_id: classId,
            student_id: studentId
        }
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
}