import React, { useEffect, useState } from 'react'
import { useTlStore } from '../../../store/store';

import './ShopDetailOverlay.scss';

export default function ShopDetailOverlay() {


  const [detailsActive, setDetailsActive] = useState(false);

  useEffect(()=>{
    const unsubscribeTl = useTlStore.subscribe(
      (state)=>state.tl1,
      (tl1) => {
        if(tl1.isRunning){
          console.log('running element one detail')
          setDetailsActive(true);
        }else{
          console.log('removed element one detail')
          setDetailsActive(false)
        }
      }
    );

    return ()=>{
      unsubscribeTl();
    }
    
    
    
  })

  return (
    <>
      {detailsActive && (
        <div className="shopDetailOverlay">
            <div className='detailScreen-button-spacer'>
              <button>
                left
              </button>
              <button>
                right
              </button>
            </div>
            <div className='detailScreen-detail-box'>
              <h1>Demo Data</h1>
            </div>
        </div>
  
      )}  
    </>

  );
}
