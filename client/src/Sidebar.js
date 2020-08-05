import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

const StyledLink = styled(Link)`

`

const Sidebar = () => {
    return (
        <Router>
            <Link to="/">Home</Link>
            <Link to="/">Profile</Link> {/* this will eventually need to become dynamic depending on API response*/}
            <Link to="/notifications">Notifications</Link>
            <Link to="/bookmarks">Bookmarks</Link>
        </Router>
    )
};

export default Sidebar;