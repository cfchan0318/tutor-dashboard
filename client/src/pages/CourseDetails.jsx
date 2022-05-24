import React from "react";
import Dashboard from '../Layout/dashboard/dashboard.component';
import { useParams } from 'react-router-dom'
import axios from "axios";

const CourseDetails = ({ logoutOnClick }) => {
    //auth
  const token = localStorage.getItem('token')
    let { id } = useParams();
    const [courseId, setCourseId] = React.useState(0);
    const [course, setCourse] = React.useState({});

    React.useEffect(() => {
        setCourseId(id).then(() => {
            axios.get('/api/courses/' + courseId, { headers: { Authorization: token } }).then(res => {
                setCourse(res.data)
            })
        })
    },[])

    return (
        <Dashboard headerHandleOnClick={logoutOnClick}>

            
        </Dashboard>
    );
}

export default CourseDetails;