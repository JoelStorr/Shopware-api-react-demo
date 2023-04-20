import React, { useEffect, useState } from "react";
import { useTlStore } from "../../../store/store";
import { gsap } from "gsap";
import "./ShopDetailOverlay.scss";
import { useFrame } from "@react-three/fiber";

export default function ShopDetailOverlay() {
  const [detailsActive, setDetailsActive] = useState(false);
  const [activeElementRef, setActiveElementRef] = useState(null);

  useEffect(() => {
    const unsubscribeTl = useTlStore.subscribe(
      (state) => state.tl1,
      (tl1) => {
        if (tl1.isRunning) {
          console.log("running element one detail");
          console.log(tl1.groupRef);
          setDetailsActive(true);
          setActiveElementRef(tl1.groupRef);
        } else {
          console.log("removed element one detail");
          setDetailsActive(false);
          setActiveElementRef(null);
        }
      }
    );

    console.log(activeElementRef);
    return () => {
      unsubscribeTl();
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
          </div>
        </div>
      )}
    </>
  );
}
