import React, { useState } from 'react';
import api from '../api';

const SessionControls = () => {
    const [programName, setProgramName] = useState('');
    const [country, setCountry] = useState('');
    const [operator, setOperator] = useState('');

    const handleStart = async () => {
        try {
            await api.post(`/session/start/${programName+'_'+country+'_'+operator}`);
            alert(`${programName} started successfully`);
        } catch (error) {
            console.error('Error starting session:', error);
            alert('Failed to start session');
        }
    };

    const handleStop = async () => {
        try {
            await api.post(`/session/stop/${programName+'_'+country+'_'+operator}`);
            alert(`${programName} stopped successfully`);
        } catch (error) {
            console.error('Error stopping session:', error);
            alert('Failed to stop session');
        }
    };

    const handleRestart = async () => {
        try {
            await api.post(`/session/restart/${programName+'_'+country+'_'+operator}`);
            alert(`${programName} restarted successfully`);
        } catch (error) {
            console.error('Error restarting session:', error);
            alert('Failed to restart session');
        }
    };

    return (
        <div>
            <h3>Session Controls</h3>
            <input
                type="text"
                placeholder="Program Name"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                required
                style={{ marginRight: '10px' }}
            />

            <input
                type='text'
                placeholder='Country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                style={{ marginRight: '10px' }}
            />

            <input
                type='text'
                placeholder='Operator'
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                required
                style={{ marginRight: '10px' }}
            />

            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleRestart}>Restart</button>
            <br />
        </div>
    );
};

export default SessionControls;
