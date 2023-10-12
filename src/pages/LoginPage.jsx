
import { useContext, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
 
const API_URL = "http://localhost:5005";
 
 
function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();

  const {authenticateUser, isLoggedIn} = useContext(AuthContext)
 
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
 
    
  const handleLoginSubmit = (e) => {
    e.preventDefault()

    const userInfo = {email,password}

    axios.post(`${API_URL}/auth/login`,userInfo)
    .then((response)=>{
        console.log(response.data)
        localStorage.setItem('authToken',response.data.authToken)
        authenticateUser()
             
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  
  if(isLoggedIn){
    return <Navigate to="/"></Navigate>
  }
  else{
    return (
      <div className="LoginPage">
        <h1>Login</h1>
   
        <form onSubmit={handleLoginSubmit}>
          <label>Email:</label>
          <input 
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
   
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
   
          <button type="submit">Login</button>
        </form>
        { errorMessage && <p className="error-message">{errorMessage}</p> }
   
        <p>Don't have an account yet?</p>
        <Link to={"/signup"}> Sign Up</Link>
      </div>
    )
  }
  
}
 
export default LoginPage;