import React, { useState } from 'react';
import api from '../api';

const storeCountryOperator = () => {
    const [country, setCountry] = useState('');
    const [operator, setOperator] = useState('');
    const [priority, setPriority] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const smsData = {
            country,
            operator,
            priority
        };

        try {
            const response = await api.post('/country_operator', smsData);
            alert(response.data.msg || 'Country-operator pair logged successfully');
        } catch (error) {
            console.error('Error sending info', error);
            alert('Failed to log country-operator pair');
        }
    };

    return (
        <div>
            <h3>Store Country and Operator</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Country:
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Operator:
                    <input
                        type="text"
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Priority:
                    <input
                        type="radio"
                        value="high_priority"
                        name="priority"
                        onChange={(e) => setPriority(e.target.value)}
                        required
                    />
                    High
                    <input
                        type="radio"
                        value="low_priority"
                        name="priority"
                        onChange={(e) => setPriority(e.target.value)}
                        required
                    />
                    Low
                </label>
                <br />
                <button type="submit">Send SMS Metrics</button>
            </form>
        </div>
    );
};

export default storeCountryOperator;
