import React, { useState, useRef, useEffect } from 'react';
import '../Css/Educationsection.css';
import { 
    FiHome, FiBarChart2, FiUsers, FiCalendar, FiZap, FiBell, FiSettings, FiEdit, 
    FiShoppingCart, FiMessageSquare, FiPaperclip, FiMic, FiSend, FiSun, FiMoon, 
    FiMenu, FiChevronDown, FiCopy, FiThumbsDown, FiRefreshCw, FiVolume2 
} from 'react-icons/fi';
import { HiOutlineSparkles } from "react-icons/hi";
import { CgComponents } from "react-icons/cg";
import { RiLeafLine } from "react-icons/ri";
import ReactMarkdown from 'react-markdown';

// Importing icons from a hypothetical icon library
// In a real project, you would use a library like 'react-icons'
// For example: import { FaHome, FaStore, FaWrench } from 'react-icons/fa';

const Icon = ({ name }) => <i className={`icon-${name}`}></i>;

const initialPrompts = [
    "What is a change we could implement globally to transition to a truly sustainable and green economy?",
    "How much CO2 is emitted to make a bag?",
    "Make a list of all green products in India",
    "What is EPM in the context of sustainability?",
];

function Educationsection() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [activeHistoryIndex, setActiveHistoryIndex] = useState(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const sendMessage = async (text) => {
        if (text.trim() === '') return;

        const userMessage = { author: 'You', text, timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);
        setActiveHistoryIndex(null); // Clear history selection

        try {
            const response = await fetch('http://localhost:8000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: text }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const aiResponse = { author: 'Prakriti', text: data.response, timestamp: new Date() };
            setMessages(prev => [...prev, aiResponse]);

        } catch (error) {
            console.error("Failed to fetch chat response:", error);
            const errorResponse = { 
                author: 'Prakriti', 
                text: "I'm having trouble connecting to my brain right now. Please check if the backend server is running and try again.", 
                timestamp: new Date() 
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    };
    
    const handleSendMessage = () => {
        sendMessage(inputValue);
        setInputValue('');
    };
    
    const handlePromptClick = (promptText) => {
        sendMessage(promptText);
    };
    
    const handleHistoryClick = (question, index) => {
        setActiveHistoryIndex(index);
        sendMessage(question);
    };

    const initialHistory = [ 
        "How much CO2 is emitted to make a bag", 
        "Make a list of all green products in India...", 
        "What is a change we could implement g...", 
        "What is EPM?",
        "Benefits of using renewable energy?",
        "How to reduce my carbon footprint at home?",
        "Impact of fast fashion on the environment?",
        "Explain the concept of a circular economy.",
        "Examples of sustainable packaging?",
        "How do electric vehicles help?",
        "What is greenwashing?",
        "The importance of biodiversity."
    ];

    return (
        <div className="prakriti-chat-layout">
            <div className="icon-sidebar">
                <div className="icon-sidebar-top">
                    <div className="logo-icon"><RiLeafLine /></div>
                    <div className="icon-sidebar-main-nav">
                        <FiHome />
                        <FiBarChart2 />
                        <FiUsers />
                        <FiCalendar />
                        <FiZap />
                        <FiBell />
                    </div>
                </div>
                <div className="icon-sidebar-bottom">
                    {/* Icons removed as per request */}
                </div>
            </div>

            <div className="content-sidebar">
                <div className="content-sidebar-header">
                    <h3>Prakriti AI</h3>
                    <FiEdit />
                </div>
                <nav className="content-sidebar-nav">
                    <a href="#"><CgComponents /> About Prakriti</a>
                    <a href="#"><FiShoppingCart /> Green Store</a>
                    <a href="#"><HiOutlineSparkles /> Custom Instructions</a>
                </nav>
                <div className="chat-history">
                    <div className="history-group">
                        <div className="history-group-header">
                            <span>Today</span>
                            <div className="total-badge">{initialHistory.length} Total <FiChevronDown /></div>
                        </div>
                        <ul>
                            {initialHistory.map((item, index) => (
                                <li key={index} className={activeHistoryIndex === index ? "active" : ""} onClick={() => handleHistoryClick(item, index)}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="chat-main">
                <div className="chat-main-header">
                    <span>Prakriti 1.3 <FiChevronDown /></span>
                    <div className="chat-main-header-icons">
                        <FiSun />
                        <FiMoon />
                        <FiMenu />
                        <FiSettings />
                        <img src="https://picsum.photos/seed/user_avatar/32/32" alt="User" className="user-avatar-icon"/>
                    </div>
                </div>

                <div className="chat-messages-container" ref={chatContainerRef}>
                    {messages.length === 0 && !isTyping && (
                         <div className="empty-chat-container">
                            <div className="logo-icon-large"><RiLeafLine /></div>
                            <h2>How can I help you today?</h2>
                            <div className="prompt-suggestions">
                                {initialPrompts.map((prompt, index) => (
                                    <button key={index} onClick={() => handlePromptClick(prompt)} className="prompt-chip">
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map((msg, index) => (
                        <div key={index} className={`message-wrapper ${msg.author === 'You' ? 'user' : 'ai'}`}>
                            {msg.author === 'You' ? (
                                <img src="https://picsum.photos/seed/user_avatar/32/32" alt={msg.author} className="message-avatar"/>
                            ) : (
                                <div className="message-avatar prakriti-avatar">
                                    <RiLeafLine />
                                </div>
                            )}
                            <div className="message-content">
                                <p className="message-author">
                                    {msg.author}
                                    <span className="message-timestamp">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </p>
                                <div className="message-bubble">
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                </div>
                                {msg.author === 'Prakriti' && (
                                    <div className="message-toolbar">
                                        <FiCopy />
                                        <FiThumbsDown />
                                        <FiRefreshCw />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="message-wrapper ai">
                            <div className="message-avatar prakriti-avatar">
                                <RiLeafLine />
                            </div>
                            <div className="message-content">
                                <p className="message-author">Prakriti</p>
                                <div className="message-bubble typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="chat-input-area">
                    <div className="chat-input-wrapper">
                        <FiPaperclip className="input-icon" />
                        <input 
                            type="text" 
                            placeholder="Ask about carbon footprints, green products, and more..." 
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                        />
                        <FiMic className="input-icon" />
                        <button className="send-btn" onClick={handleSendMessage}><FiSend /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Educationsection;
