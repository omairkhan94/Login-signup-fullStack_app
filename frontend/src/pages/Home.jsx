import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { FaBars, FaUser, FaHome, FaFileAlt, FaInfoCircle, FaCog } from 'react-icons/fa';
import BarChart from '../pages/Chart.jsx';
import './Home.css';
import AllUsers from './AllUsers.jsx';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Token not found. Please log in again.");
            }

            const url = "http://localhost:8070/Auth/products";
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const response = await fetch(url, { headers });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            setProducts(result);
        } catch (err) {
            handleError(err.message || 'Failed to fetch products');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`dashboard ${isSidebarOpen ? '' : 'collapsed'}`}>
            <aside className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
                <button className="collapse-button" onClick={toggleSidebar}>
                    <FaBars />
                </button>
                <h2>Dashboard</h2>
                <ul className="icon-list">
                    <li><FaHome /> Home</li>
                    <li><FaUser /> Profile</li>
                    <li><FaFileAlt /> Reports</li>
                    <li><FaInfoCircle /> UserInfo</li>
                    <li><FaCog /> Settings</li>
                </ul>
            </aside>

            <div className="main-content">
                <div className="welcome-card">
                    <div className="user-info">
                        <FaUser className="user-icon" />
                        <div>
                            <h1>{loggedInUser}</h1>
                            <p>{loggedInUser && `${loggedInUser}@gmail.com`}</p>
                        </div>
                    </div>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                {/* New Welcome Message Card */}
                <div className="welcome-message-card">
                    <h2>Welcome to Your Dashboard, {loggedInUser}!</h2>
                    <p>We are glad to have you back. Here, you can manage your profile, view reports, and keep track of your tasks. Let’s make today productive!</p>
                </div>

                <div className="barchart-container">
                    <BarChart className="barchart" />
                  
                </div>
               <AllUsers/>
              

                <div className="product-list">
                    {products && products.map((item, index) => (
                        <div key={index} className="product-card">
                            <h3>{item.name}</h3>
                            <p>Price: {item.price}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* <ToastContainer /> */}
        </div>
    );
}

export default Home;