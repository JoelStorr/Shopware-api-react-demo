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
        
      

        queryResElemetns.forEach(element => {
          console.info(element);

          if(
              element.parentId === null 
              && !categories.some(ele => element.name == ele.parent.name)
            ){
              console.log('Is base element');
            setCategories(prevState => [...prevState, element]);
          }

          


      /*     if(element.parentId === null){
            setCategories(()=>{categories.push({ parent: element, children: [] });})
          }else{
            if(categories.length < 1 ){
              console.error('Something whent wrong when fetching Parent Data');
              return;
            }
            let parentCategorei = categories.find(ele => ele.id === element.parentId);
            if(parentCategorei){
              parentCategorei.children.push(element);
            }
          } */

      
        });


    

      }

        console.log("State Array", categories);
        

    return(
        <ul>
           
        </ul>
    )


}