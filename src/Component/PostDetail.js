import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './../Css/PostDetail.css';
import { FiHeart, FiShare2, FiMessageCircle, FiThumbsUp } from 'react-icons/fi';
import { trendingTopicsData, relatedCommunitiesData } from '../mockData'; // Only import static data

// Mock data is now imported from ../mockData.js

const Comment = ({ comment }) => (
    <div className="comment-thread">
        <div className="comment-card">
            <img src={comment.avatar} alt={comment.author} className="comment-avatar" />
            <div className="comment-content">
                <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-time">{comment.time}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
                <div className="comment-actions">
                    <button><FiThumbsUp size={14} /> {comment.likes}</button>
                    <button><FiMessageCircle size={14} /> Reply</button>
                </div>
            </div>
        </div>
        {comment.replies && comment.replies.length > 0 && (
            <div className="comment-replies">
                {comment.replies.map(reply => <Comment key={reply.id} comment={reply} />)}
            </div>
        )}
    </div>
);

// --- New Sidebar Components ---
const AboutAuthorCard = ({ author, avatar }) => (
    <div className="sidebar-card">
        <h4>About the Author</h4>
        <div className="author-info">
            <img src={avatar} alt={author} className="author-avatar-large" />
            <h5>{author}</h5>
            <p>Passionate about building sustainable communities through local action and shared knowledge.</p>
            <button className="profile-button">View Profile</button>
        </div>
    </div>
);

const TrendingTopicsCard = ({ topics }) => (
    <div className="sidebar-card">
        <h4>Trending Topics</h4>
        <ul className="trending-topics-list">
            {topics.map(topic => <li key={topic}>{topic}</li>)}
        </ul>
    </div>
);

const RelatedCommunitiesCard = ({ communities }) => (
    <div className="sidebar-card">
        <h4>Also View Communities</h4>
        <ul className="related-communities-list">
            {communities.map(community => (
                <li key={community.name}>
                    <div className="community-info">
                        <h5>{community.name}</h5>
                        <p>{community.members}</p>
                    </div>
                    <button className="join-button">+</button>
                </li>
            ))}
        </ul>
    </div>
);

// --- New Pooling Card Component ---
const PoolingCard = ({ poolDetails, onJoin }) => {
    const { current, needed } = poolDetails;
    const progress = (current / needed) * 100;

    return (
        <div className="sidebar-card">
            <h4>Order Pool Status</h4>
            <div className="pool-status">
                <p>Help make this group order happen!</p>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <p><strong>{current} of {needed}</strong> shoppers have joined</p>
                <button 
                    className="join-pool-button" 
                    onClick={onJoin}
                    disabled={current >= needed}
                >
                    {current >= needed ? 'Pool Complete!' : 'Join Pool'}
                </button>
            </div>
        </div>
    );
};

function PostDetail() {
    let { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch post from backend API
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const postData = await response.json();
                setPost(postData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    // State for the pool count
    const [poolCount, setPoolCount] = useState(0);

    useEffect(() => {
        if (post?.poolDetails) {
            setPoolCount(post.poolDetails.current);
        }
    }, [post]);

    const handleJoinPool = () => {
        if (poolCount < post.poolDetails.needed) {
            setPoolCount(poolCount + 1);
        }
    };

    // Show loading state
    if (loading) {
        return (
            <div className="post-detail-page">
                <div className="post-detail-container">
                    <div className="loading-message">Loading post...</div>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="post-detail-page">
                <div className="post-detail-container">
                    <div className="error-message">Error: {error}</div>
                </div>
            </div>
        );
    }

    // Render a "not found" message if the post doesn't exist
    if (!post) {
        return (
            <div className="post-detail-page">
                <div className="post-detail-container">
                    <h2>Post not found!</h2>
                </div>
            </div>
        );
    }

    const currentPoolDetails = { ...post.poolDetails, current: poolCount };

    return (
        <div className="post-detail-page">
            <div className="post-detail-container">
                <div className="post-main-content">
                    <div className="post-detail-card">
                        <h1 className="post-detail-title">{post.title}</h1>
                        <div className="post-meta-info">
                            <img src={post.avatar} alt={post.author} className="author-avatar-small" />
                            <span>Posted by <strong>{post.author}</strong> &bull; {post.time}</span>
                        </div>
                        <div className="post-tags-detail">
                            {post.tags.map(tag => (
                                <span key={tag} className="post-tag">{tag}</span>
                            ))}
                        </div>
                        <p className="post-detail-body">{post.body}</p>
                        <div className="post-detail-actions">
                            <button className="like-button"><FiHeart /> {post.likes} Likes</button>
                            <button className="share-button"><FiShare2 /> Share</button>
                        </div>
                    </div>

                    <div className="comment-section">
                        <h3>Comments ({post.comments.length})</h3>
                        <div className="add-comment-form">
                            <img src="https://i.pravatar.cc/150?u=currentUser" alt="current user" className="comment-avatar" />
                            <input type="text" placeholder="Add a comment..." />
                            <button>Post</button>
                        </div>
                        <div className="comment-list">
                            {post.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
                        </div>
                    </div>
                </div>

                <div className="post-sidebar">
                    {post.isPool && <PoolingCard poolDetails={currentPoolDetails} onJoin={handleJoinPool} />}
                    <AboutAuthorCard author={post.author} avatar={post.avatar} />
                    <TrendingTopicsCard topics={trendingTopicsData} />
                    <RelatedCommunitiesCard communities={relatedCommunitiesData} />
                </div>
            </div>
        </div>
    );
}

export default PostDetail; 
