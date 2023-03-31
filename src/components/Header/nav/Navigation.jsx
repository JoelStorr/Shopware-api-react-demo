import React, { useState, useEffect } from "react";

import axios from "axios";

export default function Navigation() {
  const shopwareDomain = "http://localhost/store-api/";
  const [fetchedData, setFetchedData] = useState(false);
  const [sortedSub, setSortedSub] = useState(false);
  const [categories, setCategories] = useState([]);

  let data = null;

  useEffect(() => {
    /*  if(!dataLoaded){
          apiVal();
          setDataLoaded(true)
        } */

    //setCategories([]);
    apiVal();
  }, []);



  useEffect(()=>{
    if(fetchedData){
      sortSubCategories();
    }
  },[fetchedData])


  //NOTE: Change API Key
  function apiVal (){
    axios({
      method: "post",
      url: `${shopwareDomain}category`,
      headers: { "sw-access-key": "SWSCWDHDQLQ4UM9YZZZIEUXLBQ" },
    }).then((res) => {
      //console.log(res.data.elements);
      //setCategories([]);
      orderNav(res.data.elements);
    });
  };

  //NOTE: Only allows for one Child Categorie right now
  //TODO: Make sure that there are no duplicates in Categories Array when data is called again.--- done

  function orderNav(queryResElemetns) {
    const tempCategories = [];

    queryResElemetns.forEach((element) => {
      //console.info(element);

      if (
        element.parentId === null &&
        !tempCategories.some((ele) => element.name == ele.parent.name)
      ) {
        //console.log("Is base element");

        const categoryConversionObject = { parent: element, children: [] };

        tempCategories.push(categoryConversionObject);
        //console.info(tempCategories);
      } else if (element.parentId != null && tempCategories.length > 0) {
        const parent = tempCategories.find((ele) => {
          return ele.parent.id == element.parentId;
        });

        //console.log(parent);

        parent.children.push(element);
      }
    });
    setCategories(tempCategories);

    // TODO: Reorder Children based on ID --- done
    setFetchedData(true);
  }

  // TODO: Make sorting Class that can resort elements based on afterCategorieId
  function sortSubCategories() {
    const categoreisCopy = [...categories];

    //console.log('Sort Sub Categories');

    //console.log(categoreisCopy);

    categoreisCopy.forEach((element) => {
      
      
      
      //console.log("entered foreach loop");
  

      //Match afterId to prev id
      let sortedArray = element.children.sort((val1, val2)=>{
          if(val1.afterCategoryId === null){
            return -1;
          }else if(val2.afterCategoryId === null){
            return 1;
          }else if(val1.afterCategoryId.normalize() === val2.id.normalize()){
            return 1;
          }else if(val2.afterCategoryId.normalize() === val1.id.normalize()){
            return -1;
          }
          return 0;

        })
      

      //Send it back into the State
        
        console.log(sortedArray);
        element.children = sortedArray

    });


    setCategories(categoreisCopy);
    console.log('Categoreis:', categories);
    setSortedSub(true);

  }


  return (
    <ul>
      {sortedSub && categories.map((el) => {
        return (
          <li key={el.parent.id}>
            <p>{el.parent.name}</p>
            <ul>
              {el.children.map((childEl) => {
                return <li key={childEl.id}>{childEl.name}</li>;
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
