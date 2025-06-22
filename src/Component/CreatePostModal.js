import React, { useState } from 'react';
import './../Css/CreatePostModal.css';
import { FiX } from 'react-icons/fi';

function CreatePostModal({ isOpen, onClose, onAddPost }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isPool, setIsPool] = useState(false);
    const [location, setLocation] = useState('');

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            title,
            body,
            tags: isPool ? ['Order Pooling', 'Local Delivery'] : ['General'],
            isPool,
            location: isPool ? location : undefined,
            poolDetails: isPool ? { current: 1, needed: 10 } : undefined,
        };
        onAddPost(newPost); 
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Create New Post</h2>
                    <button onClick={onClose} className="close-button"><FiX /></button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        type="text"
                        placeholder="Post Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="What's on your mind?"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    ></textarea>
                    
                    <div className="is-pool-checkbox">
                        <label htmlFor="isPool" className="toggle-label">This is an Order Pool post</label>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                id="isPool"
                                checked={isPool}
                                onChange={(e) => setIsPool(e.target.checked)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>

                    {isPool && (
                        <div className="pool-details-inputs">
                            <input
                                type="text"
                                placeholder="Location (e.g., Green Oaks)"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="modal-footer">
                        <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
                        <button type="submit" className="submit-button">Create Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePostModal; 
