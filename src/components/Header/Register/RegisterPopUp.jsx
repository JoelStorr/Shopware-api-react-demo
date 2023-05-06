import React, { useEffect, useState } from "react";

import apiRequest, {
  RequestType,
} from "../../../helper/shopware api/apiHelper";
import "./RegisterPopUp.scss";

export default function RegisterPopUp() {
  const [pronounce, setPronounce] = useState([]);
  const [registerForm, setRegisterForm] = useState({
    pronounce: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  useEffect(() => {
    apiRequest(RequestType.salutation, {}).then((res) => {
      setPronounce(res);
      setRegisterForm((prev)=>{return { ...prev, pronounce: res[0].salutationKey };})
    });
  }, []);

  function formHandler(e) {
    console.log(e.target.id);

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
    if (
      registerForm.pronounce != null &&
      registerForm.firstName != "" &&
      registerForm.lastName != "" &&
      registerForm.email != "" &&
      registerForm.password != "" &&
      registerForm.checkPassword != ""
    ) {
      apiRequest(RequestType.register, {register : registerForm}).then((res)=>console.log(res))
    }else{
      console.error('Pleas enter form Correctly');
      console.log(registerForm)
    }
  }

  console.log("Run PopUp");

  return (
    <div className="register-popup">
      <h1>Register</h1>
      <form onSubmit={(e)=>formSender(e)}>
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
