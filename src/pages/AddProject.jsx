import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddProject(props) {

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState("");


    const navigate = useNavigate()

    const handleFileUpload = (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);
     
        const uploadData = new FormData();
     
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new movie in '/api/movies' POST route
        uploadData.append("imageUrl", e.target.files[0]);
     
        axios.post('http://localhost:5005/api/upload',uploadData)
          .then(response => {
             console.log("response is: ", response.data.fileUrl);
            // response carries "fileUrl" which we can use to update the state
            
            setImageUrl(response.data.fileUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

    function handleSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem('authToken')
        const newProject = {title,description,imageUrl}
        axios.post('http://localhost:5005/api/projects',newProject,{headers:{Authorization:`Bearer ${token}`}})
        .then(()=>{
            alert("Project successfully Created")
            props.getProjects()
            setTitle('')
            setDescription('')

        })
    }
    return (
        <div className="AddProject">
            
            <h3>Add Project</h3>
                <form onSubmit={handleSubmit}>

                <input type="file" onChange={e=>{handleFileUpload(e)}} />
                <label>
                    Title
                    <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                </label>

                <label>
                    Description
                    <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                </label>

                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddProject