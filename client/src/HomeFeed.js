import React, { useEffect } from 'react';
import { CurrentFeedContext } from './HomeFeedContext';
import styled from 'styled-components';
import { format } from 'date-fns';


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const TweetWrapper = styled.div`
    display: flex;
    align-items: start;
    margin: 20px;
`

// this needs to contain an avatar, that's it
const TweetPosterDetails = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`

// this guy can go in a div. No need for a styled component.
const TweetPosterAvatarImg = styled.img`
    width: 60px;
    border-radius: 50%;
`

const TweetPosterUsername = styled.div`
    font-size: 20px;
`

const Username = styled.span`
    font-weight: bold;
    margin-right: 5px;
`

const Handle = styled.span`
    color: grey;
`

const TweetTimeDate = styled.div`
    font-size: 20px;
    color: gray;
    margin-bottom: 15px;
`

// this should contain the header, the content, and then the action bar.
// oh my god. The action bar is centered in the Detail view, but left-justified
// in the feed view. why would you do that. why.
const FeedTweet = styled.div`
    width: 700px;
    border-bottom: 1px lightgrey solid;
    margin-left: 20px;
`
const TweetStatus = styled.div`
    font-size: 20px;
    margin-top: 15px;
    margin-bottom: 15px;
`

const FeedMedia = styled.img`
    width: 100%;
    border-radius: 20px;
    margin-bottom: 20px;
`

const HomeFeed = () => {

    const { currentFeed, setFeed, feedStatus, setFeedStatus } = React.useContext(CurrentFeedContext);

    if (feedStatus === "loading") {
        return <div>Loading...</div>;
    } else {
        const tweetIds = currentFeed.tweetIds;

        return (
            <Wrapper>
                {tweetIds.map(tweetId => {
                    const thisTweet = currentFeed.tweetsById[tweetId];
                    const timeHold = Date.parse(thisTweet["timestamp"]); // this seems to work alright.

                    const formattedDate = format(timeHold, 'MMM do');

                    return (
                        <TweetWrapper>
                            <TweetPosterDetails>
                                <TweetPosterAvatarImg src={thisTweet['author']["avatarSrc"]} />
                            </TweetPosterDetails>

                            <FeedTweet>
                                <TweetPosterUsername>
                                    <Username>{thisTweet['author']['displayName']}</Username><Handle>@{thisTweet['author']['handle']} &middot; {formattedDate}</Handle>
                                </TweetPosterUsername>
                                <TweetStatus>{thisTweet["status"]}</TweetStatus>
                                {thisTweet['media'][0] &&
                                    <div><FeedMedia src={thisTweet['media'][0]['url']} /></div>
                                }
                            </FeedTweet>
                        </TweetWrapper>
                    )
                })}
            </Wrapper>
        )


    }

};

export default HomeFeed;