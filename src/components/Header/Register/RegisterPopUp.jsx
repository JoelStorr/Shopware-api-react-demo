import React, { useEffect, useState } from 'react';


import apiRequest, {RequestType} from '../../../helper/shopware api/apiHelper';
import './RegisterPopUp.scss';


export default function RegisterPopUp() {


    const [pronounce, setPronounce] = useState([]);
    const [registerForm, setRegisterForm] = useState({
        pronounce: null,
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        checkPassword: null,
    });
    


    useEffect(()=>{
        apiRequest(RequestType.salutation).then((res)=>{setPronounce(res)});
    },[])


    function formHandler(e){
        console.log(e.target.id);

        switch(e.target.id){
            case 'pronounce-select':
                setRegisterForm((prev)=>{return { ...prev, pronounce: e.target.value };})
                break;
            case 'first-name':
                 setRegisterForm((prev) => {
                   return { ...prev, firstName: e.target.value };
                 });
                 break;
            case 'last-name':
                 setRegisterForm((prev) => {
                   return { ...prev, lastName: e.target.value };
                 });
                 break;
            case 'email':
                 setRegisterForm((prev) => {
                   return { ...prev, email: e.target.value };
                 });
                 break;
            case 'password':
                  setRegisterForm((prev) => {
                    return { ...prev, password: e.target.value };
                  });
                  break;
            case 'check-password':
                 setRegisterForm((prev) => {
                   return { ...prev, checkPassword: e.target.value };
                 });
                 break;
            default:
                console.error('Probably Typo in form type');
                break;
        }


    }


    console.log('Run PopUp');

  return (
    <div className="register-popup">
      <h1>Register</h1>
      <form>
        <label>
          Pronounce:
          <select onChange={formHandler} id="pronounce-select">
            {pronounce.map((val) => (
              <option value={val.salutationKey} key={val.salutationKey}>
                {val.displayName}
              </option>
            ))}
          </select>
        </label>
        <label>
          First Name:
          <input type="text" id='first-name'></input>
        </label>
        <label>
          Last Name:
          <input type="text" id="last-name"></input>
        </label>
        <label>
          Email:
          <input type="text" id="email"></input>
        </label>
        <label htmlFor="password">
          Password:
          <input type="text" id="password"></input>
        </label>
        <label htmlFor="password">
          Check Password:
          <input type="text" id="check-password"></input>
        </label>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
