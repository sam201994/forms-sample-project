/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Form from 'containers/Form';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Form} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

// import Header from 'components/Header';
// <Header />
