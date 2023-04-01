
import React from 'react';
import { Canvas } from '@react-three/fiber';


import './Main.scss';

export default function Main(){

    return(
        <>
   
            <mesh>
                <torusGeometry />
                <meshNormalMaterial />
            </mesh>
       

        </>
    )

}

