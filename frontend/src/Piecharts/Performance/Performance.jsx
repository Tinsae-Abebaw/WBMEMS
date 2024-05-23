import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PerformanceGraph = () => {
    const [performanceData, setPerformanceData] = useState([]);

    useEffect(() => {
        fetchPerformanceData();
    }, []);

    const fetchPerformanceData = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/reportOptions/performanceData');
            setPerformanceData(response.data);
        } catch (error) {
            console.error('Error fetching performance data:', error);
        }
    };

    const renderTooltipContent = (props) => {
        const { payload } = props;
        if (payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`Time : ${payload[0].payload.time}`}</p>
                    <p className="label">{`Performance : ${payload[0].value.toFixed(2)}%`}</p>
                </div>
            );
        }

        return null;
    };

    const formatXAxis = (tickItem) => {
        const [year, month] = tickItem.split('-');
        return new Date(year, month - 1).toLocaleString('default', { month: 'long' }); // Display month name
    };

    return (
        <div className="performance-graph">
            <h3>Performance Over Time</h3>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={performanceData}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tickFormatter={formatXAxis} />
                    <YAxis />
                    <Tooltip content={renderTooltipContent} />
                    <Legend />
                    <Line type="monotone" dataKey="performance" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PerformanceGraph;
