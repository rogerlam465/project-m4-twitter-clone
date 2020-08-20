import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Link, useHistory } from "react-router-dom";

// this can't work. Can this work? it would be cool if it did.

import { useParams } from "react-router";

import ActionBar from './ActionBar';
import { CurrentUserContext } from './CurrentUserContext';
import { CurrentFeedContext } from './HomeFeedContext';

const TweetWrapper = styled(Link)`
    display: flex;
    align-items: start;
    margin: 20px 20px 20px 20px;
    text-decoration: none;
    color: black;
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
`

const ActionBarHolder = styled.div`
    width: 80%;
`

const TweetFeed = () => {
    const { currentFeed, feedStatus } = React.useContext(CurrentFeedContext);
    const { status } = React.useContext(CurrentUserContext);

    let history = useHistory();
    let { profileId } = useParams();

    function handleClick(profile) {
        history.push("/" + profile);
    }

    if (feedStatus === "loading" || status === "loading") {
        return <div>Loading...</div>;
    } else {

        let tweetIds = [];
        const tweetIdsHolder = currentFeed.tweetIds;

        // this section checks to see if we're in a profile page.
        // if so, only grab relevant tweets.

        if (profileId) {

            let unfilteredTweetIds = tweetIdsHolder.map(tweetId => {
                const thisTweet = currentFeed.tweetsById[tweetId];
                if (thisTweet["author"]["handle"] === profileId || thisTweet["isRetweeted"] === true) {
                    return tweetId;
                }
            })

            tweetIds = unfilteredTweetIds.filter(item => item !== undefined);

        } else {
            let unfilteredTweetIds = tweetIdsHolder.map(tweetId => {
                const thisTweet = currentFeed.tweetsById[tweetId];
                if (thisTweet["author"]["isBeingFollowedByYou"] === true) {
                    return tweetId;
                }
            })

            tweetIds = unfilteredTweetIds.filter(item => item !== undefined);
        }

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
                            <TweetWrapper to={'/tweet/' + thisTweet['id']}>
                                <TweetPosterDetails>
                                    <TweetPosterAvatarImg src={thisTweet['author']["avatarSrc"]} />
                                </TweetPosterDetails>

                                <FeedTweet>
                                    <TweetPosterUsername>
                                        <Username>{thisTweet['author']['displayName']}</Username><Handle onClick={() => { handleClick(thisTweet['author']['handle']) }}>@{thisTweet['author']['handle']} &middot; {formattedDate}</Handle>
                                    </TweetPosterUsername>
                                    <TweetStatus>{thisTweet["status"]}</TweetStatus>
                                    {thisTweet['media'][0] &&
                                        <div><FeedMedia src={thisTweet['media'][0]['url']} /></div>
                                    }
                                    <ActionBarHolder>
                                        <ActionBar thisTweet={thisTweet} />
                                    </ActionBarHolder>

                                </FeedTweet>

                            </TweetWrapper>
                        )

                    })
                }
            </>
        )
    }
}

export default TweetFeed;