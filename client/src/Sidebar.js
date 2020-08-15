import React from 'react';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { COLORS } from "./constants";

import { FiHome, FiUser, FiBookmark, FiShare } from 'react-icons/fi';
import { FaRegComment, FaRetweet, FaRegHeart } from 'react-icons/fa';
import { IoMdNotificationsOutline } from "react-icons/io";
import { GiWhiteCat } from "react-icons/gi";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Nav = styled.nav`
    margin: 20px 0 0 20px;
`

const StyledUl = styled.ul`
    width: 200px;
    font-size: 20px;
    padding: 0;
`;

const MenuLink = styled.li`
    list-style: none;
    margin-bottom: 30px;
`;

const NavigationLink = styled(NavLink)`
    color: black;
    border-radius: 25px;
    text-decoration: none;
    padding: 15px;

  &.active {
    color: ${COLORS.primary};
    background: #f1ccff;
  }
`;

const IconSpan = styled.span`
    margin-right: 30px;
`;

const HeaderIcon = styled.div`
    font-size: 50px;
    color: ${COLORS.primary};
`

const MeowButton = styled.button`
    width: 200px;
    border-radius: 25px;
    font-size: 20px;
    background: ${COLORS.primary};
    color: white;
    padding: 10px 0;
    border: none;
    margin: 0 20px 20px 20px;
`

const Sidebar = () => {
    return (
        <Wrapper>

            <Nav>
                <HeaderIcon><GiWhiteCat /></HeaderIcon>
                <StyledUl>
                    <MenuLink><NavigationLink exact to="/"><IconSpan><FiHome /></IconSpan>Home</NavigationLink></MenuLink>
                    <MenuLink><NavigationLink to="/treasurymog"><IconSpan><FiUser /></IconSpan>Profile</NavigationLink></MenuLink> {/* this will eventually need to become dynamic depending on API response*/}
                    <MenuLink><NavigationLink to="/notifications"><IconSpan><IoMdNotificationsOutline /></IconSpan>Notifications</NavigationLink></MenuLink>
                    <MenuLink><NavigationLink to="/bookmarks"><IconSpan><FiBookmark /></IconSpan>Bookmarks</NavigationLink></MenuLink>
                </StyledUl>
            </Nav>

            <MeowButton>Meow</MeowButton>
        </Wrapper>
    )
};

export default Sidebar;