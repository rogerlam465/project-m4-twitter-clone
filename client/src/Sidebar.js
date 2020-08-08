import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { COLORS } from "./constants";

import { FiHome, FiUser, FiBookmark } from 'react-icons/fi';
import { IoMdNotificationsOutline } from "react-icons/io";
import { GiWhiteCat } from "react-icons/gi";

const Nav = styled.nav`
    margin: 20px;
`

const StyledUl = styled.ul`
    width: 300px;
    font-size: 20px;
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
    text-align: center;
    width: 300px;
    font-size: 50px;
    color: ${COLORS.primary};
`

const Sidebar = () => {
    return (
        <Router>
            <Nav>
                <HeaderIcon><GiWhiteCat /></HeaderIcon>
                <StyledUl>
                    <MenuLink><NavigationLink to="/"><IconSpan><FiHome /></IconSpan>Home</NavigationLink></MenuLink>
                    <MenuLink><NavigationLink to="/treasurymog"><IconSpan><FiUser /></IconSpan>Profile</NavigationLink></MenuLink> {/* this will eventually need to become dynamic depending on API response*/}
                    <MenuLink><NavigationLink to="/notifications"><IconSpan><IoMdNotificationsOutline /></IconSpan>Notifications</NavigationLink></MenuLink>
                    <MenuLink><NavigationLink to="/bookmarks"><IconSpan><FiBookmark /></IconSpan>Bookmarks</NavigationLink></MenuLink>
                </StyledUl>
            </Nav>
        </Router>
    )
};

export default Sidebar;