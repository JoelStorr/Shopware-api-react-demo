import React, { useState, useEffect } from "react";

import axios from "axios";



export default function Navigation(){

      const shopwareDomain = "http://localhost/store-api/";

      const [dataLoaded, setDataLoaded] = useState(false);
      const [categories, setCategories] = useState([]);

    let data = null;

      useEffect(() => {
       /*  if(!dataLoaded){
          apiVal();
          setDataLoaded(true)
        } */

        setCategories([]);
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
          setCategories([]);
          orderNav(res.data.elements);
        });
      };

      //NOTE: Only allows for one Child Categorie right now
      //TODO: Make sure that there are no duplicates in Categories Array when data is called again.

      function orderNav(queryResElemetns){
        
        const tempCategories = []

        queryResElemetns.forEach(element => {
          //console.info(element);

          if (
            element.parentId === null &&
            !tempCategories.some((ele) => element.name == ele.parent.name)
          ) {

            console.log('Is base element');

            const categoryConversionObject = { parent: element, children: [] };

            tempCategories.push(categoryConversionObject);
            console.info(tempCategories)

          } else if (element.parentId != null && tempCategories.length > 0) {



            const parent = tempCategories.find(
              (ele) => {
                
                  return ele.parent.id == element.parentId
              }
            );

              console.log(parent);

              parent.children.push(element);
            

          }

          // TODO: Reorder Children based on ID
          
      
        });

        setCategories(tempCategories);
    
        console.log("Temp Array", tempCategories);

      }

        

    return(
        <ul>
           {categories.map((el)=>{
            return(
              <li key={el.parent.id}>
                <p>
                  {el.parent.name}
                </p>
                  <ul>
                    {el.children.map((childEl)=>{
                      return(
                        <li>{childEl.name}</li>
                      )
                    })}
                  </ul>

              </li>
            )
           })}
        </ul>
    )


}