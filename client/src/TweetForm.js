import React, { useEffect, useState } from 'react';
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
    align-items: center;
`

// why does this guy stay stuck to the bottom?
// he continues to vex me. this cannot be borne.

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

    const [charCountLeft, setCharCountLeft] = useState(280);

    useEffect(() => {
        const charBox = document.querySelector("#charCountLeft");
        if (charCountLeft < 0) {
            charBox.style.color = "red";
        } else if (charCountLeft > 0 && charCountLeft <= 55) {
            charBox.style.color = "yellow";
        }
    }, [charCountLeft]);

    // TODO - capture content and use fetch to post it

    if (status === "loading") {
        return <div>Loading...</div>;
    } else {

        return (
            <Wrapper>
                <div>
                    <TweetPosterAvatarImg src={currentUser["profile"]["avatarSrc"]} />
                </div>
                <NewTweetFormWrapper>
                    <NewTweetTextBox onKeyDown={() => {
                        setCharCountLeft(280 - document.querySelector("#TweetTextBox").value.length - 1);
                    }} id="TweetTextBox" maxlength="280" placeholder="What's happening?" />
                    <NewTweetUIBox>
                        <div><span id="charCountLeft">{charCountLeft}</span></div>
                        <div><NewTweetMeowButton>Meow</NewTweetMeowButton></div>
                    </NewTweetUIBox>
                </NewTweetFormWrapper>
            </Wrapper>
        )
    }

}

export default TweetForm;