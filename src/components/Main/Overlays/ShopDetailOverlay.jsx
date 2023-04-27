import React, { useEffect, useState } from "react";
import { useTlStore } from "../../../store/store";
import { gsap } from "gsap";
import "./ShopDetailOverlay.scss";
import { useFrame } from "@react-three/fiber";

import { getProductList } from "../../../helper/shopware api/apiProductHelper";

export default function ShopDetailOverlay() {
  const [detailsActive, setDetailsActive] = useState(false);
  const [lastDetailsActive, setLastDetailsActive] = useState({
    lastDetails: null,
    lastActiveProductIndex: null,
  });
  const [activeElementRef, setActiveElementRef] = useState(null);
  const [productList, setProductList] = useState([]);
/*   const [productListLength, setProductListLength] = useState(null); */
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  const [categoryID, setCategoryID] = useState();

  useEffect(() => {
    const unsubscribeTl = useTlStore.subscribe(
      (state) => state,
      (state) => {
        if (state.tl1.isRunning) {
          setDetailsActive("tl1");
          setActiveElementRef(state.tl1.groupRef);
          setCategoryID(state.tl1.categoryID);

        }else if(state.tl2.isRunning){
          setDetailsActive("tl2");
          setActiveElementRef(state.tl2.groupRef);
          setCategoryID(state.tl2.categoryID);

        } else if (!state.tl1.isRunning && !state.tl2.isRunning) {
          
          setDetailsActive(false);
          setActiveProductIndex(0);
        }
      }
    );

    /* console.log(activeElementRef); */
    return () => {
      unsubscribeTl();
    
    };
  }, []);

  /* NOTE: Get Product List for categorie */
  /* TODO: Remove Placeholder Value  */
  /* TODO: Fix React Async Error on Call */
  /* NOTE: Calculated data length on the Fly and not on data fetch ?  */
  const tempCategorieID = "929de9a601d346e49f23861b67d6575e";

  useEffect(() => {
    if (detailsActive) {
      getProductList(categoryID)
        .then((val) => {
          console.log('return Fetch Val: ', val)
          setProductList(val);
          /* return Promise.resolve(val); */
        })
        .then((val2) => {
          console.log('Details Check: ')
          console.log(detailsActive);
          console.log(activeProductIndex)
          if (
            detailsActive === "tl1" ||
            detailsActive === "tl2" ||
            detailsActive === "tl3"
          ) {
            setLastDetailsActive({
              lastDetails: detailsActive,
              lastActiveProductIndex: activeProductIndex,
            });
          }


          /* console.log('Fetch Val:', val2) */ 
          /* setProductListLength(()=>{return val2.length}); */
          return;
        })
        .then((val)=>{
          /* console.log(productListLength); */
          /* console.log(productList[0]) */
        }).catch(e=>console.error(e));
        
    }else{
      if(activeElementRef){
        console.log('Last detail info:', lastDetailsActive);
        if(lastDetailsActive.lastDetails === 'tl1'){
          console.log('Offset - Runner');
          gsap.to(activeElementRef.position, {
            duration: 1,
            z:
              activeElementRef.position.z +
              0.5 * lastDetailsActive.lastActiveProductIndex,
            ease: "power4",
          });
        }else if(lastDetailsActive.lastDetails === 'tl2'){
          gsap.to(activeElementRef.position, {
            duration: 1,
            z:
              activeElementRef.position.z -
              0.8 * lastDetailsActive.lastActiveProductIndex,
            ease: "power4",
          });
        }
      }
    }
  }, [detailsActive]);







  /* NOTE: Animation Logic */

  /* TODO: When out of Product range you have to deactivate the Direction Button */


  useEffect(() => {
    console.log("ActiveProductIndex:", activeProductIndex);
    setLastDetailsActive((prev) => ({
      ...prev,
      lastActiveProductIndex: activeProductIndex,
    }));
  }, [activeProductIndex]);


  function moveRefLeft() {

    setActiveProductIndex((prev)=>prev - 1);
   

   
    if (detailsActive === "tl1") {
       gsap.to(activeElementRef.position, {
         duration: 2,
         z: activeElementRef.position.z + 0.5,
         ease: "power4",
       });

    } else if (detailsActive === "tl2") {
      gsap.to(activeElementRef.position, {
        duration: 2,
        z: activeElementRef.position.z - 0.8,
        ease: "power4",
      });

    }


  }

  

  function moveRefRight() {

     setActiveProductIndex((prev)=> prev + 1);
   

      if(detailsActive === 'tl1'){
        gsap.to(activeElementRef.position, {
          duration: 2,
          z: activeElementRef.position.z - 0.5,
          ease: "power4",
        });

      }else if( detailsActive === 'tl2'){
         gsap.to(activeElementRef.position, {
           duration: 2,
           z: activeElementRef.position.z + 0.8,
           ease: "power4",
         });
      }
      
  }


 

  return (
    <>
      {detailsActive && productList.length > 0 && (
        <div className="shopDetailOverlay">
          <div className="detailScreen-button-spacer">
            <div className={activeProductIndex > 0 ? "" : "nextProdHider"}>
              <button onClick={moveRefLeft}>prev</button>
            </div>
            <div
              className={
                activeProductIndex < productList.length - 1
                  ? ""
                  : "nextProdHider"
              }
            >
              <button onClick={moveRefRight}>next</button>
            </div>
          </div>

          {productList.length > 0 && (
            <div className="detailScreen-detail-box">
              <div className="box-header">
                <div>
                  <h1>{productList[activeProductIndex].name}</h1>
                  <p>by {productList[activeProductIndex].manufacturer.name}</p>
                </div>
                <div>
                  <h2>
                    {productList[activeProductIndex].calculatedPrice.unitPrice}
                    €
                  </h2>
                  <span>{productList[activeProductIndex].available ? 'In Stock' : 'Comming back soon'}</span>
                </div>
              </div>
              <p className="text-box">
                {productList[activeProductIndex].description}
              </p>
              <div className="detailScreen-btn-box">
                <button>Remember Later</button>
                <button>Add to Cart</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
