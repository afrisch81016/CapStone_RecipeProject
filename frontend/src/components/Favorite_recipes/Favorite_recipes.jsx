import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import './Favorite_recipe.css';

const DisplayFavoritedRecipe = (props) => {
    const [user,token] = useAuth()
    const [savedRecipe, setSavedRecipe] = useState([])
    const[addRecipeToList,setAddRecipeToList] = useState ([])

    function handleFavRecipe(event){
        event.preventDefault();
        let newFavRecipe = {
            favoritedrecipe: savedRecipe,
            user: user,
        }
        console.log(newFavRecipe);
    }
    const savedRecipeByUser = async () => {
        try{
            let response = await axios.get('http://127.0.0.1:8000/api/customers/addfav/',{
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            setSavedRecipe(response.data);
            console.log(response.data);
        } catch (error){
            console.log(error.message);
        }
    }
    useEffect(()=> {
        savedRecipeByUser();
    },[]);

  
    return(
        <div className='fav-container' onSubmit ={handleFavRecipe}>
            <h1 className = 'fav-header' style={{color:'white'}}>Favorited Recipes</h1>
            {savedRecipe.map((savedRecipe)=>{
                return(
                    <div class="fav-item" >
                        {savedRecipe.favoritedRecipe}
                    </div>
                )
            })}
        </div>
    )
}


export default DisplayFavoritedRecipe