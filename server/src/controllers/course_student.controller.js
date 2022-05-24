const db = require("../models");
const courseStudent = db.CourseStudent;

exports.create = (req, res) => {
    courseStudent.create(req.body)
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
    const courseId = req.params.course_id;
    const studentId = req.params.student_id;

    let where = {};
    if (courseId && studentId) {
        where = {
            course_id: courseId,
            student_id: studentId
        };
    } else if (courseId) {
        where = {
            course_id: courseId
        };
    } else if (studentId) {
        where = {
            student_id: studentId
        };
    }
    
    courseStudent.findAll({
        where: where
    })
        .then(data => {
            res.send(data)
        })
}

exports.update = (req, res) => {
    const courseId = req.body.course_id;
    const studentId = req.body.student_id;

    courseStudent.update(req.body, {
            where: {
                course_id: courseId,
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
                    message: `Cannot update Class with id=${courseId}. Maybe Class was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Class with id=" + courseId
            });
        });
}

exports.delete = (req, res) => {
    const courseId = req.body.course_id;
    const studentId = req.body.student_id;

    courseStudent.destroy({
        where: {
            course_id: courseId,
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