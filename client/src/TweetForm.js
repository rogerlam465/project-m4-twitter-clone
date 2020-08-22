import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from "./constants";

import { CurrentUserContext } from './CurrentUserContext';
import { CurrentFeedContext } from './HomeFeedContext';

const Wrapper = styled.div`
    display: flex;
    justify-content: start;
    border-bottom: 8px solid lightgrey;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
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

const DisabledMeowButton = styled(NewTweetMeowButton)`
    border-radius: 25px;
    background: #9884a3;
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

    const { setFeed, setFeedStatus } = React.useContext(CurrentFeedContext);
    const { currentUser, status } = React.useContext(CurrentUserContext);

    const [charCountLeft, setCharCountLeft] = useState(280);

    useEffect(() => {
        const charBox = document.querySelector("#charCountLeft");
        if (charCountLeft < 0) {
            charBox.style.color = "red";
        } else if (charCountLeft > 0 && charCountLeft <= 55) {
            charBox.style.color = "yellow";
        }
    }, [charCountLeft]);

    // refresh home feed after publishing
    const handleAfterPublishTweet = async () => {
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

    // capture content and use fetch to post it

    async function tweetPost() {

        let statusValue = document.querySelector("#TweetTextBox").value;

        try {
            const response = await fetch("/api/tweet", {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ "status": statusValue })
            });
            let data = await response.json();
            document.querySelector("#TweetTextBox").value = "";
            handleAfterPublishTweet();
        } catch (err) {
            console.log(err);
        }

    }

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
                        {charCountLeft > 0 &&
                            <div><NewTweetMeowButton id="meowButton" onClick={tweetPost}>Meow</NewTweetMeowButton></div>
                        }
                        {charCountLeft < 0 &&
                            <div><DisabledMeowButton>Meow</DisabledMeowButton></div>
                        }
                    </NewTweetUIBox>
                </NewTweetFormWrapper>
            </Wrapper>
        )
    }

}

export default TweetForm;