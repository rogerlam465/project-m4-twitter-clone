import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { COLORS } from "./constants";

import { FiHome, FiUser, FiBookmark } from 'react-icons/fi';
import { IoMdNotificationsOutline } from "react-icons/io";

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
  padding: 20px;
  border-radius: 50px;

  &.active {
    color: ${COLORS.primary};
    background: #f1ccff;
  }
`;

const IconSpan = styled.span`
    margin-right: 30px;
`;

const Sidebar = () => {
    return (
        <Router>
            <nav>
                <StyledUl>
                    <MenuLink><NavigationLink to="/"><IconSpan><FiHome /></IconSpan>Home</NavigationLink></MenuLink>
                    <MenuLink><NavigationLink to="/treasurymog"><IconSpan><FiUser /></IconSpan>Profile</NavigationLink></MenuLink> {/* this will eventually need to become dynamic depending on API response*/}
                    <MenuLink><NavigationLink to="/notifications"><IconSpan><IoMdNotificationsOutline /></IconSpan>Notifications</NavigationLink></MenuLink>
                    <MenuLink><NavigationLink to="/bookmarks"><IconSpan><FiBookmark /></IconSpan>Bookmarks</NavigationLink></MenuLink>
                </StyledUl>
            </nav>
        </Router>
    )
};

export default Sidebar;