import './login.scss';

import React, { useReducer } from 'react';
import Page from "@connected/wrappers/global/Page.jsx";
import { fakeLogin } from '@utils/helpers';

function loginReducer(state, action) {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.field]: action.value
      };
    case "login":
      return {
        ...state,
        loading: true,
        error: '',
        loggedIn: false
      };
    case "success":
      return {
        ...state,
        loading: false,
        error: '',
        loggedIn: true
      };
    case "error":
      return {
        ...state,
        loading: false,
        error: 'Incorrect User or Pass.',
        loggedIn: false,
        username: '',
        password: ''
      };
    case "logout":
      return {
        ...state,
        loading: false,
        error: '',
        loggedIn: false,
        username: '',
        password: ''
      };
    default:
      return state;
  }
}

const initialState = {
  username: '',
  password: '',
  loading: false,
  error: '',
  loggedIn: false
};

const LoginUseReducer = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState); // https://www.youtube.com/watch?v=o-nCM1857AQ
  const {
    username,
    password,
    loading,
    error,
    loggedIn
  } = state;

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    dispatch({type: 'login'});
    try {
      await fakeLogin({username, password});
      dispatch({type: 'success'});
    } catch (error) {
      dispatch({type: 'error'});
    }
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
          <a href="/login-use-state">Go: useState version ></a>
        </div>

        {loggedIn
          ? <div className="post-login">
              <h3>Hello - Logged In - {username}.</h3>
              <button type="button" className="post-login__btn" onClick={() => dispatch({type: 'logout'})}>
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
                <input
                  disabled={loading}
                  placeholder="Username"
                  value={username}
                  onChange={(ev) => dispatch({
                    type: 'field',
                    field: 'username',
                    value: ev.target.value
                  })}
                  type="text"
                  name="user--ID"
                  id="user--ID"
                />
              </div>

              <div className="login-form__input">
                <label className="vh" htmlFor="pass--ID">Username</label>
                <input
                  disabled={loading}
                  placeholder="Password"
                  value={password}
                  onChange={(ev) => dispatch({
                    type: 'field',
                    field: 'password',
                    value: ev.target.value
                  })}
                  type="password"
                  name="pass--ID"
                  id="pass--ID"
                />
              </div>

              <div className="login-form__submit">
                <button disabled={loading} type="submit" className="login-form__submit-btn">
                  {loading ? 'Logging In...' : 'Log In'}
                </button>
              </div>
            </form>
        }

      </div>
    </Page>
  );
};

export default LoginUseReducer;
