import React, { useEffect } from 'react';

export const CurrentFeedContext = React.createContext(null);

export const CurrentFeedProvider = ({ children }) => {
    const [currentFeed, setFeed] = React.useState(null);
    const [feedStatus, setFeedStatus] = React.useState("loading");

    async function getFeedData() {
        try {
            let holder = await fetch('/api/me/home-feed');
            let data = await holder.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getFeedData().then(data => {
            setFeed(data);
            setFeedStatus("done");
        });
    }, [])


    return (
        <CurrentFeedContext.Provider value={{ currentFeed, feedStatus }}>
            {children}
        </CurrentFeedContext.Provider>
    );
}