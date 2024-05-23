import axios from "axios";
import React, { useEffect, useState } from "react";
import './AnalyticalData.css';
import { MdDevices } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { GoComment } from "react-icons/go";
import { BsClipboard2Check } from "react-icons/bs";
import { AiOutlineFund } from "react-icons/ai";

const AnalyticalData = () => {
    const [devicecounter, setDeviceCounter] = useState(null);
    const [Requestcounter, setRequestcounter] = useState(null);
    const [RequestAcceptedcounter, setRequestAcceptedcounter] = useState(null);
    const [RequestPendingcounter, setRequestPendingcounter] = useState(null);
    const [RequestCompletedcounter, setRequestCompletedcounter] = useState(null);
    const [Costcounter, setCostcounter] = useState(null);
    const [averageDuration, setAverageDuration] = useState(0);

    useEffect(()=>{
        FetchTotalNumberOfEquipments();
        FetchTotalNumberOfRequests();
        FetchTotalNumberOfCost();
        FetchAverageDurationInHours();
    }, [devicecounter, RequestAcceptedcounter,
        RequestPendingcounter, RequestCompletedcounter,
        Costcounter])

    const FetchTotalNumberOfEquipments= async()=>{
        try{
            const response = await axios.get('http://localhost:7000/api/deviceRegistration');
            setDeviceCounter(response.data.length);
        }catch(error){
            console.error('the error message', error);
        }
    }

    const FetchTotalNumberOfCost= async()=>{
        try{
            const response = await axios.get('http://localhost:7000/api/reportOptions');
            let cost = 0;
            response.data.forEach(item => {
                cost = item.replacementCostInETB + cost;
            });
            setCostcounter(cost);
        }catch(error){
            console.error('the error message', error);
        }
    }

    const FetchTotalNumberOfRequests= async()=>{
        try{
            const response = await axios.get('http://localhost:7000/api/requestOptions');
            setRequestcounter(response.data.length);

            let acceptedCount = 0;
            let pendingCount = 0;
            let completedCount = 0;

            // Group data by status
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

            // Update state with counts
            setRequestAcceptedcounter(acceptedCount);
            setRequestPendingcounter(pendingCount);
            setRequestCompletedcounter(completedCount);
        }catch(error){
            console.error('the error message', error);
        }
    }

    const FetchAverageDurationInHours = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/reportOptions');
            const durations = response.data
                .map(item => item.durationInHours)
                .filter(duration => duration != null); // Ensure null/undefined durations are ignored

            const totalDuration = durations.reduce((acc, duration) => acc + duration, 0);
            const averageDuration = durations.length ? totalDuration / durations.length : 0;

            setAverageDuration(averageDuration);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    return ( 
        <div className="main-analysis-s">
            <div className="div1">
                <div className="analytical-icons1">
                    <div className="icon-and-title">
                        <MdDevices className="di1"/>
                        <h4>Total Equipments </h4>
                    </div>
                    <div className="real-number-data">{devicecounter}</div>
                </div>
                <div className="analytical-icons2">
                    <div className="icon-and-title">
                        <AiOutlineFund className="di1"/>
                        <h4>Spent Cost </h4>
                    </div>
                    <div className="dollar">
                        <div className="etb">ETB</div>
                        <div className="real-number-data">{Costcounter}</div>
                    </div>
                </div>
                <div className="analytical-icons3">
                    <div className="icon-and-title">
                        <GoComment className="di1"/>
                        <h4>Total Requests </h4>
                    </div>
                    <div className="real-number-data">{Requestcounter}</div>
                </div>
                <div className="analytical-icons">
                    <div className="icon-and-title">
                        <FaRegCalendarCheck className="di1"/>
                        <h4>Average Duration </h4>
                    </div>
                    <div className="real-number-data">{averageDuration.toFixed(2)} hours</div>
                </div>
            </div>
            <div className="div2">
                <div className="analytical-icons4">
                    <div className="icon-and-title">
                        <BsClipboard2Check className="di1"/>
                        <h4>Accepted Requests </h4>
                    </div>
                    <div className="real-number-data">{RequestAcceptedcounter}</div>
                </div>
                <div className="analytical-icons5">
                    <div className="icon-and-title">
                        <MdOutlinePendingActions className="di1"/>
                        <h4>Pending Requests </h4>
                    </div>
                    <div className="real-number-data">{RequestPendingcounter}</div>
                </div>
                <div className="analytical-icons6">
                    <div className="icon-and-title">
                        <FaRegCalendarCheck className="di1"/>
                        <h4>Completed Requests </h4>
                    </div>
                    <div className="real-number-data">{RequestCompletedcounter}</div>
                </div>
            </div>
        </div>
    );
}

export default AnalyticalData;
