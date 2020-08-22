import React from 'react';
import styled from 'styled-components';

import { FiShare } from 'react-icons/fi';
import { FaRegComment, FaRetweet, FaRegHeart } from 'react-icons/fa';

import { CurrentUserContext } from './CurrentUserContext';
import { CurrentFeedContext } from './HomeFeedContext';

// action bar

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    margin: 20px 0;
`

const ActionBarIcon = styled.span`
`

const ActiveActionBarIcon = styled(ActionBarIcon)`
    color: #ba3c59};
`

const ActionBar = (props) => {

    const { setFeed, feedStatus, setFeedStatus } = React.useContext(CurrentFeedContext);
    const { status } = React.useContext(CurrentUserContext);

    const thisTweet = props.thisTweet;

    const handleAfterLike = async () => {
        try {
            let resHolder = await fetch("/api/me/home-feed");
            let data = await resHolder.json();
            console.log("data:", data);
            setFeed(data);
            setFeedStatus("done");
        } catch (err) {
            console.log(err);
        };
    };

    async function likeTweet(postId) {
        try {

            const url = "/api/tweet/" + postId + "/like";
            const likeVal = !thisTweet["isLiked"];

            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({ "like": likeVal })
            });
            let data = await response.json();
            handleAfterLike();

        } catch (err) {
            console.log(err);
        }
    }

    if (feedStatus === "loading" || status === "loading") {
        return <div>Loading...</div>;
    } else {

        // todo make likeable

        return (
            <Wrapper>
                <FaRegComment />
                {
                    thisTweet['numRetweets'] > 0 &&
                    <ActiveActionBarIcon><FaRetweet /></ActiveActionBarIcon>
                }
                {
                    thisTweet['numRetweets'] === 0 &&
                    <ActionBarIcon><FaRetweet /></ActionBarIcon>
                }
                {
                    thisTweet['isLiked'] === true &&
                    <ActiveActionBarIcon><FaRegHeart onClick={() => { likeTweet(thisTweet["id"]) }} /></ActiveActionBarIcon>
                }

                {
                    thisTweet['isLiked'] === false &&
                    <ActionBarIcon><FaRegHeart onClick={() => { likeTweet(thisTweet["id"]) }} /></ActionBarIcon>
                }
                <FiShare />
            </Wrapper>
        )
    }
}

export default ActionBar;