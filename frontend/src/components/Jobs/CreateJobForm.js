import { useState,useContext } from "react";
import {AuthContext} from "../../context/AuthContext"
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";

const CreateJobForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)
    const [jobData, setJobData] = useState({
        title: "",
        description: "",
        requirements: "",
        responsibilities: "",
        minSalary: "",
        maxSalary: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData({ ...jobData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formattedData = {
            ...jobData,
            businessId: id,
            postedBy: user._id,
            requirements: jobData.requirements.split(",").map(req => req.trim()),
            responsibilities: jobData.responsibilities.split(",").map(res => res.trim()),
            salaryRange: {
                min: parseInt(jobData.minSalary),
                max: parseInt(jobData.maxSalary)
            }
        };
        
        try {
            let response = await axios.post(`http://localhost:3002/jobs/localbusinesses/${id}/post-job`, formattedData, {
                withCredentials: true ,headers: { "Content-Type": "application/json" }
            });
            
            alert(response.data.message);
            navigate(`/localbusinesses/${id}`);
        } catch (error) {
            console.error("Error creating job:", error);
        }
    };
    
    return (
        <div className='col-lg-6 col-sm-10 offset-lg-3 offset-sm-1' style={{border: "2px solid green", borderRadius:"20px",
        margin: "110px auto",
        padding:"3%", 
        boxShadow: "0px 15px 25px rgba(62, 218, 62, 0.4)", 
        transform: "translateY(-10px)",
        transition: "all 0.3s ease-in-out" }}>
            <h2 className="text-center text-success">Post a Job</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
                <div className="mb-3">
                    <label className="form-label">Job Title</label>
                    <input name="title" type="text" className="form-control" value={jobData.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea name="description" className="form-control" value={jobData.description} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Requirements (comma-separated)</label>
                    <input name="requirements" type="text" className="form-control" value={jobData.requirements} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Responsibilities (comma-separated)</label>
                    <input name="responsibilities" type="text" className="form-control" value={jobData.responsibilities} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Salary Range (Min - Max)</label>
                    <div className="d-flex gap-2">
                        <input name="minSalary" type="number" className="form-control" value={jobData.minSalary} onChange={handleChange} required placeholder="Min" />
                        <input name="maxSalary" type="number" className="form-control" value={jobData.maxSalary} onChange={handleChange} required placeholder="Max" />
                    </div>
                </div>
                <button type="submit" className="btn btn-success w-100">Post Job</button>
            </form>
        </div>
    );
};

export default CreateJobForm;
