import React from 'react';
import styled from 'styled-components';
import { COLORS } from "./constants";

import { CurrentUserContext } from './CurrentUserContext';

const Wrapper = styled.div`
    display: flex;
    justify-content: start;
    border-bottom: 8px solid lightgrey;
    padding-bottom: 20px;
    padding-left: 20px;
`

const NewTweetFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    width: 100%;
`

const NewTweetTextBox = styled.textarea`
    height: 200px;
    border: none;
    outline: none;
    font-size: 20px;
    resize: none;
`

const NewTweetUIBox = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`

const NewTweetMeowButton = styled.button`
    border-radius: 25px;
    background: ${COLORS.primary};
    color: white;
    padding: 10px;
    border: none;
    margin: 20px 0 0 20px;
    font-size: 20px;
    width: 100px;
`

const TweetPosterAvatarImg = styled.img`
    width: 60px;
    border-radius: 50%;
`

const TweetForm = () => {

    const { currentUser, setCurrentUser, status, setStatus } = React.useContext(CurrentUserContext);

    if (status === "loading") {
        return <div>Loading...</div>;
    } else {

        return (
            <Wrapper>
                <div>
                    <TweetPosterAvatarImg src={currentUser["profile"]["avatarSrc"]} />
                </div>
                <NewTweetFormWrapper>
                    <NewTweetTextBox placeholder="What's happening?" />
                    <NewTweetUIBox>
                        <NewTweetMeowButton>Meow</NewTweetMeowButton>
                    </NewTweetUIBox>
                </NewTweetFormWrapper>
            </Wrapper>
        )
    }

}

export default TweetForm;