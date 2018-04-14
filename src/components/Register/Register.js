import React from 'react';
import './Register.css';

const Register = ({ onRouteChange }) => {
  const register = e => onRouteChange(e, 'app');

  return (
    <article className="pa4 black-80">
      <form
        onSubmit={register}
        action="sign-up_submit"
        method="get"
        acceptCharset="utf-8"
      >
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="email-address">
              Email address
            </label>
            <input
              className=" w-40 input-reset pa2 input-reset ba bg-transparent dim black"
              type="email"
              name="email-address"
              id="email-address"
            />
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="password">
              Password
            </label>
            <input
              className="b pa2 input-reset ba bg-transparent dim black"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="password">
              Repeat password
            </label>
            <input
              className="b pa2 input-reset ba bg-transparent dim black"
              type="password"
              name="password"
              id="password--repeat"
            />
          </div>
        </fieldset>
        <div className="mt3">
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
            type="submit"
            value="Sign Up"
          />
        </div>
      </form>
    </article>
  );
};

export default Register;
