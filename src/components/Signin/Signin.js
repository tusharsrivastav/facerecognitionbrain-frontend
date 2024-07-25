import React from "react";
import { useState } from 'react';

const Signin = ({ handleRouteChange, loadUser }) => {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const onEmailChange = (e) => {
    setSignInEmail(e.target.value);
  }

  const onPasswordChange = (e) => {
    setSignInPassword(e.target.value);
  }

  const onSubmit = () => {
    fetch('https://frbserver.tushardevelops.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        loadUser(user);
        handleRouteChange('home');
      } else {
        alert("Invalid Credentials");
      }
    })
  }

  return (
    <article className="br3 ba b--white-10 mt5 pv4 w-100 w-50-m w-40-l mw6 center bg-purple o-80">
      <main className="w-60 pv4 white">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt4">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent white w-100"
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="pa2 input-reset ba bg-transparent white w-100"
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="white b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={onSubmit}
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => handleRouteChange("register")}
              className="f6 link dim white db pointer">
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default Signin;
