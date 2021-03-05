import './login.scss';

import React, { useState, useCallback } from 'react';
import Page from "@connected/wrappers/global/Page.jsx";
import Inner1 from "./Inner1.jsx";
import Inner2 from "./Inner2.jsx";
import InnerSquare from "./InnerSquare.jsx";

import { fakeLogin } from '@utils/helpers';

const LoginUseState = () => {

  // counter testing --------
  const [testCount1, setTestCount1] = useState(0);
  const [testCount2, setTestCount2] = useState(0);
  const favNums = [7, 21, 35];
  const incrementItem2 = useCallback(
    n => {
      setTestCount2(c => c + n);
    },
    [setTestCount2]
  );

  // login testing --------
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    setError('');

    try {
      await fakeLogin({username, password});
      setLoggedIn(true);
      setPassword('');
      setError('');
    } catch (error) {
      setError('Incorrect User or Pass.');
      setLoggedIn(false);
    }

    setLoading(false);
  };

  return (
    <Page
      nameId="login"
    >
      <div className="page page--login">

        <div className="page__heading">
          <h1>Login Ex</h1>
        </div>

        <div className="page--login__next-btn">
          <a href="/login-use-reducer">Go: useReducer version ></a>
        </div>

        {loggedIn
          ? <div className="post-login">
              <h3>Hello - Logged In - {username}.</h3>
              <button type="button" className="post-login__btn" onClick={() => {
                  setUsername('');
                  setLoggedIn(false);
                }}
              >
                Logout
              </button>
            </div>
          : <form className="login-form" onSubmit={(ev) => handleSubmit(ev)}>
              <div className="login-form__heading">
                <h3>Login Please.</h3>
                {error && <p className="_is-login-error">{error}</p>}
              </div>

              <div className="login-form__input">
                <label className="vh" htmlFor="user--ID">Username</label>
                <input disabled={loading} placeholder="Username" value={username} onChange={(ev) => setUsername(ev.target.value)} type="text" name="user--ID" id="user--ID" />
              </div>

              <div className="login-form__input">
                <label className="vh" htmlFor="pass--ID">Username</label>
                <input disabled={loading} placeholder="Password" value={password} onChange={(ev) => setPassword(ev.target.value)} type="password" name="pass--ID" id="pass--ID" />
              </div>

              <div className="login-form__submit">
                <button disabled={loading} type="submit" className="login-form__submit-btn">
                  {loading ? 'Logging In...' : 'Log In'}
                </button>
              </div>
            </form>
        }



        <hr />

        <div className="page--login__inner-component">
          <div className="grid">

            <div className="col-item">
              <p>#1 item = {testCount1}</p>
              <Inner1 increment={() => setTestCount1(testCount1 + 1)} />
            </div>

            <div className="col-item">
              <p>#2 item = {testCount2}</p>
              <Inner2 increment={incrementItem2} />
            </div>

          </div>

          <hr />

          <div className="grid">
            <p>#2 item = {testCount2}</p>
            {favNums.map((num) => {
              return <InnerSquare increment={incrementItem2} num={num} key={num} />
            })}
          </div>
        </div>

      </div>
    </Page>
  );
};

export default LoginUseState;
