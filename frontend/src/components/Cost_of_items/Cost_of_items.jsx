// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import useAuth from "../../hooks/useAuth";

// const CostOfIngredientsInPantry = (props) =>{
    
//     // useEffect(()=> {
//     //     generateCostOfPantry();
//     // },[]);

//     function generateCostOfPantry(){

//         let filteredIngredients = props.ingredients.filter(ingredients => props.ingredients);

//         console.log(filteredIngredients);

//         let costoffood = filteredIngredients.map(ingredients => {
//             return ingredients.costOfIngredient;
//         });
//         console.log(costoffood);
        
//         let distinctIngredients = [...new Set(costoffood)]

//         console.log(distinctIngredients)

//         let IngredientsArrays = distinctIngredients.map(costoffood =>{
//             let allCostOfItems = filteredIngredients.filter(ingredients => ingredients.costOfIngredient === ingredients);
//             let totalCost = allCostOfItems.reduce(function(sum,current){
//                 return sum + current.totalCost;
//             },0)
//             console.log(totalCost)

//             return [IngredientsArrays]
//         });
         
//     }
//     return (
//         <div>
//             <table>
//                 <td>
//                     <tr>{generateCostOfPantry()}</tr>
//                 </td>
//             </table>
//         </div>
//     )

// }


// export default CostOfIngredientsInPantry