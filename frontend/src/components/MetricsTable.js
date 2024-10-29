// src/components/MetricsTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const MetricsTable = ({ metrics }) => (
    <TableContainer component={Paper}>
        <Table aria-label="metrics table">
            <TableHead>
                <TableRow>
                    <TableCell>Country</TableCell>
                    <TableCell>Operator</TableCell>
                    <TableCell align="right">SMS Sent</TableCell>
                    <TableCell align="right">Success Rate (%)</TableCell>
                    <TableCell align="right">Failure Count</TableCell>
                    <TableCell>Timestamp</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {metrics.map((metric) => (
                    <TableRow key={metric.id}>
                        <TableCell>{metric.country}</TableCell>
                        <TableCell>{metric.operator}</TableCell>
                        <TableCell align="right">{metric.sms_sent}</TableCell>
                        <TableCell align="right">{metric.success_rate}</TableCell>
                        <TableCell align="right">{metric.failure_count}</TableCell>
                        <TableCell>{new Date(metric.timestamp).toLocaleString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default MetricsTable;
