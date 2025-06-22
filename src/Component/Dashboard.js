import React from 'react';
import { 
    BsPeople, BsPersonCircle, BsBoxArrowRight,
    BsGrid3X3GapFill, BsFillCalendar2WeekFill, BsFillBarChartFill, BsGearFill,
    BsQuestionCircleFill, BsSearch, BsEnvelopeFill, BsBellFill
} from 'react-icons/bs';
import { GiEcology, GiReceiveMoney } from "react-icons/gi";
import { FaShoePrints, FaUserCircle, FaLeaf } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, LineChart, Line } from 'recharts';
import '../Css/Dashboard.css';

const Dashboard = () => {
    
    const ecoKarmaData = [ { name: 'Jan', value: 120 }, { name: 'Feb', value: 200 }, { name: 'Mar', value: 180 }, { name: 'Apr', value: 250 }, { name: 'May', value: 300 }, { name: 'Jun', value: 400 }, ];
    const contributionsData = [ { name: 'Page A', uv: 2000, pv: 2400}, { name: 'Page B', uv: 3000, pv: 1398}, { name: 'Page C', uv: 2000, pv: 9800}, { name: 'Page D', uv: 2780, pv: 3908}, { name: 'Page E', uv: 1890, pv: 4800}, { name: 'Page F', uv: 2390, pv: 3800}, { name: 'Page G', uv: 3490, pv: 4300}];
    const carbonFootprintData = [ { name: 'A', value: 400 }, { name: 'B', value: 300 }, { name: 'C', value: 500 }, { name: 'D', value: 280 }, { name: 'E', value: 450 }, { name: 'F', value: 320 } ];

    const recentOrders = [
        { id: '897897987', name: 'Bamboo Toothbrush', category: 'Personal Care', amount: 120, date: '2025-06-01' },
        { id: '986578985', name: 'Reusable Cotton Tote Bag', category: 'Accessories', amount: 250, date: '2025-06-01' },
        { id: '97894352', name: 'Solar Power Charger', category: 'Electronics', amount: 180, date: '2025-06-01' },
        { id: '98787041', name: 'Stainless Steel Straw', category: 'Kitchen Items', amount: 90, date: '2025-04-21' },
        { id: '8978452', name: 'Eco-Friendly Notebook', category: 'Stationery', amount: 105, date: '2025-04-21' },
        { id: '98874542', name: 'Biodegradable Trash Bags', category: 'Home Essentials', amount: 275, date: '2025-04-21' }
    ];

    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="main-content">
                <div className="dashboard-header">
                    <h2 className="main-dashboard-title">YOUR DASHBOARD</h2>
                    <div className="header-actions">
                        <BsEnvelopeFill className="header-icon" />
                        <BsBellFill className="header-icon" />
                        <div className="user-profile">
                            <div className="user-avatar">
                                <img src="/images/userlogo.png" alt="User" />
                            </div>
                            <div className="user-info">
                                <p className="user-info-name">Prakhar</p>
                                <p className="user-info-email">prakhar@mail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <StatCard title="EcoKarma" value="652" icon={<GiEcology/>} data={carbonFootprintData} type="area" color="#4CAF50"/>
                    <StatCard title="Contributions" value="$2300" icon={<GiReceiveMoney/>} data={contributionsData} type="line" color="#2196F3"/>
                    <StatCard title="Carbon Footprint" value="200 Kg" icon={<FaShoePrints/>} data={carbonFootprintData} type="area" color="#FF9800"/>

                    <div className="card ecokarma-growth-card">
                        <h4>EcoKarma Growth</h4>
                        <div style={{height: '80%'}}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={ecoKarmaData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="colorEcoKarma" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#81C784" stopOpacity={0.9}/>
                                            <stop offset="95%" stopColor="#388E3C" stopOpacity={1}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false}/>
                                    <YAxis axisLine={false} tickLine={false}/>
                                    <Tooltip cursor={{fill: 'rgba(76, 175, 80, 0.1)'}}/>
                                    <Legend />
                                    <Bar dataKey="value" fill="url(#colorEcoKarma)" name="EcoKarma" radius={[5, 5, 0, 0]}/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    <div className="right-column">
                        <LeaderboardCard />
                        <LocalBuyersCard />
                        <GoalsCard />
                        <CalendarCard />
                    </div>

                    <div className="card prakriti-speaks-card">
                        <h4>Prakriti Speaks</h4>
                        <p>"The true meaning of life is to plant trees, under whose shade you do not expect to sit."</p>
                        <p className="author">- Nelson Henderson</p>
                        <p>"The truest legacy of our time is to heal the earth's wounds, for a dawn that will glow upon faces we will never see."</p>
                        <p className="author">- Elara Vance</p>
                    </div>

                    <div className="card recent-orders-card">
                        <h4>Recent Orders</h4>
                        <table className="recent-orders-table">
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.name}</td>
                                        <td>{order.category}</td>
                                        <td>${order.amount}</td>
                                        <td>{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

const Sidebar = () => (
    <aside className="sidebar">
        <div className="sidebar-logo">
            <FaLeaf className="sidebar-logo-icon" style={{ color: '#4CAF50' }} />
            <h1 className="sidebar-logo-text">Prakriti</h1>
        </div>
        <div className="sidebar-menu-section">
            <h3 className="sidebar-menu-title">Menu</h3>
            <ul className="sidebar-menu-list">
                <li className="sidebar-menu-item active"><BsGrid3X3GapFill className="sidebar-menu-item-icon" /><span className="sidebar-menu-item-text">Dashboard</span></li>
                <li className="sidebar-menu-item"><BsPeople className="sidebar-menu-item-icon" /><span className="sidebar-menu-item-text">Tasks</span></li>
                <li className="sidebar-menu-item"><BsFillCalendar2WeekFill className="sidebar-menu-item-icon" /><span className="sidebar-menu-item-text">Calendar</span></li>
                <li className="sidebar-menu-item"><BsFillBarChartFill className="sidebar-menu-item-icon" /><span className="sidebar-menu-item-text">Analytics</span></li>
                <li className="sidebar-menu-item"><BsPersonCircle className="sidebar-menu-item-icon" /><span className="sidebar-menu-item-text">Team</span></li>
            </ul>
        </div>
        <div className="sidebar-menu-section">
            <h3 className="sidebar-menu-title">General</h3>
            <ul className="sidebar-menu-list">
                <li className="sidebar-menu-item"><BsGearFill className="sidebar-menu-item-icon" /><span className="sidebar-menu-item-text">Settings</span></li>
                <li className="sidebar-menu-item"><BsQuestionCircleFill className="sidebar-menu-item-icon" /><span className="sidebar-menu-item-text">Help</span></li>
                <li className="sidebar-menu-item"><BsBoxArrowRight className="sidebar-menu-item-icon" /><span className="sidebar-menu-item-text">Logout</span></li>
            </ul>
        </div>
    </aside>
);

const StatCard = ({ title, value, icon, data, type, color }) => {
    const gradientId = `color-${title.replace(/\s+/g, '')}`;
    return (
        <div className="card stat-card-special">
            <div className="stat-card-header">
                <div>
                    <h3>{title}</h3>
                    <p className="stat-card-value">{value}</p>
                </div>
                <div className="stat-card-icon">{icon}</div>
            </div>
            <div className="stat-card-chart">
                <ResponsiveContainer width="100%" height="100%">
                    {type === 'area' ? (
                        <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor={color} stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fillOpacity={1} fill={`url(#${gradientId})`} />
                        </AreaChart>
                    ) : (
                        <LineChart data={data} margin={{ top: 15, right: 5, left: 0, bottom: 0 }}>
                            <Line type="monotone" dataKey="pv" stroke={color} strokeWidth={3} dot={false}/>
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const generateRandomAvatar = (seed) => `https://i.pravatar.cc/150?u=${seed}`;

const LeaderboardCard = () => {
    const leaderboard = [
        { rank: '1st', name: 'Ananya Shah' },
        { rank: '2nd', name: 'Mike Gupta' },
        { rank: '3rd', name: 'Ayaan Verma' },
    ];
    return (
        <div className="card">
            <h4>Leaderboard</h4>
            {leaderboard.map((user, idx) => (
                <div className="leaderboard-item" key={user.rank}>
                    <span className="leaderboard-rank">{user.rank}</span>
                    <img src={generateRandomAvatar(user.name)} alt={user.name} style={{width: 28, height: 28, borderRadius: '50%', marginRight: 8, border: '2px solid #C8E6C9'}} />
                    {user.name}
                </div>
            ))}
        </div>
    );
};

const LocalBuyersCard = () => {
    const buyers = [1,2,3,4,5,6];
    return (
        <div className="card">
            <h4>Local Buyers</h4>
            <div className="local-buyers-grid">
                {buyers.map((b, idx) => (
                    <div className="local-buyer-item" key={idx}>
                        <img src={generateRandomAvatar('localbuyer'+idx)} alt="buyer" />
                    </div>
                ))}
            </div>
        </div>
    );
};

const GoalsCard = () => (
    <div className="card">
        <h4>Goals</h4>
        <ul className="goals-list">
            <li>Carbon Reduction: 60%</li>
            <li>EcoKarma: 70%</li>
            <li>Sustainable Orders: 100</li>
        </ul>
    </div>
);

const CalendarCard = () => (
    <div className="card">
        <h4>Calendar</h4>
        <div className="calendar-grid">
            <div className="calendar-day-name">Sun</div>
            <div className="calendar-day-name">Mon</div>
            <div className="calendar-day-name">Tue</div>
            <div className="calendar-day-name">Wed</div>
            <div className="calendar-day-name">Thu</div>
            <div className="calendar-day-name">Fri</div>
            <div className="calendar-day-name">Sat</div>
            {[22,23,24,25,26,27,28].map(day => (
                <div key={day} className={`calendar-day${day === 23 ? ' active' : ''}`}>{day}</div>
            ))}
        </div>
    </div>
);

export default Dashboard;
