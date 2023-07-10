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

import  useUIStore  from "./../../store/store.js";

import "./Main.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Main(props) {
  const { nodes, materials } = useGLTF("/assets/models/base-kitchen.glb");
  const [loaded, setLoaded] = useState(false)
  const camera = useThree((state) => state.camera);
  const [tlIsActive, setTlIsActive] = useState("");

  const tl1Data = useUIStore((state) => state.tl1);
  const tl2Data = useUIStore((state) => state.tl2);
  const tl3Data = useUIStore((state) => state.tl3);

  const setTimelineOneState = useUIStore((state) => state.setTimelineOneState);
  const setTimelineTwoState = useUIStore((state) => state.setTimelineTwoState);
  const setTimelineThreeState = useUIStore((state) => state.setTimelineThreeState); 

 


  const setRefTl1 = useUIStore((state) => state.setRefTl1); 
  const setRefTl2 = useUIStore((state) => state.setRefTl2); 
  const setRefTl3 = useUIStore((state) => state.setRefTl3); 

  const focetGroupe = useRef();
  const towlHolder = useRef();
  const hookSystem = useRef();
  

  


    useEffect(()=>{
      setLoaded(true);
      setRefTl1(focetGroupe.current);
      setRefTl2(towlHolder.current);
      setRefTl3(hookSystem.current);

      setInterval(()=>{
        AnimationStateTracker();

      },500)

    },[])





    useEffect(()=>{

      tlIsActive == "tl1"
        ? setTimelineOneState(true)
        : setTimelineOneState(false);
      tlIsActive == "tl2"
        ? setTimelineTwoState(true)
        : setTimelineTwoState(false);
      tlIsActive == "tl3"
        ? setTimelineThreeState(true)
        : setTimelineThreeState(false);



    },[tlIsActive])


    function AnimationStateTracker(){
      
      if (

        camera.position.z === tl1Data.position.z
      ) {
        console.log("tl1 x matches");
        setTlIsActive("tl1");
      } else if (

        camera.position.z === tl2Data.position.z
      ) {
        console.log("tl2 x matches");
        setTlIsActive("tl2");
      } else if (

        camera.position.z === tl3Data.position.z
      ) {
        console.log("tl3 x matches");
        setTlIsActive("tl3");
      } else  {
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

  useLayoutEffect(() => {
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: tl1Data.trigger,
        markers: true,
        start: "top 50%",
        end: "top 45%",
        scrub: false,
        toggleActions: "play none reverse none",
      },
    });

    tl1.to(camera.position, tl1Data.position);
    tl1.to(camera.rotation, tl1Data.rotation, "<");

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: tl2Data.trigger,
        markers: true,
        start: "top 50%",
        end: "top 45%",
        scrub: false,
        toggleActions: "play none reverse none",
      },
    });

    tl2.to(camera.position, tl2Data.position);
    tl2.to(camera.rotation, tl2Data.rotation, "<");

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: tl3Data.trigger,
        markers: true,
        start: "top 50%",
        end: "top 45%",
        scrub: false,
        toggleActions: "play none reverse none",
      },
    });

    tl3.to(camera.position, tl3Data.position);
    tl3.to(camera.rotation, tl3Data.rotation, "<");
  }, []);

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
      <pointLight position={[-2, 4, 0]} intensity={1} />
      <pointLight position={[-2, 0, 0]} intensity={0.2} />
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
        position={[-0.632, 0.5, 0]}
        scale={[0.687, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fridge.geometry}
        material={materials["Furniture Base"]}
        position={[-3.5, 0.005, 2.012]}
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
        rotation={[0, -1.564, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Back_002.geometry}
        material={materials["Furniture Base"]}
        position={[0.141, 1.42, -5.003]}
        rotation={[0, -1.564, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cinque.geometry}
        material={materials["Furniture Base"]}
        position={[-1.513, 0.747, -0.003]}
        scale={[0.278, 0.414, 0.414]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stove.geometry}
        material={materials["Furniture Base"]}
        position={[-1, 1.025, -1.472]}
        scale={[0.654, 0.047, 0.391]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wood_panels.geometry}
        material={nodes.wood_panels.material}
        position={[0.072, 0.761, 1.935]}
        scale={[0.015, 0.766, 0.065]}
      />

      <group ref={focetGroupe}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Focet_001.geometry}
          material={materials.Product}
          position={[-1.232, 1.295, -0.065]}
          scale={[0.058, 0.305, 0.058]}
        />
        {/* Focets */}
        {tlIsActive === "tl1" && (
          <>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Focet_002.geometry}
              material={materials.Product}
              position={[-1.232, 1.295, 0.426]}
              scale={[0.058, 0.305, 0.058]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Focet_003.geometry}
              material={materials.Product}
              position={[-1.232, 1.295, 0.956]}
              scale={[0.058, 0.305, 0.058]}
            />
          </>
        )}
      </group>
      <group ref={towlHolder}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.hanger_001.geometry}
          material={materials.Product}
          position={[-4.514, 1.326, -0.323]}
          scale={[-0.052, -0.052, -0.356]}
        />
        {/* Handtuchhalter */}
        {tlIsActive === "tl2" && (
          <>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.hanger_002.geometry}
              material={materials.Product}
              position={[-4.514, 1.326, -1.168]}
              scale={[-0.052, -0.052, -0.356]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.hanger_003.geometry}
              material={materials.Product}
              position={[-4.514, 1.326, -1.983]}
              scale={[-0.052, -0.052, -0.356]}
            />
          </>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/assets/models/base-kitchen.glb");
