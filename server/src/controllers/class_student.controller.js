const db = require("../models");
const classStudent = db.ClassStudent;

exports.create = (req, res) => {
    console.log(123123);
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

exports.update = (req, res) => {
    const classId = req.body.class_id;
    const studentId = req.body.student_id;

    classStudent.create(req.body)
    .update(req.body, {
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

