import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to='/SearchPage' style={{ textDecoration: "none", color: "darkolivegreen" }}>
            <b>RecipeFinder</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
        <div class="mdl-layout-spacer">
              <nav class="mdl-navigation">
                <Link to='/Favorite_recipes' style={{ textDecoration:'none', color:'darkolivegreen'}}>
                  <a class="mdl-navigation__link favrecipe" href="">Favorite Recipes</a>
                  </Link>
                  <Link to="/Pantry"style={{color:'darkolivegreen'}}>
                  <a class="mdl-navigation__link pantry" href="">Pantry</a>
                  </Link>
                  <Link to="/About_Me" style={{color:'darkolivegreen'}}>
                  <a class="mdl-navigation__link aboutme" href="">About Me</a>
                  </Link>
              </nav>
              <main class="mdl-layout__content">
              </main>
        </div>
    </div>
    
  );
};

export default Navbar;
