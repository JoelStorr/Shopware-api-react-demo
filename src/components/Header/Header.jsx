import React from 'react';

import Navigation from './nav/Navigation';

import './Header.scss';

import Login from './login/Login';
import Register from './register/Register';
import Search from './search/Search';

export default function MainHeader(){


    return(
        <div className='header--mainHeader'>
            <div className='header--companyName'>
                <h1>Logo Placeholder</h1>
                <Search />
                <div className="header--signin">
                    <Login />
                    <Register />
                </div> 

            </div>
            <Navigation />

        </div>

        
    )

}