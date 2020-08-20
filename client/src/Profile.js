import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useParams } from "react-router";

import TweetFeed from './GenericFeed';
import { CurrentUserContext } from './CurrentUserContext';
import { CurrentFeedContext } from './HomeFeedContext';

import { GrLocation } from 'react-icons/gr';
import { FiCalendar } from 'react-icons/fi';


// contains the whole lot

const Wrapper = styled.div`
    width: 815px;
    border-left: 1px solid lightgrey;
    border-right: 1px solid lightgrey;
    font-size: 20px;
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
// one million divs and spans for individual UI components.
// there's got to be a better way of doing this.

const UserWrapper = styled.div`
    padding: 0 10px;
`

const UserName = styled.div`
    font-weight: bold;
    font-size: 16px;
    margin-top: 10px;
`

const UserHandle = styled.div`
    color: grey;
`

const UserFollows = styled.span`
    padding: 3px;
    border-radius: 5px;
    background: lightgrey;
    font-size: 12px;
    color: black;
`

const UserBio = styled.div`
    margin: 10px 0;
`

const GreySpace = styled.span`
    color: grey;
    margin-right: 10px;
`
const Spacer = styled.div`
    margin: 10px 0;
`

// profile feed incl. top menu thingy

const MenuHolder = styled.div`
    border-bottom: lightgrey 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const OtherMenu = styled.div`
    flex-grow: 1;
    text-align: center;
    font-size: 20px;
`

const TweetsMenu = styled(OtherMenu)`
    border-bottom: 1px solid royalblue;
`

const MenuTitle = styled.div`
    padding: 20px 0;
`

const Profile = () => {

    const { feedStatus } = React.useContext(CurrentFeedContext);
    const { currentUser, status } = React.useContext(CurrentUserContext);

    const [thisUser, setThisUser] = React.useState(null);

    let userHold = useParams();

    // this does not work as expected, and I do not care for that fact.

    async function getUserData(pageUser) {
        try {
            let holder = await fetch("/api/" + pageUser + "/profile/");
            let data = await holder.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUserData(userHold["profileId"]).then(data => {
            setThisUser(data["profile"]);
        });
    }, [thisUser, setThisUser])

    if (status !== "done" || feedStatus !== "done" || thisUser === null) {
        return <div>>Loading...</div>
    } else {

        const rawDate = Date.parse(thisUser["joined"]);
        const dateHandler = format(rawDate, "MMMM y");

        return (
            <Wrapper>
                <UserDetails>
                    <UserBackgroundHolder>
                        <UserBannerImg src={thisUser["bannerSrc"]} />
                    </UserBackgroundHolder>
                    <UserInfoWrapper>
                        <AvatarHolder>
                            <AvatarImg src={thisUser["avatarSrc"]} />
                        </AvatarHolder>
                        <FollowBox>
                            {thisUser["handle"] !== currentUser["profile"]["handle"] &&
                                <FollowButton>{thisUser["isBeingFollowedByYou"] ? 'Unfollow' : 'Follow'}</FollowButton>
                            }
                        </FollowBox>
                    </UserInfoWrapper>
                </UserDetails>
                <UserWrapper>
                    <UserName>{thisUser["displayName"]}</UserName>
                    <UserHandle>@{thisUser["handle"]}
                        {thisUser["isFollowingYou"] &&
                            <UserFollows>Follows you</UserFollows>
                        }
                    </UserHandle>
                    <UserBio>{thisUser["bio"]}</UserBio>
                    <Spacer><GreySpace><GrLocation />{thisUser["location"]}</GreySpace> <GreySpace><FiCalendar />Joined {dateHandler}</GreySpace></Spacer>
                    <Spacer>{thisUser["numFollowing"]} <GreySpace>Following</GreySpace> {thisUser["numFollowers"]} <GreySpace>Followers</GreySpace></Spacer>
                </UserWrapper>
                <MenuHolder>
                    <TweetsMenu><MenuTitle>Tweets</MenuTitle></TweetsMenu><OtherMenu><MenuTitle>Media</MenuTitle></OtherMenu><OtherMenu><MenuTitle>Likes</MenuTitle></OtherMenu>
                </MenuHolder>
                <TweetFeed />
            </Wrapper>
        )
    }
};

export default Profile;