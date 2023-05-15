import React, { useEffect, useState } from "react";

import StoreApiRequest, {
  devApiHelper,
} from "../../../helper/shopware api/apiHelper";
import "./RegisterPopUp.scss";

import useUIStore from "../../../store/store";

/* TODO: Front End Form Validation */
/* TODO: Make sign up impossible until form is propperly fild in */
/* TODO: Fix form Placeholder Text */

export default function RegisterPopUp(props) {
  
  const [pronounce, setPronounce] = useState([]);
  const [countries, setCountries] = useState([]);
  const [signUpStage, setSignupStage] = useState(1);
  const [registerForm, setRegisterForm] = useState({
    pronounce: null,
    contextToken: null,
    countryID: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    checkPassword: "",
    street: "",
    zipcode: "",
    city: "",
  });

  const popUpSwitch = useUIStore((state) => state.setShowPopUp);
  const setUserContextToken = useUIStore(
    (state) => state.setUserContextToken
  );

  /* NOTE: Fetches Data */
  useEffect(() => {
    StoreApiRequest.getSalutation().then((res) => {
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

   

    /* NOTE: Dev Helper functions */
    devApiHelper.loginCheck().then((res) => {
      return;
    });

  
  }, []);

  /* NOTE: Dev Check to Print on each change */
  useEffect(() => {}, [registerForm]);

  /* NOTE: Handles data assignment on form Change */
  function formHandler(e) {
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
      case "country-select":
        setRegisterForm((prev) => {
          return { ...prev, countryID: e.target.value };
        });
        break;
      case "street":
        setRegisterForm((prev) => {
          return { ...prev, street: e.target.value };
        });
        break;
      case "zipcode":
        setRegisterForm((prev) => {
          return { ...prev, zipcode: e.target.value };
        });
        break;
      case "city":
        setRegisterForm((prev) => {
          return { ...prev, city: e.target.value };
        });
        break;
      default:
        console.error("Probably Typo in form type");
        break;
    }
  }

  /* NOTE: Handles Stages and Form Submissions */
  function formSender(e, stage) {
    if (e != null) {
      e.preventDefault();
    }

    if (stage == 1) {
      setSignupStage(2);
    } else if (stage == 2 && signUpStage == 2) {
      setSignupStage(3);
      StoreApiRequest.registerUser(registerForm)
        .then((res) => {
          /* NOTE: Adds user Context to Store */
          setUserContextToken(res.headers["sw-context-token"]);
          /* NOTE: Dev Helper functions */
          devApiHelper
            .loginCheck(res.headers["sw-context-token"])
            .then((res) => console.info("User signed in:", res));
        })
        .catch((e) => {
          console.error(e);
        });
    } else if (stage == 3) {
      setSignupStage(1);
      popUpSwitch();
      setRegisterForm((prev) => ({
        ...prev,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        checkPassword: "",
        street: "",
        zipcode: "",
        city: "",
      }));
    } else {
      console.error("Pleas enter form Correctly");
      console.log(registerForm);
    }
  }

  /* NOTE: For Back Change on form */
  function onChangeStage(stage) {
    setSignupStage(stage);
  }

  return (
   

        <div className="register-popup">
          <h1>Register</h1>
          <button onClick={() => formSender(null, 3)}>X</button>

          {signUpStage == 1 && (
            <div className="register-popup-stage-one">
              <h3>Personal Information</h3>
              <form onSubmit={(e) => formSender(e, 1)}>
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
                <br />
                <label>
                  Email:
                  <input
                    type="text"
                    id="email"
                    value={registerForm.email}
                    onChange={formHandler}
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
                <br />
                <button type="submit">Step 2</button>
              </form>
            </div>
          )}

          {signUpStage == 2 && (
            <div className="register-popup-stage-two">
              <form onSubmit={(e) => formSender(e, 2)}>
                <label>
                  Country:
                  <select onChange={formHandler} id="country-select">
                    {countries.map((val) => (
                      <option value={val.id} key={val.id}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </label>
                <br />
                <label>
                  Street
                  <input
                    type="text"
                    id="street"
                    value={registerForm.street}
                    onChange={formHandler}
                  />
                </label>
                <br />
                <label>
                  Zipcode:
                  <input
                    type="text"
                    id="zipcode"
                    value={registerForm.zipcode}
                    onChange={formHandler}
                  />
                </label>
                <br />
                <label>
                  City:
                  <input
                    type="text"
                    id="city"
                    value={registerForm.city}
                    onChange={formHandler}
                  />
                </label>
                <br />
                <button onClick={() => onChangeStage(1)}>Back 1</button>
                <input type="submit" value="Send" />
              </form>
            </div>
          )}
          {signUpStage == 3 && (
            <div className="register-popup-stage-three">
              <h2>Thanks for Signing Up</h2>
              <h4>You can now Start shopping</h4>
              <button onClick={() => formSender(null, 3)}>Close</button>
            </div>
          )}
        </div>
      
    
  );
}
