import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useFrame } from "@react-three/fiber";


import "./ShopDetailOverlay.scss";
import  useUIStore  from "../../../store/store";
import { getProductList } from "../../../helper/shopware api/apiProductHelper";
import StoreApiRequest, {orderItem} from "../../../helper/shopware api/apiHelper";

export default function ShopDetailOverlay() {

  const [detailsActive, setDetailsActive] = useState(false);
  const [lastDetailsActive, setLastDetailsActive] = useState({
    lastDetails: null,
    lastActiveProductIndex: null,
  });
  const [activeElementRef, setActiveElementRef] = useState(null);
  const [productList, setProductList] = useState([]);
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  const [categoryID, setCategoryID] = useState();
  const userContextToken = useUIStore((state) => state.userContextToken);
  

  useEffect(() => {
    const unsubscribeTl = useUIStore.subscribe(
      (state) => state,
      (state) => {
        if (state.tl1.isRunning) {
          setDetailsActive("tl1");
          setActiveElementRef(state.tl1.groupRef);
          setCategoryID(state.tl1.categoryID);
        } else if (state.tl2.isRunning) {
          setDetailsActive("tl2");
          setActiveElementRef(state.tl2.groupRef);
          setCategoryID(state.tl2.categoryID);
        } else if (!state.tl1.isRunning && !state.tl2.isRunning) {
          setDetailsActive(false);
          setActiveProductIndex(0);
        }
      }
    );

    return () => {
      unsubscribeTl();
    };
  }, []);

  /* NOTE: Get Product List for categorie */

  /* NOTE: Calculated data length on the Fly and not on data fetch ?  */

  useEffect(() => {
    if (detailsActive) {
      getProductList(categoryID)
        .then((val) => {
          setProductList(val);
        })
        .then((val2) => {
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

          return;
        })
        .catch((e) => console.error(e));
    } else {
      if (activeElementRef) {
        if (lastDetailsActive.lastDetails === "tl1") {
          gsap.to(activeElementRef.position, {
            duration: 1,
            z:
              activeElementRef.position.z +
              0.5 * lastDetailsActive.lastActiveProductIndex,
            ease: "power4",
          });
        } else if (lastDetailsActive.lastDetails === "tl2") {
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
  useEffect(() => {
    setLastDetailsActive((prev) => ({
      ...prev,
      lastActiveProductIndex: activeProductIndex,
    }));
  }, [activeProductIndex]);

  function moveRefLeft() {
    setActiveProductIndex((prev) => prev - 1);

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
    setActiveProductIndex((prev) => prev + 1);

    if (detailsActive === "tl1") {
      gsap.to(activeElementRef.position, {
        duration: 2,
        z: activeElementRef.position.z - 0.5,
        ease: "power4",
      });
    } else if (detailsActive === "tl2") {
      gsap.to(activeElementRef.position, {
        duration: 2,
        z: activeElementRef.position.z + 0.8,
        ease: "power4",
      });
    }
  }


  function addToCart(productID){

    if(userContextToken === null){
      console.error('User Context Token was not Properly set')
      return;
    }

    let orderElement = new orderItem({id: productID, quantity: 1}).makeObj();
    console.log('Oder Data Check', [orderElement]);

    StoreApiRequest.addToCart(userContextToken, [orderElement] ).then(res=>console.log('Add to Cart', res))
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
                    {productList[activeProductIndex].calculatedPrice.unitPrice}€
                  </h2>
                  <span>
                    {productList[activeProductIndex].available
                      ? "In Stock"
                      : "Comming back soon"}
                  </span>
                </div>
              </div>
              <p className="text-box">
                {productList[activeProductIndex].description}
              </p>
              <div className="detailScreen-btn-box">
                <button>Remember Later</button>
                <button onClick={()=>addToCart(productList[activeProductIndex].id)}>Add to Cart</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
