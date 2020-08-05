import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from 'styled-components';
import { FiHome, FiUser, FiBookmark } from 'react-icons/fi';
import { IoMdNotificationsOutline } from "react-icons/io";

const StyledLink = styled(Link)`

`

const Sidebar = () => {
    return (
        <Router>
            <ul>
                <li><Link to="/"><FiHome />Home</Link></li>
                <li><Link to="/treasurymog"><FiUser />Profile</Link></li> {/* this will eventually need to become dynamic depending on API response*/}
                <li><Link to="/notifications"><IoMdNotificationsOutline />Notifications</Link></li>
                <li><Link to="/bookmarks"><FiBookmark />Bookmarks</Link></li>
            </ul>
        </Router>
    )
};

export default Sidebar;