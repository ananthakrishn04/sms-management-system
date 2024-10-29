import React, { useEffect, useState } from 'react';
import MetricsTable from './MetricsTable';
import SMSChart from './SMSchart';
import SendSMS from './StoreCountryOperator';
import api from '../api';
import SessionControls from './sessionControls';

const Dashboard = () => {
    const [metrics, setMetrics] = useState([]);

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
        <div>
            <h2> User Dashboard</h2>
            <SessionControls />
            {/* <SMSChart metrics={metrics} />
            <br></br>
            <MetricsTable metrics={metrics} /> */}
        </div>
    );
};

export default Dashboard;
