import React from 'react';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/home'
import Details from './pages/details'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/movie/:id" exact component={Details} />

        <Route path="/*" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
