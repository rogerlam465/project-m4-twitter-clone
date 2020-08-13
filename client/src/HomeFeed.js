import React, { useEffect } from 'react';
import { CurrentFeedContext } from './HomeFeedContext';
import styled from 'styled-components';

// this needs to contain an avatar, the name of the poster, their handle
const TweetPosterDetails = styled.div`
    display: flex;
`

// this guy can go in a div. No need for a styled component.
const TweetPosterAvatarImg = styled.img`
    width: 30px;
    border-radius: 50%;
`

const TweetPosterDeets = styled.div`
    font-size: 20px;
`

// this should contain the header, the content, and then the action bar
// oh my god. The action bar is centered in the Detail view, but left-justified
// in the feed view. why would you do that. why.
const FeedTweet = styled.div`

`

const HomeFeed = () => {

    const { currentFeed, setFeed, feedStatus, setFeedStatus } = React.useContext(CurrentFeedContext);

    if (feedStatus === null) {
        return <div>Loading...</div>;
    } else {
        // let tweetIds = currentFeed.tweetIds;
        // return (
        //     tweetIds.map(tweetId => {
        //         console.log(tweetId);
        //     })
        // )
        let foo = currentFeed;
        console.log(foo);
        // console.log("wtf", currentFeed.tweetIds);
        return <div>what</div>
    }

};

export default HomeFeed;