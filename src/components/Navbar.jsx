import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
 
function Navbar() {
  const {user,isLoggedIn,logOutUser} = useContext(AuthContext)
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
      <Link to="/projects">
        <button>Projects</button>
      </Link>

      <Link to="/projects/add">
        <button>Add New Project</button>
      </Link>

      <p>{user.name}</p>
      <button onClick={logOutUser}>Logout</button>

        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>

        </>
      )}
 
    </nav>
  );
}
 
export default Navbar;