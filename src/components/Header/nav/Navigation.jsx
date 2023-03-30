import React, { useState, useEffect } from "react";

import axios from "axios";



export default function Navigation(){

      const shopwareDomain = "http://localhost/store-api/";
      const [categories, setCategories] = useState([]);

      useEffect(() => {
        apiVal();
      }, []);

      //NOTE: Change API Key
      const apiVal = () => {
        axios({
          method: "post",
          url: `${shopwareDomain}category`,
          headers: { "sw-access-key": "SWSCWDHDQLQ4UM9YZZZIEUXLBQ" },
        }).then((res) => {
          console.log(res.data.elements);
          setCategories(res.data.elements);
        });
      };

    return(
        <ul>
            {categories.map((cat)=>{
                return <li key={cat.id}>{cat.name}</li>
            })}
        </ul>
    )


}