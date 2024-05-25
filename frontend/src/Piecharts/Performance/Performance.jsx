import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Performance.css'; // Import the CSS file

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
            const date = new Date(payload[0].payload.time.split('-')[0], payload[0].payload.time.split('-')[1] - 1);
            return (
                <div className="custom-tooltip">
                    <p className="label">{`Time : ${date.toLocaleDateString('default', { month: 'long', year: 'numeric' })}`}</p>
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
            <p className='performace-graph'>Performance Monitoring</p>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={performanceData}
                    margin={{
                        top: 20, right: 10, left: 10, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="time" tickFormatter={formatXAxis} tick={{ fontSize: 12, fontFamily: 'Arial, sans-serif', fill: '#333' }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12, fontFamily: 'Arial, sans-serif', fill: '#333' }} />
                    <Tooltip content={renderTooltipContent} wrapperStyle={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }} />
                    <Legend />
                    <Line type="monotone" dataKey="performance" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PerformanceGraph;
