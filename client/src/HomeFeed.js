import React from 'react';
import styled from 'styled-components';

import TweetFeed from './GenericFeed';
import TweetForm from './TweetForm';
import { CurrentUserContext } from './CurrentUserContext';
import { CurrentFeedContext } from './HomeFeedContext';

// Wrapper contains the whole vertical feed.

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-left: 1px lightgrey solid;
    border-right: 1px lightgrey solid;
    margin: 20px;
`

const Header = styled.div`
    padding-left: 20px;
`

const HomeFeed = () => {

    const { feedStatus } = React.useContext(CurrentFeedContext);
    const { status } = React.useContext(CurrentUserContext);

    if (feedStatus === "loading" || status === "loading") {
        return <div>Loading...</div>;
    } else {

        return (
            <Wrapper>
                <Header><h1>Home</h1></Header>
                <TweetForm />
                <TweetFeed />
            </Wrapper>
        )


    }

};

export default HomeFeed;