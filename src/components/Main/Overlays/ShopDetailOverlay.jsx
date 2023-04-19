import React, { useEffect } from 'react'
import { useTlStore } from '../../../store/store';

import './ShopDetailOverlay.scss';

export default function ShopDetailOverlay() {

  useEffect(()=>{
    const unsubscribeTl = useTlStore.subscribe(
      (state)=>state.tl1,
      (tl1) => {
        if(tl1.isRunning){
          console.log('running element one detail')
        }else{
          console.log('removed element one detail')
        }
      }
    );

    return ()=>{
      unsubscribeTl();
    }
  })




  return (
    <div className="shopDetailOverlay">
        Hello World
    </div>
  );
}
