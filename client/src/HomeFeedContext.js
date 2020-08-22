import React, { useEffect } from 'react';

export const CurrentFeedContext = React.createContext(null);

// ok. Apparently I can pass a whole function in the provider.
// this works because everything is just data in JS, I guess?
// anyways. I can therefore set the fetch URL based on where I am.

export const CurrentFeedProvider = ({ children }) => {
    const [currentFeed, setFeed] = React.useState(null);
    const [feedStatus, setFeedStatus] = React.useState("loading");

    async function getFeedData(profileId) {
        let url = "";
        if (profileId) {
            url = "/api/" + profileId + "/feed";
        } else {
            url = "/api/me/home-feed";
        }
        try {
            let holder = await fetch(url);
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
        <CurrentFeedContext.Provider value={{ currentFeed, feedStatus, setFeed, setFeedStatus, getFeedData }}>
            {children}
        </CurrentFeedContext.Provider>
    );
}