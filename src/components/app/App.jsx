/* NOTE: Node Modules */
import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import {useControls} from 'leva';


/* NOTE: Custom Imports */
import './App.scss';
import MainHeader from '../Header/Header';
import Main from '../Main/Main';
import BasePopUp from '../Main/PopUps/BasePopUp';

import ShopDetailOverlay from '../Main/Overlays/ShopDetailOverlay';
import CartButton from '../Main/Cart/CartButton';
import Cart from '../Main/Cart/Cart';
import CheckoutPopUp from '../Main/CheckOut/CheckoutPopUp';


/* NOTE: API Helper */
import StoreApiRequest, {devApiHelper} from '../../helper/shopware api/apiHelper';


/* NOTE: Store Import */
import  useUIStore  from '../../store/store';


function App() {

  /* NOTE: Handle PopUp Shown */
  const [popUpShown, setPopUpShown] = useState(null);
  const [cartShown, setCartShown] = useState(false);
  const [userIsLoggedIn, setUserIsLogedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const [checkouShown, setCheckoutShown] = useState(false);
  
  const setUserContextToken = useUIStore((state) => state.setUserContextToken);
  
 
  
   useEffect(()=>{
     let removeUISub = useUIStore.subscribe(
       (state) => state,
       (state) => {
        setPopUpShown(state.showPopUp);
        if(state.userContextToken != null){
          devApiHelper.loginCheck(state.userContextToken)
          .then((res)=>{
            /* console.log('Login Check', res); */
            if(res === '403'){
              setUserIsLogedIn(false);
            }else if( res.active === true ){
              console.log(res);
              setUserIsLogedIn(true);
              setUserData(res);
              
            }
          })
        }
      }
     );

      StoreApiRequest.getContext()
        .then((res)=>{ 
          setUserContextToken(res.token); 
          return res.token;
        }).then(res=>{
          return StoreApiRequest.makeCart(res);
        }).then((res)=>{/* console.log(res) */})
        .catch((e)=>console.error(e));
      

     return ()=>{
      removeUISub();
     }
   },[])
  
   /* NOTE: Dev Helper */
   /* useEffect(()=>{console.log('PopUp Shown', popUpShown)},[popUpShown]) */


 


  //NOTE: Change Leva route for Production
  const {orbitControls} = useControls({ orbitControls: false})
  //NOTE: Base Camera Values -> [3, 2, 3]
  return (
    <>
      <MainHeader userIsLoggedIn={userIsLoggedIn} userData={userData} />
      <ShopDetailOverlay />
      <CartButton setCartShown={setCartShown} />
      {popUpShown && <BasePopUp />}
      {cartShown && (
        <Cart
          setCartShown={setCartShown}
          userIsLoggedIn={userIsLoggedIn}
          setCheckoutShown={setCheckoutShown}
        />
      )}
      {checkouShown && (
        <CheckoutPopUp
          setCheckoutShown={setCheckoutShown}
          userIsLoggedIn={userIsLoggedIn}
        />
      )}
      {/* 3D Render Element */}
      <div className="renderBox">
        <Canvas camera={{ position: [3, 2, 3], rotation: [0, 1, 0] }}>
          {orbitControls && <OrbitControls />}
          <Environment background={false} blur={0} files="./assets/hdri/bg-hdri.hdr"  />
          <Main />
        </Canvas>
      </div>
      {/* Scroll Spacer */}
      <div className="top-spacer"></div>
      <div
        className="scroller box1"
        id="shopId-929de9a601d346e49f23861b67d6575e"
      >
        Wasserhan
      </div>
      <div
        className="scroller box2"
        id="shopId-2c297ef976e741caa67787d93b405866"
      >
        {" "}
        Handtuchhalter
      </div>
      <div
        className="scroller box3"
        id="shopId-88e526e83af241e5a29c1a2c26ab596a"
      >
        Harkensystheme
      </div>
    </>
  );
}

export default App
