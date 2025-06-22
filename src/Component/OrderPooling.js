import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './../Css/Forum.css';
import './../Css/OrderPooling.css';


const createCustomIcon = (avatarUrl) => {
    return L.divIcon({
        html: `<img src="${avatarUrl}" class="map-avatar-icon" />`,
        className: 'custom-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
};

const PoolPostCard = ({ post, coordinates }) => {
    const position = coordinates;
    const zoomLevel = 15;

    // Fallback in case coordinates are not yet available
    if (!post) {
        return null;
    }

    // Create a list of participants for the map markers
    const participants = [];
    if (post.avatar) {
        participants.push({ avatar: post.avatar, type: 'author' });
    }
    if (post.comments && post.poolDetails) {
        // We only need to show as many commenters as have "joined" the pool, minus the author.
        const commentersToShow = post.poolDetails.current - 1;
        post.comments.slice(0, commentersToShow).forEach(comment => {
            participants.push({ avatar: comment.avatar, type: 'participant' });
        });
    }


    return (
        <div className="pool-post-card-with-map">
            <div className="post-details-section">
                <div className="post-header">
                    <div className="post-author-info">
                        <img src={post.avatar} alt={`${post.author}'s avatar`} className="post-avatar" />
                        <div className="post-author-details">
                            <h3 className="post-title">
                                <Link to={`/post/${post.id}`}>{post.title}</Link>
                            </h3>
                            <div className="post-meta-info">
                                <span>By <strong>{post.author}</strong> &bull; {post.time}</span>
                                <span className="post-location">
                                    <FiMapPin size="0.875rem" />
                                    {post.location}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="post-tags">
                        {post.tags && post.tags.map(tag => (
                            <span key={tag} className="post-tag">{tag}</span>
                        ))}
                    </div>
                </div>

                <p className="post-body">{post.body}</p>

                {post.poolDetails && (
                    <div className="post-pool-status">
                        <strong>{post.poolDetails.current} of {post.poolDetails.needed}</strong> shoppers have joined
                    </div>
                )}
            </div>
            <div className="post-map-section">
                {position ? (
                    <MapContainer center={position} zoom={zoomLevel} scrollWheelZoom={false} className="mini-map-container">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {participants.map((participant, index) => {
                            // Apply a small random offset ("jitter") to participant markers
                            const jitter = 0.0015;
                            const markerPosition = participant.type === 'author'
                                ? position
                                : [
                                    position[0] + (Math.random() - 0.5) * jitter,
                                    position[1] + (Math.random() - 0.5) * jitter,
                                  ];

                            return (
                                <Marker key={index} position={markerPosition} icon={createCustomIcon(participant.avatar)}>
                                    <Popup>
                                        {participant.type === 'author'
                                            ? "This is the pool's primary location."
                                            : "A shopper has joined here!"}
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                ) : (
                    <div className="map-placeholder">Fetching location...</div>
                )}
            </div>
        </div>
    );
};

function OrderPooling() {
    const [poolingPosts, setPoolingPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [coords, setCoords] = useState({});

    const geocodeLocation = useCallback(async (location) => {
        if (!location) return null;
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1&countrycodes=in`);
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                return [parseFloat(lat), parseFloat(lon)];
            }
        } catch (error) {
            console.error(`Geocoding error for ${location}:`, error);
        }
        return null; // Return null if geocoding fails
    }, []);

    useEffect(() => {
        const fetchAndGeocodePosts = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8000/posts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const allPosts = await response.json();
                const filteredPosts = allPosts.filter(post => post.isPool);
                setPoolingPosts(filteredPosts);

                // Create a copy of existing coords to update
                const newCoords = { ...coords };
                
                // Use Promise.all to geocode all new locations in parallel
                await Promise.all(
                    filteredPosts.map(async (post) => {
                        if (post.location && !newCoords[post.location]) {
                            const newPosition = await geocodeLocation(post.location);
                            if (newPosition) {
                                newCoords[post.location] = newPosition;
                            }
                        }
                    })
                );
                
                setCoords(newCoords);

            } catch (error) {
                console.error("Error fetching or geocoding posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndGeocodePosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [geocodeLocation]);

    return (
        <div className="forum-main-content" style={{padding: '2rem'}}>
            <h1 className="page-title" style={{marginBottom: '2rem', fontSize: '2rem'}}>Active Order Pools</h1>
            
            {loading ? (
                <p>Loading active pools...</p>
            ) : (
                <div className="discussion-list-vertical">
                    {poolingPosts.length > 0 ? (
                        poolingPosts.map((post) => (
                            <PoolPostCard key={post.id} post={post} coordinates={coords[post.location]} />
                        ))
                    ) : (
                        <p>No active order pools found at the moment.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default OrderPooling;