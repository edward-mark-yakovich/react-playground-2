import '@globals/page.scss';

import React, { Fragment } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import { StoreProvider } from '@store/StoreContext';
import { initialState, appReducer } from './store/appReducer';

/****** Pages *****/
import Home from '@connected/pages/home/Home.jsx';
import Posts from '@connected/pages/posts/Posts.jsx';
import SinglePost from '@connected/pages/single-post/SinglePost.jsx';
import LoginUseState from '@connected/pages/login/LoginUseState.jsx';
import LoginUseReducer from '@connected/pages/login/LoginUseReducer.jsx';

/****** Components *****/
import ApplicationErrorBoundary from '@components/base/error-boundaries/ApplicationErrorBoundary.jsx';
import NoRouteMatch from '@components/pageTemplates/no-route-match/NoRouteMatch.jsx';

const isLocal = window.location.host === 'localhost:8080';
const subPath = isLocal ? '' : window.config.subDir;

if (!isLocal) {
  document.write("<base href='" + window.config.subDir + "/' />");
}

const RouteWithBoundary = ({ component: Component, ...rest }) => {
  const componentFunc = props => (
    <ApplicationErrorBoundary>
      <Component {...props} />
    </ApplicationErrorBoundary>
  );

  return <Route {...rest} component={componentFunc} />;
};

// need .htaccess to another solution to solve client side routing on server or use # url approach

render(
  <StoreProvider initialState={initialState} reducer={appReducer}>
    <BrowserRouter basename={`${subPath}`}>
      <Fragment>
        <div className="app _emy_myAppName--v-1.1.0">
          <Switch>
            <RouteWithBoundary exact={true} path="/" component={Home} />
            <RouteWithBoundary exact={true} path="/posts/:slug" component={SinglePost} />
            <RouteWithBoundary exact={true} path="/posts" component={Posts} />
            <RouteWithBoundary exact={true} path="/login-use-state" component={LoginUseState} />
            <RouteWithBoundary exact={true} path="/login-use-reducer" component={LoginUseReducer} />

            <Route component={NoRouteMatch} />
          </Switch>
        </div>
      </Fragment>
    </BrowserRouter>
  </StoreProvider>, document.getElementById('app')
);
