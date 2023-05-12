import React, { useState } from 'react';

import './Search.scss';
import StoreApiRequest from './../../../helper/shopware api/apiHelper'

export default function Search() {

    const [searchRes, setSearchRes ] = useState(false)

    let timer = null; 

    function onSearchChange(e){
        e.preventDefault();
        
        clearTimeout(timer);
        timer = setTimeout(()=>{

            if(e.target.value.length > 0){
                StoreApiRequest.getSearchResult(e.target.value).then((res) => {
                  console.log(res.data.elements);
                  if (res.data.elements.length == 0) {
                    setSearchRes(false);
                  } else {
                    setSearchRes(res.data.elements);
                  }
                });
            }else{
                setSearchRes(false)
            }
           
        }, 100)

    }



  return (
    <>
      <form onSubmit={(e) => onSearchChange(e)}>
        <input
          type="text"
          id="search-box"
          onChange={(e) => onSearchChange(e)}
          placeholder="Search"
        />
      </form>
      <div className="search-container">
        {searchRes && (
          <ul className="result-container">
            {searchRes.map((val) => (
              <>
                <li key={val.id}>{val.name}</li>
                <hr />
              </>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
