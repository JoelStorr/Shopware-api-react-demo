import React, { useEffect, useState } from "react";

import StoreApiRequest from "../../../helper/shopware api/apiHelper";
import "./RegisterPopUp.scss";


/* TODO: Set Context Token to User Store */

export default function RegisterPopUp() {
  const [pronounce, setPronounce] = useState([]);
  const [countries, setCountries] = useState([]);
  const [registerForm, setRegisterForm] = useState({
    pronounce: null,
    countryID: null,
    contextToken: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  /* TODO: See why Prononce Broke */
  useEffect(() => {
    StoreApiRequest.salutation().then((res) => {
      console.log(res)
      setPronounce(res);
      setRegisterForm((prev) => {
        return { ...prev, pronounce: res[0].id };
      });
    });
    StoreApiRequest.getCountries().then((res) => {
      setCountries(res);
      setRegisterForm((prev) => {
        return { ...prev, countryID: res[0].id };
      });
    });

    StoreApiRequest.getContext().then((res)=>(
      setRegisterForm((prev) => {
        return { ...prev, contextToken: res.token };
      })
    ));

    /* getExtraFormInfo(); */
  }, []);

  

    useEffect(()=>{console.log(registerForm)},[registerForm])

  function formHandler(e) {
    console.log(e.target.value);

    switch (e.target.id) {
      case "pronounce-select":
        setRegisterForm((prev) => {
          return { ...prev, pronounce: e.target.value };
        });
        break;
      case "first-name":
        setRegisterForm((prev) => {
          return { ...prev, firstName: e.target.value };
        });
        break;
      case "last-name":
        setRegisterForm((prev) => {
          return { ...prev, lastName: e.target.value };
        });
        break;
      case "email":
        setRegisterForm((prev) => {
          return { ...prev, email: e.target.value };
        });
        break;
      case "password":
        setRegisterForm((prev) => {
          return { ...prev, password: e.target.value };
        });
        break;
      case "check-password":
        setRegisterForm((prev) => {
          return { ...prev, checkPassword: e.target.value };
        });
        break;
      default:
        console.error("Probably Typo in form type");
        break;
    }
  }

  function formSender(e) {
    e.preventDefault();
    console.log('Run form function')
    if (
      true
    ) {
      /* TODO: Fix Frontend Token Error */
        StoreApiRequest.registerUser(registerForm)
          .then((res) => console.log(res); )
          .catch((e) => {
            console.error(e);
          });
    
    } else {
      console.error("Pleas enter form Correctly");
      console.log(registerForm);
    }
  }

  return (
    <div className="register-popup">
      <h1>Register</h1>
      <form onSubmit={(e) => formSender(e)}>
        <label>
          Pronounce:
          <select onChange={formHandler} id="pronounce-select">
            {pronounce.map((val) => (
              <option value={val.id} key={val.id}>
                {val.displayName}
              </option>
            ))}
          </select>
        </label>
        <label>
          First Name:
          <input
            type="text"
            id="first-name"
            value={registerForm.firstName}
            onChange={formHandler}
          ></input>
        </label>
        <label>
          Last Name:
          <input
            type="text"
            id="last-name"
            value={registerForm.lastName}
            onChange={formHandler}
          ></input>
        </label>
        <label>
          Email:
          <input
            type="text"
            id="email"
            value={registerForm.email}
            onChange={formHandler}
          ></input>
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="text"
            id="password"
            value={registerForm.password}
            onChange={formHandler}
          ></input>
        </label>
        <label htmlFor="password">
          Check Password:
          <input
            type="text"
            id="check-password"
            value={registerForm.checkPassword}
            onChange={formHandler}
          ></input>
        </label>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
