import React, { useEffect, useState } from 'react';
import { FaUser, FaUserTie, FaUserAlt, FaUserNinja, FaUserSecret } from 'react-icons/fa';
import './AllUsers.css';

function AllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8070/allusers');
                const result = await response.json();

                if (response.ok) {
                    setUsers(result);
                } else {
                    console.error('Failed to fetch users:', result.message);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const icons = [FaUser, FaUserTie, FaUserAlt, FaUserNinja, FaUserSecret];

    return (
        <div className='container'>
            <h1>All Users</h1>
            <div className="user-grid">
                {users.map((user, index) => {
                    const IconComponent = icons[index % icons.length]; // Cycle through icons
                    return (
                        <div key={user._id} className="user-card">
                            <IconComponent className="user-icon" />
                            <p>{user.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AllUsers;