import React from 'react';
import './RegisterPopUp.scss'

export default function RegisterPopUp() {

    console.log('Run PopUp')

  return (
    <div className='register-popup'>
        <h1>Register</h1>
        <form>
            <label >
                First Name:
                <input type='text'></input>
            </label>
            <label >
                Last Name:
                <input type='text'></input>
            </label>
            <label >
                Email:
                <input type='text'></input>
            </label>
            <label for="password">
                Password:
                <input type='text' id='password'></input>
            </label>
            <input type='submit' value='Send'/>
        </form>
    </div>
  )
}
