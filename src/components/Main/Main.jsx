
import React, {useState, useRef, useLayoutEffect}from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useHelper,  } from "@react-three/drei";
//import * as THREE from 'three';
import { PointLightHelper } from 'three/src/helpers/PointLightHelper';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';


import './Main.scss';



gsap.registerPlugin(ScrollTrigger);

export default function Main(props) {
  const { nodes, materials } = useGLTF("/src/assets/models/base-kitchen.glb");
  const tl = useRef();
  const camera = useThree((state) => state.camera);


  

  useFrame((state, delta) => {
    state.camera.lookAt(0, 1, 0);
  /*   tl.current.seek(scroll.offset * tl.current.duration()); */
  
  });

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





  return (
    <group {...props} dispose={null}>
  
      <pointLight position={[-2, 4, 0]} intensity={.5} />

      <pointLight position={[-2, 0, 0]} intensity={.5}/>
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials.Product}
        position={[-4.51, 1.33, -0.32]}
        scale={[-0.05, -0.05, -0.36]}
      />
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
    </group>
  );
}

useGLTF.preload("/src/assets/models/base-kitchen.glb");

