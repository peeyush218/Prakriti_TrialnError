import React from 'react';
import './../Css/Forum.css';
import { FiHome, FiMessageSquare, FiCompass, FiZap, FiAward, FiPlusCircle, FiStar, FiUsers, FiBox, FiSun } from 'react-icons/fi';
import { relatedCommunitiesData } from '../mockData'; // Import the new data

// Helper to assign unique icons to communities
const communityIcons = [
    <FiSun className="community-icon" />,
    <FiBox className="community-icon" />,
    <FiAward className="community-icon" />
];

function ForumLeftSidebar() {
    const mainNav = [
        { name: 'Home', icon: <FiHome />, active: true },
        { name: 'My Threads', icon: <FiMessageSquare /> },
        { name: 'My Communities', icon: <FiUsers /> },
        { name: 'Saved', icon: <FiStar /> },
    ];

    const categories = [
        { name: 'Order Pooling', icon: <FiCompass /> },
        { name: 'Sustainable Sourcing', icon: <FiZap /> },
        { name: 'Ethical Consumerism', icon: <FiAward /> },
        { name: 'Start a New Topic', icon: <FiPlusCircle /> },
    ];

    return (
        <div className="forum-sidebar forum-left-sidebar">
            <div className="sidebar-section">
                <ul>
                    {mainNav.map(item => (
                        <li key={item.name} className={item.active ? 'active' : ''}>
                            {item.icon}
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="sidebar-section">
                <h4>Categories</h4>
                <ul>
                    {categories.map(cat => (
                        <li key={cat.name}>
                            {cat.icon}
                            <span>{cat.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sidebar-section">
                <h4>Related Communities</h4>
                <ul className="related-communities-list">
                    {relatedCommunitiesData.map((community, index) => (
                        <li key={community.name}>
                             {communityIcons[index % communityIcons.length]}
                            <div className="community-info">
                                <span>{community.name}</span>
                                <small>{community.members}</small>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ForumLeftSidebar;
