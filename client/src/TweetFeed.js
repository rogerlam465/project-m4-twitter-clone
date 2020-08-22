import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Link, useHistory } from "react-router-dom";
import { FiShare } from 'react-icons/fi';

import { useParams } from "react-router";

import ActionBar from './ActionBar';
import { CurrentUserContext } from './CurrentUserContext';
import { CurrentFeedContext } from './HomeFeedContext';

const TweetWrapper = styled.div`
    display: flex;
    align-items: start;
    margin: 20px 20px 20px 20px;

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

// this should contain the header, the content, and then the action bar.
// oh my god. The action bar is centered in the Detail view, but left-justified
// in the feed view. why would you do that. why.

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const FeedTweet = styled(Link)`
    width: 700px;
    border-bottom: 1px lightgrey solid;
    margin-left: 20px;
    text-decoration: none;
    color: black;
`
const TweetStatus = styled.div`
    font-size: 20px;
    margin-top: 15px;
    margin-bottom: 15px;
`

const FeedMedia = styled.img`
    width: 100%;
    border-radius: 20px;
`

const ActionBarHolder = styled.div`
    width: 80%;
`

const TweetFeed = () => {
    const { currentFeed, feedStatus, getFeedData } = React.useContext(CurrentFeedContext);
    const { currentUser, status } = React.useContext(CurrentUserContext);

    let history = useHistory();
    let { profileId } = useParams();

    function handleClick(profile) {
        history.push("/" + profile);
    }

    if (feedStatus === "loading" || status === "loading") {
        return <div>Loading...</div>;
    } else {

        // update according to location
        // if there's no profileId, assume it's the logged in user
        // otherwise, pass the profileId to getFeedData

        let tweetIds = currentFeed.tweetIds;

        // this section checks to see if we're in a profile page.
        // if so, only grab relevant tweets.

        return (
            <>
                {
                    tweetIds.map(tweetId => {
                        const thisTweet = currentFeed.tweetsById[tweetId];
                        const timeHold = Date.parse(thisTweet["timestamp"]); // this seems to work alright.

                        const formattedDate = format(timeHold, 'MMM do');

                        // so I think we could probably make this one layer more abstracted.
                        // OR, we could just copy-paste everything.

                        return (
                            <TweetWrapper>

                                {thisTweet['isRetweeted'] &&
                                    <span><FiShare />{currentUser["profile"]["displayName"]} Remeowed</span>
                                }
                                <TweetPosterDetails>
                                    <TweetPosterAvatarImg src={thisTweet['author']["avatarSrc"]} />
                                </TweetPosterDetails>

                                <ContentWrapper>
                                    <FeedTweet to={'/tweet/' + thisTweet['id']}>
                                        <TweetPosterUsername>
                                            <Username>{thisTweet['author']['displayName']}</Username><Handle onClick={() => { handleClick(thisTweet['author']['handle']) }}>@{thisTweet['author']['handle']} &middot; {formattedDate}</Handle>
                                        </TweetPosterUsername>
                                        <TweetStatus>{thisTweet["status"]}</TweetStatus>
                                        {thisTweet['media'][0] &&
                                            <div><FeedMedia src={thisTweet['media'][0]['url']} /></div>
                                        }
                                    </FeedTweet>


                                    <ActionBarHolder>
                                        <ActionBar thisTweet={thisTweet} />
                                    </ActionBarHolder>

                                </ContentWrapper>

                            </TweetWrapper>
                        )

                    })
                }
            </>
        )
    }
}

export default TweetFeed;