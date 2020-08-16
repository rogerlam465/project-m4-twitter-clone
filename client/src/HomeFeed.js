import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Link } from "react-router-dom";

import TweetForm from './TweetForm';
import { CurrentUserContext } from './CurrentUserContext';
import { CurrentFeedContext } from './HomeFeedContext';

import { FiShare } from 'react-icons/fi';
import { FaRegComment, FaRetweet, FaRegHeart } from 'react-icons/fa';

// Wrapper contains the whole vertical feed.

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-left: 1px lightgrey solid;
    margin: 20px;
`

// TweetWrapper contains two elements: the avatar
// and then the rest of the content in a row.

const TweetWrapper = styled(Link)`
    display: flex;
    align-items: start;
    margin: 20px 0 20px 20px;
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

// action bar

const ActionBar = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    margin: 20px 0;
    width: 80%;
`

const ActionBarIcon = styled.span`
`

const ActiveActionBarIcon = styled(ActionBarIcon)`
    color: #237a3b};
`
const Header = styled.div`
    padding-left: 20px;
`

const HomeFeed = () => {

    const { currentFeed, setFeed, feedStatus, setFeedStatus } = React.useContext(CurrentFeedContext);
    const { currentUser, setCurrentUser, status, setStatus } = React.useContext(CurrentUserContext);

    if (feedStatus === "loading" || status === "loading") {
        return <div>Loading...</div>;
    } else {
        const tweetIds = currentFeed.tweetIds;

        return (
            <Wrapper>
                <Header><h1>Home</h1></Header>
                <TweetForm />
                {tweetIds.map(tweetId => {
                    const thisTweet = currentFeed.tweetsById[tweetId];
                    const timeHold = Date.parse(thisTweet["timestamp"]); // this seems to work alright.

                    const formattedDate = format(timeHold, 'MMM do');

                    if (thisTweet['author']['isBeingFollowedByYou']) {
                        return (
                            <TweetWrapper to={'/tweet/' + thisTweet['id']}>
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
                                    <ActionBar>
                                        <FaRegComment />
                                        {thisTweet['numRetweets'] > 0 &&
                                            <ActiveActionBarIcon><FaRetweet /></ActiveActionBarIcon>
                                        }
                                        {thisTweet['numRetweets'] === 0 &&
                                            <ActionBarIcon><FaRetweet /></ActionBarIcon>
                                        }
                                        {thisTweet['isLiked'] === true &&
                                            <ActiveActionBarIcon><FaRegHeart /></ActiveActionBarIcon>
                                        }
                                        {thisTweet['isLiked'] === false &&
                                            <ActionBarIcon><FaRegHeart /></ActionBarIcon>
                                        }
                                        <FiShare />
                                    </ActionBar>
                                </FeedTweet>

                            </TweetWrapper>
                        )
                    }
                })}
            </Wrapper>
        )


    }

};

export default HomeFeed;