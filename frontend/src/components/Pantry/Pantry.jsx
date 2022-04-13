import React, { useEffect, useState } from "react";
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
        pantryIngredients(newIngredient);
    }
    const pantryIngredients =async() =>{
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/ingredient/addnew/',{
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            setIngredients(response.data);
            console.log(response.data);
        } catch (error){
            console.log(error.message);
        }
     }

    useEffect(()=> {
        pantryIngredients();
        console.log(ingredients)
    },[]);

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
    }
       return(
           <form className='formbox' onSubmit={handleIngredient}>
              <div className = 'displayPantry'> Pantry
                  {ingredients.map((ingredients, index) =>{
                      return(
                      <div>
                          <tr key={index}>{ingredients.text}
                          <td>{ingredients.user}</td>
                          <td>{ingredients.name}</td>
                          <td>{ingredients.best_by_date}</td>
                          </tr>
                      </div>
                      )
                  })}
              </div>
           </form>

       )
   }


export default DisplayPantryItems