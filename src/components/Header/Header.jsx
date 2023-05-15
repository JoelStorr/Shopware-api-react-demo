import React, { useEffect, useState } from 'react';

import Navigation from './nav/Navigation';

import './Header.scss';

import Login from './login/Login';
import Register from './register/Register';
import Search from './search/Search';
import ProfileButton from './user/ProfileButton';


export default function MainHeader({ userIsLoggedIn }) {
 

  return (
    <div className="header--mainHeader">
      <div className="header--companyName">
        <h1>Logo Placeholder</h1>
        <Search />
        <div className="header--signin">
          {!userIsLoggedIn && (
            <>
              <Login />
              <Register />
            </>
          )}
          {userIsLoggedIn && <ProfileButton />}
        </div>
      </div>
      <Navigation />
    </div>
  );
}