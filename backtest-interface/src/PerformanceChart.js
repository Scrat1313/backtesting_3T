// src/PerformanceChart.js

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const PerformanceChart = ({ winrate, totalTrades, winningTrades }) => {
    const data = [
        { name: 'Total Trades', value: totalTrades },
        { name: 'Winning Trades', value: winningTrades },
        { name: 'Win Rate (%)', value: winrate },
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default PerformanceChart;
