
import React, {useState, useRef, useLayoutEffect}from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';


import './Main.scss';
import { useScroll } from '@react-three/drei';

export default function Main(){


  const scroll = useScroll();
  const tl = useRef();
  const camera = useThree(state => state.camera);




      useFrame((state, delta) => {
        const angle = state.clock.elapsedTime;
        //state.camera.position.x = Math.sin(angle) * 8;
        //state.camera.position.z = Math.cos(angle) * 8;
        state.camera.lookAt(0, 0, 0);

        tl.current.seek(scroll.offset * tl.current.duration());

        console.log(scroll.offset)
      });

      useLayoutEffect(()=>{
        tl.current = gsap.timeline({
          defaults: {duration: 2, ease: "power1.inOut"},
        })

        tl.current
          .to(camera.position, {x: -1.5}, 2)
          .to(camera.position, {x: -1.4}, 6)
          .to(camera.position, {x: -1.3}, 11)
          .to(camera.position, {x: -1.2}, 13)
          .to(camera.position, {x: -1.1}, 16)
          .to(camera.position, {x: -1.0}, 20)

        console.log(camera.position)
      },[])

      



    return (
      <>
        {/* Center Block */}
        <mesh scale={[3, 1, 3]}>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>

        {/* Fridge */}
        <mesh scale={[1, 2, 1]} position={[4, 0.5, -1.5]}>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>

        {/* Countertop left */}
        <mesh scale={[1, 1, 4]} position={[4, 0, 1]}>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>

        {/* Countertop back */}
        <mesh scale={[6, 1, 1]} position={[1.5, 0, 3.5]}>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>

        {/* Cubbort */}
        <mesh scale={[4, 1, .5]} position={[1.5, 1.5, 4]}>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>

        <mesh scale={10} rotation-x={-Math.PI * 0.5} position={[0, -0.5, 0]}>
          <planeGeometry scale={5} />
          <meshBasicMaterial color={"lightBlue"} />
        </mesh>
      </>
    );

}

