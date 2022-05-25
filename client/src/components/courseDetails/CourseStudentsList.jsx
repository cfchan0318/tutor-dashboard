import React from "react";
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";

const CourseStudentsList = ({ courseId, token }) => {
    
    const [courseStudents, setCourseStudents] = React.useState([]);

    React.useEffect(() => {
        axios
          .get('/api/courseStudents?courseId=' + courseId, {
            headers: { Authorization: token },
          })
            .then((res) => {
              console.log(courseStudents)
            setCourseStudents(res.data)
          })
    },[])

    return (
        <div></div>
    )
}

export default CourseStudentsList;