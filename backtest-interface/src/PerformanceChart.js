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
        <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance du Backtest</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="name" tick={{ fill: '#4A5568' }} />
                    <YAxis tick={{ fill: '#4A5568' }} />
                    <Tooltip
                        wrapperStyle={{ backgroundColor: '#fff', border: '1px solid #ddd' }}
                        contentStyle={{ border: 'none' }}
                    />
                    <Legend />
                    <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PerformanceChart;
