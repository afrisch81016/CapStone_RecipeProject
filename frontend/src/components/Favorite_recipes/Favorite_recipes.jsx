import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

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
        <form className='formbox1' onSubmit ={handleFavRecipe}>
            <div className = 'displayFav' style={{color:'white'}}>Favorited Recipes
            <div class="mdl-grid">
            {savedRecipe.map((savedRecipe)=>{
                return(
                    <div class="mdl-cell mdl-cell--4-col" style={{backgroundColor :'transparent'}}>{savedRecipe.favoritedRecipe}</div>

                )
            })}
            </div>
            </div>
        </form>
    )
}


export default DisplayFavoritedRecipe