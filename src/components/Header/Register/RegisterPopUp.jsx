import React, { useEffect, useState } from "react";

import StoreApiRequest from "../../../helper/shopware api/apiHelper";
import "./RegisterPopUp.scss";

/* TODO: Set Context Token to User Store */
/* TODO: Set Country Data on Dropdown with Adress Info */
/* TODO: Make two Step Sign up Process */
/* TODO: Front End Form Validation */
/* TODO: Make sign up impossible until form is propperly fild in */

export default function RegisterPopUp() {
  const [pronounce, setPronounce] = useState([]);
  const [countries, setCountries] = useState([]);
  const [signUpStage, setSignupStage] = useState(1);
  const [registerForm, setRegisterForm] = useState({
    pronounce: null,
    contextToken: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    checkPassword: "",
    street: "",
    zipcode: "",
    city: "",
    countryID: null,
  });

  useEffect(() => {
    StoreApiRequest.salutation().then((res) => {
      console.log(res);
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

    StoreApiRequest.getContext().then((res) =>
      setRegisterForm((prev) => {
        return { ...prev, contextToken: res.token };
      })
    );

    /* getExtraFormInfo(); */
  }, []);

  useEffect(() => {
    console.log(registerForm);
  }, [registerForm]);

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

  function formSender(e, stage) {
    e.preventDefault();
    console.log("Run form function");
    if (stage == 1) {
      setSignupStage(2);
    } else if (stage == 2 && signUpStage == 2) {
      StoreApiRequest.registerUser(registerForm)
        .then((res) => console.log(res))
        .catch((e) => {
          console.error(e);
        });
    } else {
      console.error("Pleas enter form Correctly");
      console.log(registerForm);
    }
  }

  function onChangeStage(stage) {
    setSignupStage(stage);
    console.log(signUpStage);
  }

  return (
    <div className="register-popup">
      <h1>Register</h1>
      <h2>Personal Information</h2>

      {signUpStage == 1 && (
        <div className="register-popup-stage-one">
          <h3>Personal Information</h3>
          <form onSubmit={(e) => formSender(e, 1)}>
            <label>
              Pronounce:
              <select onChange={formHandler} id="pronounce-select" required>
                {pronounce.map((val) => (
                  <option value={val.id} key={val.id}>
                    {val.displayName}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              First Name:
              <input
                type="text"
                id="first-name"
                value={registerForm.firstName}
                onChange={formHandler}
                required
              ></input>
            </label>
            <label>
              Last Name:
              <input
                type="text"
                id="last-name"
                value={registerForm.lastName}
                onChange={formHandler}
                required
              ></input>
            </label>
            <br />
            <label>
              Email:
              <input
                type="text"
                id="email"
                value={registerForm.email}
                onChange={formHandler}
                required
              ></input>
            </label>
            <br />
            <label htmlFor="password">
              Password:
              <input
                type="text"
                id="password"
                value={registerForm.password}
                onChange={formHandler}
                required
              ></input>
            </label>
            <label htmlFor="password">
              Check Password:
              <input
                type="text"
                id="check-password"
                value={registerForm.checkPassword}
                onChange={formHandler}
                required
              ></input>
            </label>
            <br />
            <button type="submit">Step 2</button>
          </form>
        </div>
      )}

      {signUpStage == 2 && (
        <div className="register-popup-stage-one">
          <form onSubmit={(e) => formSender(e, 2)}>
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
            <br />
            <button onClick={() => onChangeStage(1)}>Back 1</button>
            <input type="submit" value="Send" />
          </form>
        </div>
      )}
    </div>
  );
}
