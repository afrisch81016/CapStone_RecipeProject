// import React, { useState } from "react";
// import SearchPage from "../../pages/SearchPage/SearchPage";
// import HomePage from "../../pages/HomePage/HomePage";
// import axios from "axios";

// const DisplayPantryItems = (props) => {
//     const[ingredients,setIngredients] = useState ([])


//     function handleIngredient(event){
//         event.preventDefault();
//         let newIngredient = {
//             text: ingredients,
//             recipe_id: props.searchResults,
//             pantry: props.user.id
//         };

//         console.log(newIngredient);
//         addIngredient(newIngredient);
//     }

//     const pantryIngredeints= async() =>{
//             let response = await axios.get('http://127.0.0.1:8000/api/ingredient');
//             setIngredients(response.data)
//             console.log(response.data)
//         }
//     }


//    function addIngredient(newIngredient){
//        try {
//            let response = await axios.post('http://127.0.0.1:8000/api/ingredient', newIngredient);
//            setIngredients(response.data);
//        } catch (error){
//            console.log(error.message);
//        }

//        return(
//            <form className='formbox' onSubmit={handleIngredient}>
//                <input type ='text' value = {ingredients} onChange = {(event) => setIngredients(event.target.value)}/>
//                <input type ='submit' value ='Ingredients'/>
//            </form>




//        )
//    }

// export default DisplayPantryItems