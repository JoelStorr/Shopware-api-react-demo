import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  GizmoHelper,
  GizmoViewport,
  useGLTF,
  useHelper,
} from "@react-three/drei";
//import * as THREE from 'three';
import { PointLightHelper } from "three/src/helpers/PointLightHelper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

import { useTlStore } from "./../../store/store.js";

import "./Main.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Main(props) {
  const { nodes, materials } = useGLTF("/assets/models/base-kitchen.glb");
  const [loaded, setLoaded] = useState(false)
  const camera = useThree((state) => state.camera);
  const [tlIsActive, setTlIsActive] = useState("");

  const tl1Data = useTlStore((state) => state.tl1);
  const tl2Data = useTlStore((state) => state.tl2);
  const tl3Data = useTlStore((state) => state.tl3);

  const setTimelineOneState = useTlStore((state) => state.setTimelineOneState);
  const setTimelineTwoState = useTlStore((state) => state.setTimelineTwoState);
  const setTimelineThreeState = useTlStore(
    (state) => state.setTimelineThreeState
  );

  
  




    useEffect(()=>{
      setLoaded(true);

      setInterval(()=>{
        AnimationStateTracker();

      },500)

    },[])

    function AnimationStateTracker(){
      
      if(camera.position.x === tl1Data.position.x ){
        console.log('tl1 x matches');
        setTlIsActive('tl1');
      }else if(camera.position.x === tl2Data.position.x ){
        console.log('tl2 x matches');
        setTlIsActive("tl2");

      }else if(camera.position.x === tl3Data.position.x ){
        console.log('tl3 x matches');
        setTlIsActive("tl3");

      }else if(camera.position.x === 3){
        setTlIsActive(null);
      }

      
        
 
    }


  /*  useEffect(()=>{
    if(tl1IsActive != tl1Data.isRunning){
      setTimelineOneState();
    }
    if(tl2IsActive || tl2IsActive != tl2Data.isRunning){
      setTimelineOneState();
    }
    if(tl3IsActive || tl3IsActive != tl3Data.isRunning){
      setTimelineOneState();
    }
  },[tl1IsActive, tl2IsActive, tl3IsActive]) */

  //console.log(tl1Data);
  /*   console.log(tl1IsActive); */



  /* useLayoutEffect(() => {
    tl.current = gsap.timeline({
      defaults: { duration: 6, ease: "smooth" },
      marker: true,
    });

    tl.current


      .to(camera.position, { x: 2.63, y: 1, z: 0.01 }, 2)
      .to(camera.position, { x: 2.63, y: 1, z: 0.01 }, 4)
      .to(camera.position, { x: 2.63, y: 1, z: 0.01 }, 6);


  }, []); */

  /* TODO: Animation Baseic */
  /* MultiScroll Animation */

  const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: tl1Data.trigger,
        markers: true,
        start: "top 80%",
        end: "top 30%",
        scrub: false,
        toggleActions: "play none reverse reverse",
      },
    })
 

  tl1.to(camera.position, tl1Data.position);
  tl1.to(
    camera.rotation,
    tl1Data.rotation,
    "<"
  );

  const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: tl2Data.trigger,
        markers: true,
        start: "top 80%",
        end: "top 30%",
        scrub: false,
        toggleActions: "play none reverse reverse",
      },
    })
 

  tl2.to(camera.position, tl2Data.position);
  tl2.to(
    camera.rotation,
    tl2Data.rotation,
    "<"
  );

  
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: tl3Data.trigger,
      markers: true,
      start: "top 80%",
      end: "top 30%",
      scrub: false,
      toggleActions: "play none reverse none",
    },
  });

  tl3.to(camera.position, tl3Data.position);
  tl3.to(camera.rotation, tl3Data.rotation, "<");




    useFrame((state, delta) => {
      /*   state.camera.lookAt(0, 1, 0); */
      /*   tl.current.seek(scroll.offset * tl.current.duration()); */

      /*     console.log(tl1.isActive());
    -> Can use it to render the Instance of the Shop Elent based on the Active Animation State
    tl1.isActive() ? state.camera.lookAt(0,1,0) : null; 
    tl2.isActive() ? state.camera.lookAt(-300,0,-5) : null;  */

      /*  tl1.isActive() ? setTl1IsActive(true) : setTl1IsActive(false);
    tl2.isActive() ? setTl2IsActive(true) : setTl2IsActive(false);
    tl3.isActive() ? setTl3IsActive(true) : setTl3IsActive(false);

    console.log(tl1.isActive()); */

      /*   if(tl1.isActive()){
    setTlIsActive('tl1');
   }else if(tl2.isActive()){
    setTlIsActive('tl2');
   }else if(tl3.isActive()){
    setTlIsActive('tl3');
   } */

      /* tl1.current.isActive() ? setTlIsActive("tl1") : "";
      tl2.current.isActive() ? setTlIsActive("tl2") : ""; */
    });










  return (
    <group {...props} dispose={null}>
      <pointLight position={[-2, 4, 0]} intensity={0.5} />

      <pointLight position={[-2, 0, 0]} intensity={0.5} />

      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["red", "green", "blue"]}
          labelColor="black"
        />
      </GizmoHelper>

      {/* NOTE: Paset generated Mesh elements */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Middle_Block.geometry}
        material={materials["Furniture Base"]}
        position={[0, 0.5, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fridge.geometry}
        material={materials["Furniture Base"]}
        position={[-3.5, 0.01, 2.01]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Back_.geometry}
        material={materials["Furniture Base"]}
        position={[-3.5, 0, -3]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Back_001.geometry}
        material={materials["Furniture Base"]}
        position={[1, 0, -3.5]}
        rotation={[0, -1.56, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Back_002.geometry}
        material={materials["Furniture Base"]}
        position={[0.14, 1.42, -5]}
        rotation={[0, -1.56, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cinque.geometry}
        material={materials["Furniture Base"]}
        position={[-1.27, 0.75, 0]}
        scale={0.41}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Product}
        position={[-0.85, 1.29, -0.06]}
        scale={[0.06, 0.3, 0.06]}
      />
     {tlIsActive === 'tl1' && (  
        <>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.Product}
          position={[-0.85, 1.29, 0.43]}
          scale={[0.06, 0.3, 0.06]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials.Product}
          position={[-0.85, 1.29, 0.96]}
          scale={[0.06, 0.3, 0.06]}
        /> 
        </>
      
      )}

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials.Product}
        position={[-4.51, 1.33, -0.32]}
        scale={[-0.05, -0.05, -0.36]}
      />
      { tlIsActive === 'tl2' && (
        <>
          <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={materials.Product}
          position={[-4.51, 1.33, -1.17]}
          scale={[-0.05, -0.05, -0.36]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={materials.Product}
          position={[-4.51, 1.33, -1.98]}
          scale={[-0.05, -0.05, -0.36]}
        /> 

        </>
      )}
    </group>
  );
}

useGLTF.preload("/assets/models/base-kitchen.glb");
