import React, { useEffect, useState } from "react";
import Modal from 'react-awesome-modal';
import './Pantry.css'
import SearchPage from "../../pages/SearchPage/SearchPage";
import HomePage from "../../pages/HomePage/HomePage";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const DisplayPantryItems = (props) => {
    const [user, token] = useAuth()
    const[ingredients,setIngredients] = useState ([]);
    const [visible, setVisible] = useState(false);

    function handleIngredient(){
        let newIngredient = {
            name: ingredients,
            best_by_date: props.searchResults,
            user: user?.id
        
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
           <div className='formbox' onClick={handleIngredient}>
              <div className = 'displayPantry' style={{color:'white', fontSize:'50px',paddingBottom:'10px'}}> Pantry
                  {ingredients.map((ingredients, index) =>{
                      return(
                      <div>
                          <table>
                              <tbody>
                                <tr key={index} style={{color: "white"}}>{ingredients.text}
                                <p>
                                    <td>{ingredients.name}</td>
                                </p>    
                                <p>
                                    <td>{ingredients.best_by_date}</td>
                                </p>    
                                </tr>
                              </tbody>
                          </table>
                      </div>
                      )
                  })}
                  <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={() => setVisible(true)}>Add</button>
                  <Modal visible={visible} width='500' height='400' effect='fadeInUp' onClickAway={() => setVisible(false)}>
                        <div>
                            This is the modal pop up.....
                        </div>
                  </Modal>
              </div>
           </div>

       )
   }


export default DisplayPantryItems