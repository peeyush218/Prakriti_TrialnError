import React from 'react';
import './../Css/Leaderboard.css'; // We will create this CSS file next
import { FiCopy, FiCheckCircle } from 'react-icons/fi';

// --- Mock Data ---
const leaderboardData = [
  { rank: 1, name: 'Jacob Jones', handle: 'jacob_99', ecoKarma: '+1,240 pts', deliveryTripsSaved: '70', winRate: '92%', profit: '70 kg', avatar: 'https://i.pravatar.cc/150?u=jacob_99', impactLevel: 9 },
  { rank: 2, name: 'Robert Fox', handle: 'foxy_rob', ecoKarma: '+1,180 pts', deliveryTripsSaved: '66', winRate: '88%', profit: '65 kg', avatar: 'https://i.pravatar.cc/150?u=foxy_rob', impactLevel: 8 },
  { rank: 3, name: 'Albert Flores', handle: 'albert_02', ecoKarma: '+1,150 pts', deliveryTripsSaved: '64', winRate: '85%', profit: '61 kg', avatar: 'https://i.pravatar.cc/150?u=albert_02', impactLevel: 8 },
  { rank: 4, name: 'Cupsey', handle: 'johnsmith0', ecoKarma: '880 pts', deliveryTripsSaved: '56', winRate: '82%', profit: '42 kg', avatar: 'https://i.pravatar.cc/150?u=johnsmith0', impactLevel: 7 },
  { rank: 5, name: 'Cented', handle: 'jjameson0', ecoKarma: '850 pts', deliveryTripsSaved: '50', winRate: '79%', profit: '40 kg', avatar: 'https://i.pravatar.cc/150?u=jjameson0', impactLevel: 6 },
  { rank: 6, name: 'Jalen', handle: 'jaly', ecoKarma: '845 pts', deliveryTripsSaved: '44', winRate: '78%', profit: '39 kg', avatar: 'https://i.pravatar.cc/150?u=jaly', impactLevel: 5 },
  { rank: 7, name: 'Marcell', handle: 'marc', ecoKarma: '820 pts', deliveryTripsSaved: '40', winRate: '76%', profit: '37 kg', avatar: 'https://i.pravatar.cc/150?u=marc', impactLevel: 4 },
  { rank: 8, name: 'Cooker', handle: 'cooker_3', ecoKarma: '810 pts', deliveryTripsSaved: '36', winRate: '75%', profit: '35 kg', avatar: 'https://i.pravatar.cc/150?u=cooker_3', impactLevel: 3 },
  { rank: 9, name: 'Euris', handle: 'euris_0', ecoKarma: '790 pts', deliveryTripsSaved: '32', winRate: '74%', profit: '33 kg', avatar: 'https://i.pravatar.cc/150?u=euris_0', impactLevel: 2 },
];

const Leaderboard = () => {
    const topPerformers = leaderboardData.slice(0, 3);
    const restOfBoard = leaderboardData.slice(3);

    return (
        <div className="leaderboard-container">
            <header className="leaderboard-header">
                <h1>Impact Leaderboard</h1>
                <div className="time-filters">
                    <button className="filter-btn active">All Time</button>
                    <button className="filter-btn">Yearly</button>
                    <button className="filter-btn">Quarterly</button>
                </div>
            </header>

            <section className="top-performers">
                {topPerformers.map(user => (
                    <div key={user.rank} className="performer-card">
                        <header className="card-header">
                            <img src={user.avatar} alt={user.name} className="avatar"/>
                            <div className="user-info">
                                <span className="user-name">{user.name}</span>
                                <span className="user-handle">@{user.handle}</span>
                            </div>
                        </header>
                        <div className="card-stats">
                            <div className="stat">
                                <span className="stat-label">EcoKarma</span>
                                <span className="stat-value pnl-positive">{user.ecoKarma}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Delivery Trips Saved</span>
                                <span className="stat-value">{user.deliveryTripsSaved}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Pool Success</span>
                                <span className="stat-value win-rate">{user.winRate}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">CO2 Saved (est.)</span>
                                <span className="stat-value">{user.profit}</span>
                            </div>
                        </div>
                        <footer className="card-footer">
                            <div className="impact-tree-container">
                                <span className="impact-tree-label">Impact Tree</span>
                                <img src={`/images/i_tree_${user.impactLevel}.png`} alt={`Impact Tree Level ${user.impactLevel}`} className="impact-tree-image-card" />
                            </div>
                        </footer>
                    </div>
                ))}
            </section>

            <section className="leaderboard-table-section">
                <table className="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>EcoKarma</th>
                            <th>Pool Success</th>
                            <th>CO2 Saved (est.)</th>
                            <th>Delivery Trips Saved</th>
                            <th>Impact Tree</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restOfBoard.map(user => (
                            <tr key={user.rank}>
                                <td className="rank-cell">{user.rank}</td>
                                <td className="user-cell">
                                    <img src={user.avatar} alt={user.name} className="table-avatar"/>
                                    <div className="table-user-info">
                                        <span className="table-user-name">{user.name}</span>
                                        <span className="table-user-handle">@{user.handle}</span>
                                    </div>
                                </td>
                                <td className="pnl-positive">{user.ecoKarma}</td>
                                <td className="win-rate">{user.winRate}</td>
                                <td>{user.profit}</td>
                                <td>{user.deliveryTripsSaved}</td>
                                <td className="impact-tree-cell">
                                    <img src={`/images/i_tree_${user.impactLevel}.png`} alt={`Impact Tree Level ${user.impactLevel}`} className="impact-tree-image-table" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Leaderboard; 
