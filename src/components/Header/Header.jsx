import React from 'react';

import Navigation from './nav/Navigation';

import './Header.scss';

import Login from './login/Login';
import Register from './Register/Register';


export default function MainHeader(){


    return(
        <div className='header--mainHeader'>
            <div className='header--companyName'>
                <h1>Logo Placeholder</h1>
                <div className="header--searchContainer">
                    <p>Search PlaceHolder</p>

                </div>
                <div className="header--signin">
                    <Login />
                    <Register />
                </div> 

            </div>
            <Navigation />

        </div>

        
    )

}