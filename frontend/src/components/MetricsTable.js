// // src/components/MetricsTable.js
// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// const MetricsTable = ({ metrics }) => (
//     <TableContainer component={Paper}>
//         <Table aria-label="metrics table">
//             <TableHead>
//                 <TableRow>
//                     <TableCell>Country</TableCell>
//                     <TableCell>Operator</TableCell>
//                     <TableCell align="right">SMS Sent</TableCell>
//                     <TableCell align="right">Success Rate (%)</TableCell>
//                     <TableCell align="right">Failure Count</TableCell>
//                     <TableCell>Timestamp</TableCell>
//                 </TableRow>
//             </TableHead>
//             <TableBody>
//                 {metrics.map((metric) => (
//                     <TableRow key={metric.id}>
//                         <TableCell>{metric.country}</TableCell>
//                         <TableCell>{metric.operator}</TableCell>
//                         <TableCell align="right">{metric.sms_sent}</TableCell>
//                         <TableCell align="right">{metric.success_rate}</TableCell>
//                         <TableCell align="right">{metric.failure_count}</TableCell>
//                         <TableCell>{new Date(metric.timestamp).toLocaleString()}</TableCell>
//                     </TableRow>
//                 ))}
//             </TableBody>
//         </Table>
//     </TableContainer>
// );

// export default MetricsTable;
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';

// Define the column structure for the metrics table
const columns = [
    { label: 'Country', dataKey: 'country', width: 150 },
    { label: 'Operator', dataKey: 'operator', width: 150 },
    { label: 'SMS Sent', dataKey: 'sms_sent', width: 100, numeric: true },
    { label: 'Success Rate (%)', dataKey: 'success_rate', width: 150, numeric: true },
    { label: 'Failure Count', dataKey: 'failure_count', width: 150, numeric: true },
    { label: 'Timestamp', dataKey: 'timestamp', width: 200 },
];

// Define the table components for the virtualized table
const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead: React.forwardRef((props, ref) => (
        <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: React.forwardRef((props, ref) => (
        <TableBody {...props} ref={ref} />
    )),
};

// Function to render the header content
function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric ? 'right' : 'left'}
                    style={{ width: column.width }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

// Function to render each row’s content
function rowContent(_index, row) {
    return (
        <>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    align={column.numeric ? 'right' : 'left'}
                >
                    {column.dataKey === 'timestamp'
                        ? new Date(row[column.dataKey]).toLocaleString()
                        : row[column.dataKey]}
                </TableCell>
            ))}
        </>
    );
}

// Main component to render the virtualized metrics table
export default function ReactVirtualizedMetricsTable({ metrics }) {
    return (
        <Paper style={{ height: 400, width: '100%' }}>
            <TableVirtuoso
                data={metrics}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
            />
        </Paper>
    );
}

