import React from 'react';
import styled from 'styled-components';
import { CurrentUserContext } from './CurrentUserContext';
import { CurrentFeedContext } from './HomeFeedContext';

// contains the whole lot

const Wrapper = styled.div`
    width: 815px;
`

// contains profile background, avatar, user data

const UserDetails = styled.div`
`
const UserBackgroundHolder = styled.div`
    width: 100%;
`

const UserBannerImg = styled.img`
    max-width: 100%;
    height: auto;
`
const UserInfoWrapper = styled.div`
    margin-top: -54px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`

const AvatarHolder = styled.div`
    margin-left: 20px;
`

const AvatarImg = styled.img`
    width: 100px;
    border-radius: 50%;
    border: 2px white solid;
`

const FollowBox = styled.div`
    margin-right: 10px;
`

const FollowButton = styled.button`
    border-radius: 25px;
    padding: 10px;
    border: none;
    background: royalblue;
    color: white;
`

const UserHandle = styled.span`
`

const UserName = styled.span`
`

const Profile = () => {

    const { currentFeed, feedStatus } = React.useContext(CurrentFeedContext);
    const { currentUser, status } = React.useContext(CurrentUserContext);

    console.log(currentUser["profile"]);

    if (status !== "done" || feedStatus !== "done") {
        return <div>>Loading...</div>
    } else {
        return (
            <Wrapper>
                <UserDetails>
                    <UserBackgroundHolder>
                        <UserBannerImg src={currentUser["profile"]["bannerSrc"]} />
                    </UserBackgroundHolder>
                    <UserInfoWrapper>
                        <AvatarHolder>
                            <AvatarImg src={currentUser["profile"]["avatarSrc"]} />
                        </AvatarHolder>
                        <FollowBox>
                            <FollowButton>Some dude</FollowButton>
                        </FollowBox>
                    </UserInfoWrapper>
                </UserDetails>
                <div>Profile what</div>
            </Wrapper>
        )

    }
};

export default Profile;