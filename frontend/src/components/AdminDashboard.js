// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import MetricsTable from './MetricsTable';
import SMSChart from './SMSchart';
import StoreCountryOperator from './StoreCountryOperator';
import api from '../api';
import { Button, Input } from '@mui/material';
import SessionControls from './sessionControls';

const AdminDashboard = () => {

    const [metrics, setMetrics] = useState([]);

    const [newUser, setNewUser] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newRole, setNewRole] = useState('');

    const handleAddUser = async () => {
        const userData = {
            newUser,
            newPassword,
            newRole
        };

        try {
            const response = await api.post('/add_user', userData);
            alert(response.data.msg || 'User added successfully');
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add user');
        }
    }

    const fetchMetrics = async () => {
        try {
            const response = await api.get('/metrics');
            setMetrics(response.data.data); 
        } catch (error) {
            console.error('Error fetching metrics:', error);
        }
    };
                                                                            
    useEffect(() => {

        fetchMetrics();

        const interval = setInterval(() => {
            fetchMetrics();
        }, 5000);

        return () => clearInterval(interval);
    }, []);



    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4 align-middle">Admin Dashboard</h2>
            
            {/* Admin-specific components */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">User Management</h3>
                <Input placeholder="Add new user" onChange={(e) => setNewUser(e.target.value)}/><br />
                <Input placeholder='Add password' onChange={(e) => setNewPassword(e.target.value)}/><br />
                <Input placeholder='Add role' onChange={(e) => setNewRole(e.target.value)}/><br /><br />

                <Button variant="outlined" color = "info" onClick={handleAddUser}>Add User</Button>

            </section>

            <SessionControls />

            <section className="mb-6">
                <SMSChart metrics={metrics} />
                <MetricsTable metrics={metrics} />
            </section>

            <section className="mb-6">
                <StoreCountryOperator />
            </section>
        </div>


    );
};

export default AdminDashboard;
