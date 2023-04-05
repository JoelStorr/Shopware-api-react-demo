import React, { useState, useEffect } from "react";
import axios from "axios";

import './Navigation.scss';

export default function Navigation() {
  const shopwareDomain = "http://localhost/store-api/";
  const [fetchedData, setFetchedData] = useState(false);
  const [sortedSub, setSortedSub] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [endOfDemo, setEndOfDemo] = useState(false)

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


 function handleMouseOver(el){
    setIsHovering(el.parent.id);
  }

  function handleMouseOut (el){
    setIsHovering(false);
  }






 //TODO: Match the CLiked ID of Subcategoreis to the Coresponding Portion of the 3D view
  function onClickHandler(el){
    console.log(el);

    if(el.parentId != categories[0].parent.id){
      console.log('This is not part of the Demo');
      setEndOfDemo(true);
      return
    }


    scrollTo(el.id);

  }

    function scrollTo(id, isId = true) {
      if (id[0] != "." && !isId) {
        id = "." + id;
        id = id.normalize()
      } else if (id[0] != "#" && isId) {
        id = "#" + id;
        id = id.normalize();
      }
      const element = document.querySelector(id);
      window.scrollTo({
        top: element?.getBoundingClientRect().top,
        left: 0,
        behavior: "smooth",
      });


      console.log('Tried Scrolling')
    }




  return (
    <>
    <ul className="header--nav--mainCategoriesList">
      {sortedSub && categories.map((el) => {
        return (
          <li
            key={el.parent.id}
            className={
              el.parent.id === isHovering
                ? "header--nav--mainCategories header--nav--active"
                : "header--nav--mainCategories"
            }
            onMouseOver={() => handleMouseOver(el)}
            onMouseOut={() => handleMouseOut(el)}
          >
            <p>{el.parent.name}</p>

            {el.parent.id === isHovering ? (
              <ul className="header--nav--subcategoriesList">
                {el.children.map((childEl) => {
                  return (
                    <li
                      key={childEl.id}
                      className="header--nav--subCategories "
                      onClick={() => onClickHandler(childEl)}
                    >
                      {childEl.name}
                    </li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </li>
        );
      })}
    </ul>

    {endOfDemo &&(
      <div className="header--endDemoPopUp" onClick={()=>setEndOfDemo(false)}>
        <div>
          <h1>This is the End of the Demo</h1>
          <h3>For this demo only {categories[0].parent.name} was implementd</h3>
          <p>Click any where to return</p>
        </div>
      </div>
    )}
    </>
  );
}
