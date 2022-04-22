import React, { useEffect, useState } from "react";
import Modal from 'react-awesome-modal';
import { toast } from 'react-toastify';
import './Pantry.css'
import SearchPage from "../../pages/SearchPage/SearchPage";
import HomePage from "../../pages/HomePage/HomePage";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const DisplayPantryItems = (props) => {
    const [user, token] = useAuth()
    const[ingredients,setIngredients] = useState ([])
    const [newIngredient, setNewIngredient] = useState({ user: user.id, name: "", "best_by_date" : "", "costOfIngredient" : "4.99"});
    const [visible, setVisible] = useState(false); //set to false so the window does not pop up on intial page setup; Named it visible to help me undersatnd that it can invisible and visible with true false statements

    // function handleIngredient(){
    //     let newIngredient = {
    //         name: ingredients.name,
    //         best_by_date: ingredients.best_by_date,

    //         user: user?.id
        
    //     };

    //     console.log(newIngredient);
    //     addIngredient(newIngredient);
    //     pantryIngredients(newIngredient);
    // }
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

    useEffect(pantryIngredients, []);


    const alertWhenExpired = () => {
        const today = new Date();
        ingredients.forEach(ingredient => {
            if(today >= new Date(ingredient.best_by_date)){
                // alert(`${ingredient.name} has expired!`);
                toast.error(`${ingredient.name} has expired!`);
                return;
            }
        });
        }

    useEffect(alertWhenExpired, [ingredients]);





   const addIngredient = async (e) => {
    e.preventDefault();
       try {
           let response = await axios.post('http://127.0.0.1:8000/api/ingredient/addnew/', newIngredient ,{
               headers: {
                   Authorization: 'Bearer ' + token,
               }
           });
           setVisible(false);
           pantryIngredients();
        //    setIngredients(response.data);
       } catch (error){
           console.log(error);
       }
    // console.log(newIngredient)
    }



    const handleChange = ({ currentTarget: input }) => {
        const newData = { ...newIngredient };
        newData[input.name] = input.value;
        setNewIngredient(newData);
    }



       return(
           <div className='formbox'>
              <div className = 'displayPantry' style={{color:'white', padding: '40px 20px', borderRadius: '5px', background: 'darkgray', width: '40%', textAlign: 'center', margin: '65px auto 0'}}> 
                    <h2>Pantry</h2>
                  {ingredients.map((ingredient, index) =>{
                      return(
                      <div key={ingredient.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                          <p>{ingredient.name}</p>
                          <p>{ingredient.best_by_date}</p>

                      </div>
                      )
                  })}
                  <button onClick={() => setVisible(true)} style={{background:'black'}}>Add</button>
              </div>
                 <Modal visible={visible} width='500' height='400' effect='fadeInUp' onClickAway={() => setVisible(false)}>
                        <form style={{ padding: '20px 20px', color: 'black'}}>
                            <h5 style={{textAlign: 'center', marginBottom: '40px'}}>Add New Ingredient</h5>
                            <div style={{ marginBottom: '20px'}}>
                                <label htmlFor="name" style={{color: 'black', fontSize: '15px', display: 'block'}}>Ingredient Name: </label>
                                <input id='name' type='text' name='name' value={newIngredient.name} style={{width: '100%', height: '40px', padding: '10px'}} onChange={handleChange} />
                            </div>

                            <div style={{ marginBottom: '20px'}}>
                                <label htmlFor="date" style={{color: 'black', fontSize: '15px', display: 'block'}}>Best by Date: </label>
                                <input id="date" type='date' name='best_by_date' value={newIngredient.best_by_date} style={{width: '100%', height: '40px', padding: '10px'}} onChange={handleChange}  />
                            </div>
                            
                            <button style={{width:'100%'}} onClick={addIngredient}>Add to Pantry</button>
                        </form>
                    </Modal>  
           </div>

       )
   }


export default DisplayPantryItems