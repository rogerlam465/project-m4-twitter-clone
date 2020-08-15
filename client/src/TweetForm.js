import React from 'react';
import styled from 'styled-components';
import { COLORS } from "./constants";

import { CurrentUserContext } from './CurrentUserContext';

const NewTweetFormWrapper = styled.div`
`

const NewTweetTextBox = styled.input`
`

const NewTweetUIBox = styled.div`
`

const NewTweetMeowButton = styled.button`
`

const TweetBox = () => {

    const { currentUser, setCurrentUser, status, setStatus } = React.useContext(CurrentUserContext);

    if (status === "loading") {
        return;
    } else {
        console.log(currentUser);
    }

}

export default TweetBox;