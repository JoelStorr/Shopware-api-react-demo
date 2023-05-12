import React, {useState, useEffect} from 'react'
import './LoginPopUp.scss'

import StoreApiRequest, {devApiHelper} from '../../../helper/shopware api/apiHelper';
import useUIStore from '../../../store/store';

export default function LoginPopUp() {
  const [loginForm, setLoginForm] = useState({
    contextToken: null,
    email: "",
    password: "",
  });

  const popUpSwitch = useUIStore((state) => state.setShowPopUp);
  const setUserContextToken = useUIStore((state) => state.setUserContectToken);

  /* NOTE: Fetches Data */
  useEffect(() => {
  

    StoreApiRequest.getContext().then((res) =>
      setLoginForm((prev) => {
        return { ...prev, contextToken: res.token };
      })
    );

    /* NOTE: Dev Helper functions */
    devApiHelper.loginCheck().then((res) => {
      return;
    });
  }, []);

  /* NOTE: Handles data assignment on form Change */
  function formHandler(e) {
    switch (e.target.id) {
      case "email":
        setLoginForm((prev) => {
          return { ...prev, email: e.target.value };
        });
        break;
      case "password":
        setLoginForm((prev) => {
          return { ...prev, password: e.target.value };
        });
        break;
      default:
        console.error("Probably Typo in form type");
        break;
    }
  }

  /* NOTE: Form Submissions */
  function formSender(e) {
    
      e.preventDefault();
    
    StoreApiRequest.loginUser(loginForm)
      .then((res) => {
        /* NOTE: Adds user Context to Store */
        setUserContextToken(res.data.contextToken);
        popUpSwitch();
        setLoginForm((prev) => ({
          ...prev,
          password: "",
        }));
        console.info(res);

        /* NOTE: Dev Helper functions */
        devApiHelper
          .loginCheck(res.data.contextToken)
          .then((res) => console.info("User signed in:", res));
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <div className="register-popup">
      <h1>Log</h1>
      <button onClick={() => popUpSwitch()}>X</button>
      <h3>Personal Information</h3>
      <form onSubmit={(e) => formSender(e)}>
        <label>
          Email:
          <input
            type="email"
            id="email"
            value={loginForm.email}
            onChange={formHandler}
          ></input>
        </label>
        <br />
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            value={loginForm.password}
            onChange={formHandler}
          ></input>
        </label>
        <br />
        <button type="submit">LogIn</button>
      </form>
    </div>
  );
}


