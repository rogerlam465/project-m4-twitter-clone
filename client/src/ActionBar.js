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
    color: #237a3b};
`

const ActionBar = (props) => {

    const { feedStatus } = React.useContext(CurrentFeedContext);
    const { status } = React.useContext(CurrentUserContext);

    const thisTweet = props.thisTweet;

    if (feedStatus === "loading" || status === "loading") {
        return <div>Loading...</div>;
    } else {

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
                    <ActiveActionBarIcon><FaRegHeart /></ActiveActionBarIcon>
                }
                {
                    thisTweet['isLiked'] === false &&
                    <ActionBarIcon><FaRegHeart /></ActionBarIcon>
                }
                <FiShare />
            </Wrapper>
        )
    }
}

export default ActionBar;