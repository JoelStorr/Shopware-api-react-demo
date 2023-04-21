import React, { useState, useEffect } from "react";
import axios from "axios";

import './Navigation.scss';
import apiCategoriesHelper from "../../../helper/shopware api/apiCategoriesHelper";

export default function Navigation() {
  const shopwareDomain = "http://localhost/store-api/";
  const [fetchedData, setFetchedData] = useState(false);
  const [sortedSub, setSortedSub] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [endOfDemo, setEndOfDemo] = useState(false)



  useEffect(() => {
      apiCategoriesHelper()
        .then(
          (data)=>{
            setCategories(data)
            setSortedSub(true);
          }
        );

  }, []);

  useEffect(()=>{
    if(categories.length > 0){
      setSortedSub(true);
      console.log('------------ Sorted Data --------------')
      console.log(categories);
    }
  },[categories])


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
    
      const element = document.querySelector(`#shopId-${id}`);
      console.log(element)
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
