import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SMSChart = ({ metrics }) => {
    const labels = metrics.map(metric => new Date(metric.timestamp).toLocaleString());
    const smsSentData = metrics.map(metric => metric.sms_sent);
    const successRateData = metrics.map(metric => parseFloat(metric.success_rate));

    const data = {
        labels,
        datasets: [
            {
                label: 'SMS Sent',
                data: smsSentData,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                yAxisID: 'y1',
            },
            {
                label: 'Success Rate (%)',
                data: successRateData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                yAxisID: 'y2',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y1: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'SMS Sent',
                },
            },
            y2: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Success Rate (%)',
                },
                ticks: {
                    max: 100,
                    min: 0,
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ width: Math.max(metrics.length * 100, 500), height: 400 }}>
                {/* <h3>SMS Metrics Over Time</h3> */}
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default SMSChart;

