import React, { useEffect, useState } from "react";
import { useTlStore } from "../../../store/store";
import { gsap } from "gsap";
import "./ShopDetailOverlay.scss";
import { useFrame } from "@react-three/fiber";

export default function ShopDetailOverlay() {
  const [detailsActive, setDetailsActive] = useState(false);
  const [activeElementRef, setActiveElementRef] = useState(null);

  useEffect(() => {
    const unsubscribeTl1 = useTlStore.subscribe(
      (state) => state.tl1,
      (tl1) => {
        if (tl1.isRunning) {
          console.log("running element one detail");
          console.log(tl1.groupRef);
          setDetailsActive('tl1');
          setActiveElementRef(tl1.groupRef);
        } else if(detailsActive === "tl1" && !tl1.isRunning){
          setDetailsActive(false)
        }
      }
    );

    const unsubscribeTl2 = useTlStore.subscribe(
      (state)=> state.tl2,
      (tl2) => {
        if(tl2.isRunning){
          console.log("running element two detail");
          setDetailsActive('tl2');
          setActiveElementRef(tl2.groupRef);
        }else if (detailsActive === "tl2" && !tl2.isRunning) {
          
            setDetailsActive(false);
         
        }
      }
    );

    console.log(activeElementRef);
    return () => {
      unsubscribeTl1();
      unsubscribeTl2();
    };
  });

  function moveRefLeft() {
   

    gsap.to(activeElementRef.position, {
      duration: 2,
      z: activeElementRef.position.z + 0.5,
      ease: "power4",
    });
  }
  function moveRefRight() {
    

    gsap.to(activeElementRef.position, {
      duration: 2,
      z: activeElementRef.position.z - 0.5,
      ease: "power4",
    });
  }

  return (
    <>
      {detailsActive && (
        <div className="shopDetailOverlay">
          <div className="detailScreen-button-spacer">
            <button onClick={moveRefLeft}>left</button>
            <button onClick={moveRefRight}>right</button>
          </div>
          <div className="detailScreen-detail-box">
            <h1>Demo Data</h1>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </p>
          <div className="detailScreen-btn-box">
            <button>Remember Later</button>
            <button>Add to Cart</button>
          </div>
          </div>
        </div>
      )}
    </>
  );
}
