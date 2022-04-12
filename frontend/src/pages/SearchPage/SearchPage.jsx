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
    setSearchResults(response.data.results);
}





const handleClick = (event,name) => {
    event.preventDefault();
    props.setRecipeChoice(name)
    console.log('handleclick event triggered');
}


return(
    <div className='SearchBar1' >
        <SearchBar className='SearchBar' getSearchResults={getSearchResults} />
        <table>
            <tbody>
                {searchResults && searchResults.map((searchResults, index) =>{
                    return(
                        <tr key={index}>
                        <td>{searchResults.name}</td>
                        </tr>
                    )
                })}
                    <tr className ='row'>
                        <td>
                            <input type ='text' onClick ={(event) => handleClick(event,searchResults.name,searchResults.description)}/>
                        </td>
                    </tr>
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


// function definedSearchResult(){
    //     let filteredResult = searchResults.filter(response.data) => {
        //         if (searchResults === ""){
            //             return filteredResult;
            //         }
            //         else if(searchResults.name.toLowerCase().includes(searchResults.toLowercase()))
            //         return filteredResult
            
            //     }
            // }        
            