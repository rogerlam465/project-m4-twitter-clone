import React, { useEffect } from 'react';

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