import axios from "axios";
import React, { useEffect, useState } from "react";
import './AnalyticalData.css';
import { MdDevices, MdOutlinePendingActions } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { GoComment } from "react-icons/go";
import { BsClipboard2Check } from "react-icons/bs";
import { AiOutlineFund } from "react-icons/ai";
import PerformanceGraph from "../Performance/Performance";

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
            <div className="div1">
                <div className="analytical-icons1">
                    <div className="icon-and-title"><MdDevices className="di1" /><h4>Total Equipments</h4></div>
                    <div className="real-number-data">{deviceCounter}</div>
                </div>
                <div className="analytical-icons2">
                    <div className="icon-and-title"><AiOutlineFund className="di1" /><h4>Spent Cost</h4></div>
                    <div className="dollar">
                        <div className="etb">ETB</div>
                        <div className="real-number-data">{costCounter}</div>
                    </div>
                </div>
                <div className="analytical-icons3">
                    <div className="icon-and-title"><GoComment className="di1" /><h4>Total Requests</h4></div>
                    <div className="real-number-data">{requestCounter}</div>
                </div>
                <div className="analytical-icons4">
                    <div className="icon-and-title"><BsClipboard2Check className="di1" /><h4>Accepted Requests</h4></div>
                    <div className="real-number-data">{requestAcceptedCounter}</div>
                </div>
                <div className="analytical-icons5">
                    <div className="icon-and-title"><MdOutlinePendingActions className="di1" /><h4>Pending Requests</h4></div>
                    <div className="real-number-data">{requestPendingCounter}</div>
                </div>
                <div className="analytical-icons6">
                    <div className="icon-and-title"><FaRegCalendarCheck className="di1" /><h4>Completed Requests</h4></div>
                    <div className="real-number-data">{requestCompletedCounter}</div>
                </div>
                
            </div>
            <div className="div2">
            <div className="analytical-icons7">
                    <div className="icon-and-title"><FaRegCalendarCheck className="di1" /><h4>Mean Time To Repair (hours)</h4></div>
                    <div className="real-number-data">{averageDuration ? averageDuration.toFixed(2) : 0}</div>
                </div>
                <div className="analytical-icons8">
                    <div className="icon-and-title"><FaRegCalendarCheck className="di1" /><h4>Average Downtime (hours)</h4></div>
                    <div className="real-number-data">{averageDowntime}</div>
                </div>
                <div className="analytical-icons9">
                    <div className="icon-and-title"><FaRegCalendarCheck className="di1" /><h4>Replacement Rate</h4></div>
                    <div className="real-number-data">{replacementRate}%</div>
                </div>
                <div className="analytical-icons10">
                    <div className="icon-and-title"><FaRegCalendarCheck className="di1" /><h4>Regulatory Compliance</h4></div>
                    <div className="real-number-data">{regulatoryCompliance}%</div>
                </div>
                
            </div>
        </div>
    );
};

export default AnalyticalData;
