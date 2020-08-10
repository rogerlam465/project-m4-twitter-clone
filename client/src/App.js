import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Notifications from './Notifications';
import Bookmarks from './Bookmarks';
import Home from './HomeFeed';
import Profile from './Profile';
import TweetDetails from './TweetDetails';
import Sidebar from './Sidebar';

const App = () => {

  return (
    <>
      <Sidebar />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/notifications">
            <Notifications />
          </Route>
          <Route path="/bookmarks">
            <Bookmarks />
          </Route>
          <Route path="/tweet/:tweetId">
            <TweetDetails />
          </Route>
          <Route path="/:profileId">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </>
  )
};

export default App;
