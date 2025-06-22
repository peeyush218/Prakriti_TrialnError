import React from 'react';
import './../Css/Forum.css';

// --- Expanded Mock Data for Local Shoppers ---
const localShoppers = [
    { name: 'Leslie Alexander', location: 'Green Oaks', avatar: 'https://i.pravatar.cc/150?u=leslie' },
    { name: 'Darlene Robert', location: 'Willow Creek', avatar: 'https://i.pravatar.cc/150?u=darlene' },
    { name: 'Albert Flores', location: 'Green Oaks', avatar: 'https://i.pravatar.cc/150?u=albert' },
    { name: 'Jane Cooper', location: 'Maplewood', avatar: 'https://i.pravatar.cc/150?u=cooper' },
    { name: 'Brooklyn Sins', location: 'Willow Creek', avatar: 'https://i.pravatar.cc/150?u=brooklyn' },
    { name: 'Cameron Williams', location: 'Green Oaks', avatar: 'https://i.pravatar.cc/150?u=cameron' },
    { name: 'Jenny Wilson', location: 'Maplewood', avatar: 'https://i.pravatar.cc/150?u=jenny' },
];

// --- Mock Data for Trending Topics ---
const trendingTopics = [
    '#ZeroWastePackaging',
    '#CommunityComposting',
    '#SustainableFashion',
    '#ElectricDelivery',
    '#UrbanFarming',
];

const UserListItem = ({ user }) => (
    <li className="user-list-item">
        <img src={user.avatar} alt={user.name} className="user-avatar" />
        <div className="user-info">
            <h5>{user.name}</h5>
            <p>{user.location}</p>
        </div>
        <button className="connect-button">Connect</button>
    </li>
);

function ForumRightSidebar() {
    return (
        <div className="forum-sidebar forum-right-sidebar">
            <div className="sidebar-card">
                <h4>Local Shoppers</h4>
                <ul className="user-list">
                    {localShoppers.map(user => (
                        <UserListItem key={user.name} user={user} />
                    ))}
                </ul>
            </div>
            <div className="sidebar-card">
                <h4>Trending Topics</h4>
                <ul className="trending-topics-list">
                    {trendingTopics.map(topic => (
                        <li key={topic}>{topic}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ForumRightSidebar;
