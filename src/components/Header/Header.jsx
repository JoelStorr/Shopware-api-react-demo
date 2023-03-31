import React from 'react';

import Navigation from './nav/Navigation';

import './Header.scss';




export default function MainHeader(){


    return(
        <div className='header--mainHeader'>
            <div className='header--companyName'>
                <h1>Logo Placeholder</h1>
                <div className="header--searchContainer">
                    <p>Search PlaceHolder</p>

                </div>
                <div className="header--signin">
                    <button>LogIn</button>
                    <button>Register</button>
                </div> 

            </div>
        <Navigation />
        

        </div>

        
    )

}