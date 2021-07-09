import axios from 'axios';
import React from 'react';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

const Index = () => {

    const [candidates, setCandidates] = React.useState([]);
    const [jobs, setJobs] = React.useState([]);
    const alert = useAlert();

    React.useEffect(()=>{
        axios.get(global.config.URI_BE + '/admin')
        .then( res => {
            console.log(res);
            setCandidates(res.data.data.candidates);
            setJobs(res.data.data.jobs)
            alert.show("Record Fetched", {type: "success"})

        })
        .catch( err => {
            console.log(err);
            alert.show("Faield to Fetch Candiates", {type: "error"})
            
        })

    }, [])

    return (

    <>
        <div className="container">
        <h1>Admin Dashboard</h1>
        <Link to="/add">Add Candidate</Link>
        <table className="table">
            <tbody>
                <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Name</th>
                    <th scope="col">Picture</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Experience</th>
                    <th scope="col">Resume</th>
                    <th scope="col">Job</th>
                    <th scope="col">Apply Date</th>
                </tr>
            
            { candidates.length <= 0 ? 
            
                <tr><td colSpan={7}>No Record</td></tr> 
                    : 
                candidates.map( (candidate, index) => (
                        <tr key={index}>
                            <td>{candidate.email}</td>
                            <td>{candidate.name}</td>
                            <td>{candidate.profileImage}</td>
                            <td>{candidate.phoneNumber}</td>
                            <td>{candidate.experience}</td>
                            <td><button onClick={() => window.location = candidate.resume}>Open</button></td>
                            <td>{jobs.filter( job => job._id === candidate.jobID)[0]?.title}</td>
                            <td>{candidate.applyDate}</td>
                        </tr>
                    )
                )
            }
            </tbody>
        </table>
        </div>
    </>

    );
}

export default Index;