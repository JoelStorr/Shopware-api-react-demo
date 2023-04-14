
import React, {useState, useRef, useLayoutEffect}from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  GizmoHelper,
  GizmoViewport,
  useGLTF,
  useHelper,
} from "@react-three/drei";
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
  /*   state.camera.lookAt(0, 1, 0); */
    /*   tl.current.seek(scroll.offset * tl.current.duration()); */

/*     console.log(tl1.isActive());
    -> Can use it to render the Instance of the Shop Elent based on the Active Animation State
    tl1.isActive() ? state.camera.lookAt(0,1,0) : null; 
    tl2.isActive() ? state.camera.lookAt(-300,0,-5) : null;  */

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

  /* TODO: Animation Baseic */
  /* MultiScroll Animation */
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".box1",
      markers: true,
      start: "top 80%",
      end: "top 30%",
      scrub: false,
      toggleActions: "play none reverse none",
    },
  });

  /*   tl1.from(camera.position, { x: -1.5, y: 2.5, z: -2.5 }); */

  tl1.to(camera.position, { duration: 4, x: -3, y: 1.8, z: 0 });
  tl1.to(camera.rotation, { duration: 4, x: 0, y: -(Math.PI * 0.5), z: 0 }, '<');

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".box2",
      markers: true,
      start: "top 80%",
      end: "top 30%",
      scrub: false,
      toggleActions: "play none reverse none",
    },
  });

  tl2.to(camera.position, { duration: 4, x: -2.5, y: 1.5, z: -0.5 });
  tl2.to(
    camera.rotation,
    { duration: 4, x: 0, y: (Math.PI * 0.5), z: 0 },
    "<"
  );


  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".box3",
      markers: true,
      start: "top 80%",
      end: "top 30%",
      scrub: false,
      toggleActions: "play none reverse none",
    },
  });

  tl3.to(camera.position, { duration: 4, x: -1, y: 1.5, z: 4 });
  tl3.to(camera.rotation, { duration: 4, x: -(Math.PI * 0.1), y: Math.PI * 0, z: 0 }, "<");

  return (
    <group {...props} dispose={null}>
      <pointLight position={[-2, 4, 0]} intensity={0.5} />

      <pointLight position={[-2, 0, 0]} intensity={0.5} />
     
      <GizmoHelper
        alignment="bottom-right" 
        margin={[80, 80]}

>
  <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />

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

