import React, { useEffect, useState } from "react";
import { useTlStore } from "../../../store/store";
import { gsap } from "gsap";
import "./ShopDetailOverlay.scss";
import { useFrame } from "@react-three/fiber";

import { getProductList } from "../../../helper/shopware api/apiProductHelper";

export default function ShopDetailOverlay() {
  const [detailsActive, setDetailsActive] = useState(false);
  const [activeElementRef, setActiveElementRef] = useState(null);
  const [productList, setProductList] = useState([]);
/*   const [productListLength, setProductListLength] = useState(null); */
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  useEffect(() => {
    const unsubscribeTl1 = useTlStore.subscribe(
      (state) => state.tl1,
      (tl1) => {
        if (tl1.isRunning) {
          console.log("running element one detail");
          console.log(tl1.groupRef);
          setDetailsActive("tl1");
          setActiveElementRef(tl1.groupRef);
        } else if (detailsActive === "tl1" && !tl1.isRunning) {
          setDetailsActive(false);
        }
      }
    );

    const unsubscribeTl2 = useTlStore.subscribe(
      (state) => state.tl2,
      (tl2) => {
        if (tl2.isRunning) {
          console.log("running element two detail");
          setDetailsActive("tl2");
          setActiveElementRef(tl2.groupRef);
        } else if (detailsActive === "tl2" && !tl2.isRunning) {
          setDetailsActive(false);
        }
      }
    );

    console.log(activeElementRef);
    return () => {
      unsubscribeTl1();
      unsubscribeTl2();
    };
  }, []);

  /* NOTE: Get Product List for categorie */
  /* TODO: Remove Placeholder Value  */
  /* TODO: Fix React Async Error on Call */
  /* NOTE: Calculated data length on the Fly and not on data fetch ?  */
  const tempCategorieID = "929de9a601d346e49f23861b67d6575e";

  useEffect(() => {
    if (detailsActive) {
      getProductList(tempCategorieID)
        .then((val) => {
          console.log('return Fetch Val: ', val)
          setProductList(val);
          return Promise.resolve(val);
        })
        .then((val2) => {

          console.log('Fetch Val:', val2)
          
  /*         setProductListLength(()=>{return val2.length}); */
          return;
        })
        .then((val)=>{
        /*   console.log(productListLength); */
          console.log(productList[0])
        }).catch(e=>console.error(e));
        
    }
  }, [detailsActive]);



  async function fetchProdList(){
    let data = await getProductList(tempCategorieID);
    setProductList((prev)=>data);
    /* setProductListLength(productList.length); */

  }



  /* NOTE: Animation Logic */

  /* TODO: When out of Product range you have to deactivate the Direction Button */

  function moveRefLeft() {

    setActiveProductIndex(()=>activeProductIndex - 1);
    console.log(activeProductIndex);

    gsap.to(activeElementRef.position, {
      duration: 2,
      z: activeElementRef.position.z + 0.5,
      ease: "power4",
    });
  }
  function moveRefRight() {

     setActiveProductIndex(()=> activeProductIndex + 1);
      console.log(activeProductIndex);

    gsap.to(activeElementRef.position, {
      duration: 2,
      z: activeElementRef.position.z - 0.5,
      ease: "power4",
    });
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
                  <p>{productList[activeProductIndex].available ? 'In Stock' : 'Comming back soon'}</p>
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
