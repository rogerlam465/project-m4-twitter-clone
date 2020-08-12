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
import { CurrentFeedContext } from './HomeFeedContext';

const App = () => {

  const { currentUser, setCurrentUser, status, setStatus } = React.useContext(CurrentUserContext);
  const { currentFeed, setFeed, feedStatus, setFeedStatus } = React.useContext(CurrentFeedContext);

  if (status !== "loading") {

    // logically, because all this shit is loaded, status has to be done.

    console.log(currentUser);
    return (
      <>
        <Sidebar />
        <Router>
          <Switch>
            <Route exact path="/">
              <Home info={currentFeed} />
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
