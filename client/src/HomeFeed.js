import React from 'react';

const HomeFeed = () => {

    async function getFeed() {
        try {
            let feedDataHolder = await fetch('/api/me/home-feed');
            let feedData = await feedDataHolder.json();
            return feedData;
        } catch (err) {
            console.log(err);
        }
    }

    console.log(getFeed().then(data => console.log(data)));

    return <div>HomeFeed</div>;
};

export default HomeFeed;