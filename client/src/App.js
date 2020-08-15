import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import styled from 'styled-components';

import GlobalStyle from './GlobalStyles';
import Notifications from './Notifications';
import Bookmarks from './Bookmarks';
import HomeFeed from './HomeFeed';
import Profile from './Profile';
import TweetDetails from './TweetDetails';
import Sidebar from './Sidebar';

// ok. So let's talk this out. I think the goal is to render conditionally.
// Basically, if the current state is 'loading', we should only render
// the string, "Loading..." or what-have-you.

// Par contre, if the data is available, we should load everything.

// in the long run, it's tempting to combine all contexts into a single context
// but per Dan Hackl, it's usually better to keep things atomic for easier
// debugging. I can buy that.

import { CurrentUserContext } from './CurrentUserContext';
import { CurrentFeedContext } from './HomeFeedContext';

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const App = () => {

  const { currentUser, setCurrentUser, status, setStatus } = React.useContext(CurrentUserContext);
  const { currentFeed, setFeed, feedStatus, setFeedStatus } = React.useContext(CurrentFeedContext);

  if (status !== "loading") {
    return (
      <>
        <Router>
          <GlobalStyle />
          <ContentWrapper>
            <Sidebar />

            <Switch>
              <Route exact path="/">
                <HomeFeed />
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

          </ContentWrapper>
        </Router>
      </>
    )
  } else {
    return <div>loading...</div>
  }

};

export default App;
