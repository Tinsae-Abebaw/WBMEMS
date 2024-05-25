import axios from "axios";
import React, { useEffect, useState } from "react";
import './AnalyticalData.css';
import { MdDevices, MdOutlinePendingActions } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { CiWavePulse1 } from "react-icons/ci";
import PerformanceGraph from "../Performance/Performance";
import { CiTimer } from "react-icons/ci";
import { MdOutlineTimerOff } from "react-icons/md";
import { SlCheck } from "react-icons/sl";



const AnalyticalData = () => {
    const [deviceCounter, setDeviceCounter] = useState(null);
    const [requestCounter, setRequestCounter] = useState(null);
    const [requestAcceptedCounter, setRequestAcceptedCounter] = useState(null);
    const [requestPendingCounter, setRequestPendingCounter] = useState(null);
    const [requestCompletedCounter, setRequestCompletedCounter] = useState(null);
    const [costCounter, setCostCounter] = useState(null);
    const [averageDuration, setAverageDuration] = useState(null);
    const [averageDowntime, setAverageDowntime] = useState(null);
    const [replacementRate, setReplacementRate] = useState(null);
    const [regulatoryCompliance, setRegulatoryCompliance] = useState(null);

    useEffect(() => {
        FetchTotalNumberOfEquipments();
        FetchTotalNumberOfRequests();
        FetchTotalNumberOfCost();
        FetchAverageDuration();
        FetchAverageDowntime();
        FetchReplacementRate();
        FetchRegulatoryCompliance();
    }, []);

    const FetchTotalNumberOfEquipments = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/deviceRegistration');
            setDeviceCounter(response.data.length);
        } catch (error) {
            console.error('Error fetching total number of equipments:', error);
        }
    };

    const FetchTotalNumberOfCost = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/reportOptions');
            let cost = 0;
            response.data.forEach(item => {
                cost += item.replacementCostInETB;
            });
            setCostCounter(cost);
        } catch (error) {
            console.error('Error fetching total cost:', error);
        }
    };

    const FetchTotalNumberOfRequests = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/requestOptions');
            setRequestCounter(response.data.length);

            let acceptedCount = 0;
            let pendingCount = 0;
            let completedCount = 0;

            response.data.forEach(item => {
                switch (item.status) {
                    case 'Accepted':
                        acceptedCount++;
                        break;
                    case 'Pending':
                        pendingCount++;
                        break;
                    case 'Completed':
                    case 'Arranged':
                    case 'Purchased':
                        completedCount++;
                        break;
                    default:
                        break;
                }
            });

            setRequestAcceptedCounter(acceptedCount);
            setRequestPendingCounter(pendingCount);
            setRequestCompletedCounter(completedCount);
        } catch (error) {
            console.error('Error fetching total number of requests:', error);
        }
    };

    const FetchAverageDuration = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/reportOptions');
            const durations = response.data
                .map(item => item.durationInHours)
                .filter(duration => duration != null); // Ensure null/undefined durations are ignored

            const totalDuration = durations.reduce((acc, duration) => acc + duration, 0);
            const averageDuration = durations.length ? totalDuration / durations.length : 0;

            setAverageDuration(averageDuration);
        } catch (error) {
            console.error('Error fetching average duration:', error);
        }
    };

    const FetchAverageDowntime = async () => {
        try {
            const requestsResponse = await axios.get('http://localhost:7000/api/requestOptions');
            const reportsResponse = await axios.get('http://localhost:7000/api/reportOptions');

            const requests = requestsResponse.data;
            const reports = reportsResponse.data;

            let totalDowntime = 0;
            let count = 0;

            requests.forEach(request => {
                const report = reports.find(report => report.id === request.id);
                if (report && request.requestDate && report.reportDate) {
                    const requestDate = new Date(request.requestDate);
                    const reportDate = new Date(report.reportDate);
                    const downtime = (reportDate - requestDate) / (1000 * 60 * 60); // Convert milliseconds to hours
                    totalDowntime += downtime;
                    count++;
                }
            });

            const averageDowntime = count > 0 ? (totalDowntime / count).toFixed(2) : 0;
            setAverageDowntime(averageDowntime);
        } catch (error) {
            console.error('Error fetching average downtime:', error);
        }
    };

    const FetchReplacementRate = async () => {
        try {
            const activeResponse = await axios.get('http://localhost:7000/api/deviceRegistration');
            const disposedResponse = await axios.get('http://localhost:7000/api/deviceRegistration/disposed');

            const activeDevices = activeResponse.data.length;
            const disposedDevices = disposedResponse.data.length;

            const replacementRate = (disposedDevices / (activeDevices + disposedDevices)) * 100;
            setReplacementRate(replacementRate.toFixed(2));
        } catch (error) {
            console.error('Error fetching replacement rate:', error);
        }
    };

    const FetchRegulatoryCompliance = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/reportOptions');
            const totalReports = response.data.length;
            const compliantReports = response.data.filter(report => report.complianceWithGuidelines === true).length;
            const complianceRate = ((compliantReports / totalReports) * 100).toFixed(2);
            setRegulatoryCompliance(complianceRate);
        } catch (error) {
            console.error('Error fetching regulatory compliance:', error);
        }
    };

    

    return (
        <div className="main-analysis-s">
            <div className="div2">
            <div className="analytical-icons7">
                    <div className="icon-and-titlee"><CiTimer className="di1" />Mean Time To Repair</div>
                    <div className="real-number-data">{averageDuration ? averageDuration.toFixed(2) : 0} <span className="hour-class">Hours</span> </div>
                </div>
                <div className="analytical-icons8">
                    <div className="icon-and-titlee"><MdOutlineTimerOff  className="di1" />Average Downtime</div>
                    <div className="real-number-data">{averageDowntime} <span className="hour-class">Hours</span></div>
                </div>
                <div className="analytical-icons9">
                    <div className="icon-and-titlee"><CiWavePulse1 className="di1" />Replacement Rate</div>
                    <div className="real-number-data">{replacementRate}%</div>
                </div>
                <div className="analytical-icons10">
                    <div className="icon-and-titlee"><SlCheck  className="di1" />Regulatory Compliance</div>
                    <div className="real-number-data">{regulatoryCompliance}% </div>
                </div>
        
            </div>
            <div className="div3">
             <PerformanceGraph/>
            </div>
           
            
        </div>
    );
};

export default AnalyticalData;
