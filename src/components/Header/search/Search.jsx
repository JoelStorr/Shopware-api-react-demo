import React, { useState } from 'react';

import './Search.scss';
import StoreApiRequest from './../../../helper/shopware api/apiHelper'

export default function Search() {

    const [searchVal, setSearchVal ] = useState('')

    let timer = null; 

    function onSearchChange(e){
        e.preventDefault();
        
        clearTimeout(timer);
        timer = setTimeout(()=>{
            StoreApiRequest.getSearchResult(e.target.value).then(res => console.log(res))
        }, 1000)

    }



  return (
        <form onSubmit={(e)=>onSearchChange(e)} >
            <input type='text' id="search-box" onChange={(e)=>onSearchChange(e)} placeholder='Search'/>
        </form>
  )
}
