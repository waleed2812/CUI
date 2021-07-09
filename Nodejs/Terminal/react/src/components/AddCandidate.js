import axios from 'axios';
import React from 'react';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

const Add = () => {

    const alert = useAlert();
    const [jobs, setJobs] = React.useState([])

    React.useEffect(() => {
        
        axios.get(global.config.URI_BE + '/admin/jobs')
            .then( res => {
                setJobs(res.data.data.jobs);
            })
            .catch( err => {
                console.error(err);
            })
    }, [])

    const addCandidate = (event) => {
        event.preventDefault()
        
        let data = {
            jobID: event.target.job.value,
            email: event.target.email.value.length === 0 ? null : event.target.email.value,
            name: event.target.name.value.length === 0 ? null : event.target.name.value,
            phoneNumber: event.target.phoneNumber.value.length === 0 ? null : event.target.phoneNumber.value,
            experience: event.target.experience.value.length === 0 ? null : event.target.experience.value,
            applyDate: event.target.applyDate.value.length === 0 ? null : event.target.applyDate.value
        }

        console.log(data);

        axios.post(global.config.URI_BE + '/admin/add', data)
        .then( res => {
            console.log(res);
            alert.show("Record Added", {type: "success"})
            window.location = global.config.URI;
        })
        .catch( err => {
            console.log(err);
            alert.show("Faield to Add Candiates", {type: "error"})
            
        })

    }

    return (

        <>
            <div className="container">
                <Link to="/">Dasboard</Link>
                <h1>Add Candidate</h1>
                <form onSubmit={addCandidate}>
                    <div className="mb-3">
                        <label for="job" className="form-label">Job</label>
                        <select className="form-control" id="job" aria-describedby="job" name="job">
                            {
                                jobs.map( (job, index) =>
                                    <option value={job._id} key={index}>{job.title}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="email" />
                        <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="mb-3">
                        <label for="phoneNumber" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="phoneNumber" />
                    </div>
                    <div className="mb-3">
                        <label for="experience" className="form-label">Experience</label>
                        <input type="text" className="form-control" id="experience" />
                    </div>
                    <div className="mb-3">
                        <label for="applyDate" className="form-label">Apply Date</label>
                        <input type="date" className="form-control" id="applyDate" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>

    );
}

export default Add;