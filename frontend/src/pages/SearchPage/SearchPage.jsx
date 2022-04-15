import axios from "axios";
import React, { useState } from "react";
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
        // setFilteredData(newFilter);
        // event.preventDefault();
        // console.log('handlesubmit event triggered');
        // console.log('Test',searchWord);
    }
    //i need to use searchResults to retrieve the recipe then i need to map over the searchResults and map over the pantry per user,
    //and then return a list of the ingredients left from the recipe(so the user knows which ingredients they are missing)
    //props.results.sections.components.ingredient.name // this is the dot notation pathing that is needed to access ingredients from the tasty api

    const [recipe,setRecipe] = useState([]);

    const handleClick = (recipe) => {
        setRecipe(recipe.sections[0].components);
    }
    console.log('handleclick event triggered', recipe);

    //step one is code ingredient into handleclick
    //create another useState variable to store the ingredients from the recipe from the onclick
    //then map over like I have coded on line 74 then 
    //return results
        



return(
    <div className='SearchBar1' >
        <SearchBar className='SearchBar' getSearchResults={getSearchResults} />
        <table>
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
            </tbody>
        </table>
    </div>
);


}



export default SearchPage


//I know that searchResults was SET to response.data and is retrieving the data. I now need to map over the searchResults to help define the return better
// const [definedSearchResults,setDefinedSearchResults] = useState([]);

// function mappedSearch (mapped){
    //     let mappedresponse = searchResults.map(element => {
        //         return element.name
        
        //     })
        //     console.log('Mapped', mappedresponse)
        
        // }
        
        // let filteredResult = searchResults.filter(response.data) => {
        //         if (searchResults === ""){
        //                 return filteredResult;
        //             }
        //             else if(searchResults.name.toLowerCase().includes(searchResults.toLowercase()))
        //             return filteredResult
            
        //         }
        //     }        

            