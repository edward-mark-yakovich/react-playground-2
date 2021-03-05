import './nav.scss';

import React from 'react';
import {Link} from "react-router-dom";

const Nav = ({ nameId = '' }) => {
  return (
    <nav className="nav">
      <ul>
        <li className={`${nameId === 'home' ? '_acitve' : ''}`}>
          <Link to="/">Home</Link>
        </li>
        <li className={`${nameId === 'login' ? '_acitve' : ''}`}>
          <Link to="/login-use-state">Login</Link>
        </li>
        <li className={`${nameId === 'posts' ? '_acitve' : ''}`}>
          <Link to="/posts">Posts</Link>
        </li>

        {nameId === 'single-post' &&
          <li className="_acitve"><a>Single Post</a></li>
        }
      </ul>
    </nav>
  );
};

export default Nav;
