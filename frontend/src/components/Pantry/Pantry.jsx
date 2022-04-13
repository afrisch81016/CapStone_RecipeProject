import React, { useState } from "react";
import SearchPage from "../../pages/SearchPage/SearchPage";
import HomePage from "../../pages/HomePage/HomePage";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const DisplayPantryItems = (props) => {
    const [user, token] = useAuth()
    const[ingredients,setIngredients] = useState ([])


    function handleIngredient(event){
        event.preventDefault();
        let newIngredient = {
            text: ingredients,
            recipe_id: props.searchResults,
            pantry: user.id
        };

        console.log(newIngredient);
        addIngredient(newIngredient);
    }

    const pantryIngredients= async() =>{
            let response = await axios.get('http://127.0.0.1:8000/api/ingredient');
            setIngredients(response.data)
            console.log(response.data)
        }
    }


   const addIngredient =async(newIngredient) =>{
       try {
           let response = await axios.post('http://127.0.0.1:8000/api/ingredient', newIngredient,{
               headers: {
                   Authorization: 'Bearer ' + token,
               }
           });
           setIngredients(response.data);
       } catch (error){
           console.log(error.message);
       }

       return(
           <form className='formbox' onSubmit={handleIngredient}>
               <div>
                   <div>pantryIngredients={pantryIngredients}</div>
               <input type ='text' value = {ingredients} onChange = {(event) => setIngredients(event.target.value)}/>
               <input type ='submit' value ='Ingredients'/>
               </div>
           </form>




       )
   }

export default DisplayPantryItems