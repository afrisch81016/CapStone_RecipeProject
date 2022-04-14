import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const DisplayFavoritedRecipe = (props) => {
    const [user,token] = useAuth()
    const [savedRecipe, setSavedRecipe] = useState([])

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

    const addNewFavRecipe = async(newFavRecipe) => {
        try {
            let response = await axios.post('http://127.0.0.1:8000/api/customers/addfav/', newFavRecipe,{
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            setSavedRecipe(response.data);
        } catch (error){
            console.log(error.message);
        }
    }
    return(
        <form className='formbox1' onSubmit ={handleFavRecipe}>
            <div className = 'displayFav'>Favorited Recipes
            {savedRecipe.map((savedRecipe, index)=>{
                return(
                    <table>
                        <tbody>
                            <tr key ={index}>
                                <td>{savedRecipe.favoritedRecipe}</td>
                            </tr>
                        </tbody>
                    </table>
                )
            })}
            </div>
        </form>
    )
}


export default DisplayFavoritedRecipe