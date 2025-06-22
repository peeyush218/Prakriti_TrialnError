import React, { useState, useEffect } from 'react';
import './../Css/Forum.css';
import { FiMessageCircle, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CreatePostModal from './CreatePostModal'; // Import the modal

// --- Flair: Random Name and Avatar Generation ---
const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "River", "Jamie", "Skyler", "Rowan", "Quinn"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];

const generateRandomUser = () => {
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomName = `${randomFirstName} ${randomLastName}`;
    const randomSeed = Math.random().toString(36).substring(7);
    const randomAvatar = `https://i.pravatar.cc/150?u=${randomSeed}`;

    return { name: randomName, avatar: randomAvatar };
}

const PostCard = ({ post }) => (
    <Link to={`/post/${post.id}`} className="post-card-link">
        <div className="post-card">
            <div className="post-header">
                <div className="post-author-info-main">
                    <img src={post.avatar} alt={`${post.author}'s avatar`} className="post-avatar" />
                    <div className="post-author-details">
                        <h3 className="post-title">{post.title}</h3>
                        <div className="post-meta-info">
                            <span>By <strong>{post.author}</strong> &bull; {post.time}</span>
                            {post.isPool && post.location && (
                                <span className="post-location">
                                    <FiMapPin />
                                    {post.location}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="post-tags">
                    {post.tags.map(tag => (
                        <span key={tag} className="post-tag">{tag}</span>
                    ))}
                </div>
            </div>
            <div className="post-body">
                <p>{post.body}</p>
            </div>
            <div className="post-footer">
                <button className="add-response-button">
                    <FiMessageCircle /> 
                    <span>
                        {post.comments && post.comments.length > 0 ? `${post.comments.length} Responses` : 'Add Response'}
                    </span>
                </button>
                {post.comments && post.comments.length > 0 && (
                    <div className="post-replies">
                        <div className="reply-avatars">
                            {post.comments.slice(0, 3).map((comment) => (
                                <img key={comment.id} src={comment.avatar} alt={comment.author} />
                            ))}
                        </div>
                        {post.comments.length > 3 && (
                            <span className="reply-count">+{post.comments.length - 3}</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    </Link>
);

function ForumMainContent() {
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch('/posts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleAddPost = async (newPostDetails) => {
        try {
            const randomUser = generateRandomUser();

            const response = await fetch('/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: `post_${new Date().getTime()}`,
                    author: randomUser.name,
                    avatar: randomUser.avatar,
                    time: 'Just now',
                    likes: 0,
                    comments: [],
                    ...newPostDetails
                }),
            });
            if (response.ok) {
                // Refresh the posts from the backend to show the new one
                fetchPosts();
            } else {
                console.error("Failed to create post");
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <div className="forum-main-content">
            <div className="forum-toolbar">
                <div className="sort-options">
                    <span>Sort by:</span>
                    <button className="sort-button active">Latest</button>
                    <button className="sort-button">Trending</button>
                    <button className="sort-button">Most Liked</button>
                </div>
                <div className="new-discussion-bar">
                    <button className="start-discussion-button" onClick={() => setIsModalOpen(true)}>
                        Start a new discussion...
                    </button>
                    <button className="add-thread-button" onClick={() => setIsModalOpen(true)}>+</button>
                </div>
            </div>

            <div className="discussion-list">
                {loading && <p>Loading posts...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && posts.length === 0 && <p>No posts found.</p>}
                {!loading && !error && posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            <CreatePostModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddPost={handleAddPost}
            />
        </div>
    );
}

export default ForumMainContent;
