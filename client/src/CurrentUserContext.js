import React, { useEffect } from 'react';

// from what Mae said, it sounds like we need, like, multiple feeds
// and the project is kind of encouraging us to use context everywhere
// So I'm wondering if we shouldn't just convert CurrentUserContext
// to OverallContext and have an array of states. I mean, why not.

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [status, setStatus] = React.useState("loading");

    async function getUserData() {
        try {
            let holder = await fetch('/api/me/profile');
            let data = await holder.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (currentUser === null) {
            getUserData().then(data => {
                setCurrentUser(data);
            });
            setStatus("done");
        }
    })


    return (
        <CurrentUserContext.Provider value={{ currentUser, status }}>
            {children}
        </CurrentUserContext.Provider>
    );
}