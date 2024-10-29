// src/components/Metrics.js
import React from 'react';

const Metrics = ({ metrics }) => (
    <div>
        <h3>SMS Metrics</h3>
        <ul>
            {metrics.map((metric) => (
                <li key={metric.id}>
                    <strong>Country:</strong> {metric.country} <br />
                    <strong>Operator:</strong> {metric.operator} <br />
                    <strong>SMS Sent:</strong> {metric.sms_sent} <br />
                    <strong>Success Rate:</strong> {metric.success_rate}% <br />
                    <strong>Failure Count:</strong> {metric.failure_count} <br />
                    <strong>Timestamp:</strong> {new Date(metric.timestamp).toLocaleString()}
                    <hr />
                </li>
            ))}
        </ul>
    </div>
);

export default Metrics;
