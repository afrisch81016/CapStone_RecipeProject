import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayPantryItems from "../../components/Pantry/Pantry";
import SearchBar from "../../components/SearchBar/SearchBar";
import './SearchPage.css';

const SearchPage = (props) => {
    const [searchResults,setSearchResults] = useState([]);
    

    async function getSearchResults(search){
        let response = await axios.get('https://tasty.p.rapidapi.com/recipes/list?', {
            params:{
                from: '0',
                size: '5',
                tags: 'under_30_minutes',
                q: search,
                
            },
            headers:{'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
            'X-RapidAPI-Key': '9fd18897abmsh4a09bbc12e08e25p11bc2cjsn651659dd5c5a'
        }
        
    });
    
    console.log('Search Results', response.data.results);
    let result = sortedData(response.data.results)
    setSearchResults(result);
}

const sortedData =(dataToSort)=>{

        const newFilter = dataToSort.sort((a, b) =>{
            let fa = a.name.toLowerCase(),
            fb =b.name.toLowerCase();

            if (fa < fb){ // -1 moves the object to the left
                return -1;
            }
            if (fa > fb) { // 1 moves the object to the right
                return 1;
            }
            return 0; // 0 is not index loctaion, it means "do nothing" when sorting
        });
        newFilter.forEach((element) =>{
            console.log(element);
        });
        return newFilter
       
    }
    //i need to use searchResults to retrieve the recipe then i need to map over the searchResults and map over the pantry per user,
    //and then return a list of the ingredients left from the recipe(so the user knows which ingredients they are missing)
    //props.results.sections.components.ingredient.name // this is the dot notation pathing that is needed to access ingredients from the tasty api

    const [recipe,setRecipe] = useState([]);

    const handleClick = (recipe) => {
        setRecipe(recipe.sections[0].components);
        findCommonIngredients();
    }
    console.log('handleclick event triggered', recipe);

    //step one is code ingredient into handleclick
    //create another useState variable to store the ingredients from the recipe from the onclick
    //then map over like I have coded on line 74 then 
    //return results
    
    
        const recipeArray = [recipe]
        const pantryArray = [searchResults]
        const missingInPantry = []
        const foundInPantry = []

        function findCommonIngredients(recipe,searchResults){
            for (let i = 0; i < recipeArray.length; i++){
                var isIngredientFound = false
                for (let n = 0; n < pantryArray.length; n++){
                    if (recipeArray[i].includes(pantryArray[n]))
                        isIngredientFound = true
                }
                if (isIngredientFound)
                    foundInPantry.push(recipeArray[i])
                else
                    missingInPantry.push(recipeArray[i])
                // if  (pantryArray.includes(recipeArray[i]))
                //     foundInPantry.add(recipeArray[i])

                // else
                //     missingInPantry.add(recipeArray[i])
                console.log(missingInPantry);
                console.log(foundInPantry);
            }
    

        }
      
    



return(
    <div className='SearchBar1' >
        <SearchBar className='SearchBar' getSearchResults={getSearchResults} />
        <div class="mdl-grid">
            {searchResults && searchResults.map((searchResults, index) =>{
                return(
                    <div class="mdl-cell mdl-cell--4-col">
                        <div class="mdl-card mdl-shadow--2dp">
                            <div  class="mdl-card__title" style={{backgroundImage: searchResults.thumbnail_url, height: "150px"}}>
                                <h2 class="mdl-card__title-text">{searchResults.name}</h2>
                            </div>
                            <div class="mdl-card__supporting-text">
                                {searchResults.thumbnail_url}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        {/* <table>
            <tbody>
                {searchResults && searchResults.map((searchResults, index) =>{
                    return(
                        <tr key={index} style={{color: "white"}}>
                        <td onClick= {() => handleClick(searchResults)}>{searchResults.name}</td>
                        </tr>

                    )
                })}
                {recipe.map((ingredient, index) =>{
                    return(
                        <tr key={index} style={{color: 'white'}}>
                            <td>{ingredient.ingredient.name}</td>
                        </tr>
                    )
                })}
                {missingInPantry.map((ingredient) => {
                    return(
                        <tr>
                            <td>{ingredient}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table> */}
    </div>
);


}



export default SearchPage