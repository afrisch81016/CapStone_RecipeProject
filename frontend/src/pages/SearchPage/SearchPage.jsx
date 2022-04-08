import axios from "axios";
import React, { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import './SearchPage.css';

const SearchPage = (props) => {
    const [searchResults,setSearchResults] = useState([]);

    async function getSearchResults(search){
        let response = await axios.get('https://tasty.p.rapidapi.com/recipes/list?', {
            from: '0',
            size: '5',
            tags: 'under_30_minutes',
            
            headers:{'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
            'X-RapidAPI-Key': '9fd18897abmsh4a09bbc12e08e25p11bc2cjsn651659dd5c5a'
            }

            });
        console.log('Search Results', response.data);
        setSearchResults(response.data);
    }

    const handleClick = (event,name,description) => {
        event.preventDefault();
        props.setRecipeChoice(name,description)
        console.log('handleclick event triggered');
    }
    
    
    return(
        <div className='SearchBar1' >
        <SearchBar className='SearchBar' getSearchResults={getSearchResults} />
        <table>
            <tbody>
                {searchResults.filter((searchResults, index) => {
                    return(
                        <tr className ='row' key ={index}>
                            <td>
                                <input type ='text' onClick ={(event) => handleClick(event, searchResults.snippet.name,searchResults.snippet.description)}/>
                                <td>{searchResults.snippet.name}</td>
                                <td>{searchResults.snippet.description}</td>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
);


}



export default SearchPage