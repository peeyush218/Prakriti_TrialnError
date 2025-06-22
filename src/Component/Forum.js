import React from 'react';
import './../Css/Forum.css';
import ForumLeftSidebar from './ForumLeftSidebar';
import ForumMainContent from './ForumMainContent';
import ForumRightSidebar from './ForumRightSidebar';
import Navbargreen from './navbargreen';

function Forum() {
    return (
        <div className="forum-page">
            <div className="forum-container">
                <ForumLeftSidebar />
                <ForumMainContent />
                <ForumRightSidebar />
            </div>
        </div>
    );
}

export default Forum;