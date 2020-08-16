import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import { useParams } from "react-router";

import { CurrentUserContext } from './CurrentUserContext';
import { CurrentFeedContext } from './HomeFeedContext';

import { FiShare, FiArrowLeft } from 'react-icons/fi';
import { FaRegComment, FaRetweet, FaRegHeart } from 'react-icons/fa';

// Wrapper contains the whole vertical feed.

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-left: 1px lightgrey solid;
    margin-left: 20px;
`

// TweetWrapper contains two elements: the avatar
// and then the rest of the content in a row.

const TweetWrapper = styled.div`
    display: flex;
    align-items: start;
    margin-bottom: 20px;
    flex-direction: column;
`

// this needs to contain an avatar, that's it
const TweetPosterDetails = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    margin-left: 20px;
`

// this guy can go in a div. No need for a styled component.
const TweetPosterAvatarImg = styled.img`
    width: 60px;
    border-radius: 50%;
    margin-right: 20px;
`

const TweetPosterUsername = styled.div`
    font-size: 20px;
`

const Username = styled.div`
    font-weight: bold;
    margin-right: 5px;
`

const Handle = styled.div`
    color: grey;
`

// this should contain the header, the content, and then the action bar.
// oh my god. The action bar is centered in the Detail view, but left-justified
// in the feed view. why would you do that. why.
const FeedTweet = styled.div`
    width: 815px;
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
    margin-bottom: 10px;
`

// action bar

const ActionBar = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    margin: 20px 0;
    width: 100%;
`

const ActionBarIcon = styled.span`
`

const ActiveActionBarIcon = styled(ActionBarIcon)`
    color: #237a3b};
`

const Header = styled.div`
    display: flex;
    align-items: center;
    color: black;
    padding-left: 20px;
`

const HeaderLink = styled(Link)`
    color: black;
    margin-right: 30px;
    font-size: 30px;
    padding-top: 8px;
`

const TimeSpan = styled.div`
    font-size: 18px;
    color: grey;
    margin-top: 10px 0;
`

const TweetView = () => {

    const { currentFeed, feedStatus } = React.useContext(CurrentFeedContext);
    const { status } = React.useContext(CurrentUserContext);

    let { tweetId } = useParams();

    const thisTweet = currentFeed.tweetsById[tweetId];;
    const timeHold = Date.parse(thisTweet["timestamp"]);

    const formattedTime = format(timeHold, 'h:mm a')
    const formattedDate = format(timeHold, 'MMM dd yyyy');

    if (feedStatus === "loading" || status === "loading") {
        return <div>Loading...</div>;
    } else {

        return (
            <Wrapper>
                <Header><HeaderLink to="/"><FiArrowLeft /></HeaderLink><h1>Meow</h1></Header>

                <TweetWrapper>
                    <TweetPosterDetails>
                        <TweetPosterAvatarImg src={thisTweet['author']["avatarSrc"]} />
                        <TweetPosterUsername>
                            <Username>{thisTweet['author']['displayName']}</Username>
                            <Handle>@{thisTweet['author']['handle']} &middot; </Handle>
                        </TweetPosterUsername>
                    </TweetPosterDetails>

                    <FeedTweet>

                        <TweetStatus>{thisTweet["status"]}</TweetStatus>
                        {thisTweet['media'][0] &&
                            <div><FeedMedia src={thisTweet['media'][0]['url']} /></div>
                        }
                        <TimeSpan>{formattedTime} &middot; {formattedDate} &middot; Critter web app</TimeSpan>
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

            </Wrapper>
        )


    }

};

export default TweetView;