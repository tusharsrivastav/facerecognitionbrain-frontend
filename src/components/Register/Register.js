import React from "react";
import { useState } from 'react';

const Register = ({ handleRouteChange, loadUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const onNameChange = (e) => {
    setName(e.target.value);
  }

  const validateForm = () => {
    if (email === "" || !email.toLowerCase().includes("@")) {
      return false;
    }
    if (password === "" || name === "") {
      return false;
    }
    return true;
  }

  const onSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      fetch('https://frbserver.tushardevelops.com/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
          name: name
        })
      })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          loadUser(user);
          handleRouteChange('home');
        } else {
          alert("Unable to register");
        }
      })
      .catch(err => console.log(err));
    } else {
      alert("Invalid Information!")
    }

  }
  return (
    <article className="br3 ba b--white-10 mt5 pv4 w-100 w-50-m w-40-l mw6 center bg-purple o-80">
      <main className="w-60 pv4 white">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Register</legend>
            <div className="mt4">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent white w-100"
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                onChange={onNameChange}
              />
            </div>
            <div className="mv3">
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
              value="Register"
              onClick={onSubmit}
            />
          </div>
        </div>
      </main>
    </article>
  );
};

export default Register;
