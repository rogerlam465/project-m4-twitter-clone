import React from 'react';

export const CurrentUserContext = React.createContext(null);

// Here's what I don't get. Here we're creating
// CurrentUserContext, which is the context object, fine.
// But we never import that into another file. We do
// import CurrentUserProvider, though.

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [status, setStatus] = React.useState("loading");

    async function getUserData() {
        let holder = await fetch('/api/me/profile');
        let data = await holder.json();
        return data;
    }

    if (currentUser === null) {
        getUserData().then(data => console.log(data)
        )
    }

    return (
        <CurrentUserContext.Provider value={{ currentUser, status }}>
            {children}
        </CurrentUserContext.Provider>
    );
}