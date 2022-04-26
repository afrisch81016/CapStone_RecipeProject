import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import DisplayPantryItems from "../../components/Pantry/Pantry";
import SearchBar from "../../components/SearchBar/SearchBar";
import './SearchPage.css';
import { BsFillSuitHeartFill } from 'react-icons/bs';

const SearchPage = (props) => {
    const [searchResults,setSearchResults] = useState([]);
    const [addRecipeToList, setAddRecipeToList] =useState({});
    const [user,token] = useAuth();
    const [selectedRecipeId, setSelectedRecipeId] = useState('')
    const[ingredients,setIngredients] = useState ([])

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

const addNewFavRecipe = async(newFavRecipe) => {
    try {
        let response = await axios.post('http://127.0.0.1:8000/api/customers/addfav/', newFavRecipe,{
            headers: {
                Authorization: 'Bearer ' + token,
            }

        });
        console.log(response);
        // setAddRecipeToList(response.data);
    } catch (error){
        console.log(error.message);
    }
}

const handleNewFavClick= (recipe) =>{
    let newFavSaved ={
        favoritedRecipe: recipe.name,
        user: user?.id
    }

    addNewFavRecipe(newFavSaved)
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

    
    //step one is code ingredient into handleclick
    //create another useState variable to store the ingredients from the recipe from the onclick
    //then map over like I have coded on line 74 then 
    //return results
       
        
        const [recipe,setRecipe] = useState([]);
    
        const handleClick = (recipe) => {
            setSelectedRecipeId(recipe.id)
            let allIngredients = recipe.sections[0].components;

             for(let i = 0; i < ingredients.length; i++){
                 for(let j =0; j < allIngredients.length; j++){
                     if(ingredients[i].name === allIngredients[j].ingredient.name){
                         console.log("This is in the pantry");
                        //  allIngredients.filter(item => item.ingredient.name !== allIngredients[j].ingredient.name)
                     }
                 }
             }

            // console.log(allIngredients);
            console.log(recipe.sections[0].components) 
            setRecipe(recipe.sections[0].components);
            // findCommonIngredients();()
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
    
        useEffect(pantryIngredients, []);

        
            const [likeButtonClass, setLikeButtonClass] =useState("maroon");  // using hooks to sotre state of the button colors
        
            function handleClickLike(event){
                event.preventDefault(); //prevents refreshing of the page. data stays on until webpage is refreshed
                if(likeButtonClass === "maroon"){
                    setLikeButtonClass("red");  //when clicking on "like" button, this sets the color to red
                
                }
                else {
                    setLikeButtonClass("maroon");//if button is already red, switches it back to maroon
                }
            }
        
return(
    <div className='SearchBar1' >
        <SearchBar className='SearchBar' getSearchResults={getSearchResults} />
        <div className="mdl-grid">
            {searchResults && searchResults.map((searchResult, index) =>{
                return(
                    <div class="mdl-cell mdl-cell--4-col">
                        <div style={{background:'dimgray'}} class="mdl-card custom-card mdl-shadow--2dp">
                            <div  class="mdl-card__title" style={{backgroundSize:'cover',backgroundPosition:'center',backgroundImage: `url(${searchResult.thumbnail_url})`, height:'400px', width:'350px',backgroundRepeat: 'no-repeat'}}>
                            <BsFillSuitHeartFill size={40} color={'maroon'} className='addtofavbutton' onClick={() => handleNewFavClick(searchResult)} />
                                <h2 class="mdl-card__title-text" onClick={() => handleClick(searchResult)}>{searchResult.name}</h2>
                            </div>
                            {selectedRecipeId === searchResult.id && recipe.map((ingredient) =>{
                                return(
                                    <div class="mdl-card__supporting-text" style={{color:'antiquewhite', fontFamily:'cursive'}}>Ingredient: {ingredient.ingredient.name}
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                    )
                })}
        </div>
    </div>
);


}



export default SearchPage