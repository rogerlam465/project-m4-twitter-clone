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

// ok. So let's talk this out. I think the goal is to render conditionally.
// Basically, if the current state is 'loading', we should only render
// the string, "Loading..." or what-have-you.

// Par contre, if the data is available, we should load everything.

import { CurrentUserContext } from './CurrentUserContext';

const App = () => {

  const { currentUser, setCurrentUser, status, setStatus } = React.useContext(CurrentUserContext);

  if (status != "loading") {
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
  } else {
    return <div>loading...</div>
  }

};

export default App;
