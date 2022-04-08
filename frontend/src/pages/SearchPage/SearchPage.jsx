import axios from "axios";
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import './SearchPage.css';

const SearchPage = (props) => {
    const afApi = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwMjk0ODY5LCJpYXQiOjE2NDk0MzA4NjksImp0aSI6IjIzNDNiZTk5MDRhYzRhMmU4OGY1MWY4YjViNGMwZGZlIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZnJpc2NoIiwiZmlyc3RfbmFtZSI6IiJ9.qNBzq-jsy9C3aBdQ6xyYQUxZtwrN7DwJ08tjd7BRJsI';
    const [searchResults,setSearchResults] = useState([]);

    async function getSearchResults(search){
        let response = await axios.get('https://tasty.p.rapidapi.com/recipes/list/search?q=${search}&key={afApi}', {
            from: '0', size: '5', tags: 'under_30_minutes'},{
                headers:{'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
                'X-RapidAPI-Key': '9fd18897abmsh4a09bbc12e08e25p11bc2cjsn651659dd5c5a'
            }

            });
        console.log('Search Results', response.data.items);
        setSearchResults(response.data.items);
    }

    const handleClick = (event,id,title,description) => {
        event.preventDefault();
        props.setRecipeChoice(id,title,description)
        console.log('handleclick event triggered');
    }
    
    
    return(
        <div className='SearchBar1' >
        <SearchBar className='SearchBar' getSearchResults={getSearchResults} />
        <table>
            <tbody>
                {searchResults.map((searchResults, index) => {
                    return(
                        <tr className ='row' key ={index}>
                            <td>
                                <input type ='text' onClick ={(event) => handleClick(event, searchResults.snippet.title,searchResults.snippet.description)}/>
                                <td>{searchResults.snippet.title}</td>
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