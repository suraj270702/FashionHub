import React, { useState } from 'react'
import './search.css'
const Search = ({history}) => {
    const [keyword,setKeyword] = useState("")
    const searchsubmitHandler = (e) => {
        e.preventDefault();
        //const keyword = document.querySelector("#search-input").value;
        if (keyword.trim()) {
            window.location.href = `/men/${keyword}`;
        } else {
            window.location.href = "/men";
        }
    };
    
  return (
    <>
    <form className='searchBox' onSubmit={searchsubmitHandler} >
        <input type='text' placeholder='search a product' onChange={(e)=>setKeyword(e.target.value)} />
        <input type='submit' value='search' className='bg-indigo-600 hover:bg-indigo-700'/>
    </form>
    </>
  )
}

export default Search