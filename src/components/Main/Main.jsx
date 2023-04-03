
import React from 'react';




import './Main.scss';

export default function Main(){

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

        {/* Counter top left */}
        <mesh scale={[1, 1, 4]} position={[4, 0, 1]}>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>

        {/* Conter top back */}
        <mesh scale={[6, 1, 1]} position={[1.5, 0, 3.5]}>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
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

