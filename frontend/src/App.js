// General Imports
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import About_Me from "./pages/About_Me/About_Me";


// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Pantry from "./components/Pantry/Pantry";
import Favorite_recipes from "./components/Favorite_recipes/Favorite_recipes";


// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import { useEffect, useState } from "react";

function App() {

const [recipeChoice,setRecipeChoice] = useState();


  return (
    <div className='appDiv'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
              <SearchPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Favorite_recipes" element={<Favorite_recipes />} />
        <Route path="/Pantry" element={<Pantry />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="/About_Me" element={<About_Me />} />
      </Routes>
    </div>
  );
}

export default App;
