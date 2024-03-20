import axios from "axios";
import React, { useEffect, useState } from "react";
import './AnalyticalData.css';
import { MdDevices } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { BiSolidSave } from "react-icons/bi";




const AnalyticalData = () => {

    const [devicecounter, setDeviceCounter] = useState(null);
    const [Requestcounter, setRequestcounter] = useState(null);
    const [RequestAcceptedcounter, setRequestAcceptedcounter] = useState(null);
    const [RequestPendingcounter, setRequestPendingcounter] = useState(null);
    const [RequestCompletedcounter, setRequestCompletedcounter] = useState(null);
    const [Costcounter, setCostcounter] = useState(null);


    useEffect(()=>{
        FetchTotalNumberOfEquipments();
        FetchTotalNumberOfRequests();
        FetchTotalNumberOfCost();
    }, [devicecounter, RequestAcceptedcounter,
        RequestPendingcounter, RequestCompletedcounter,
        Costcounter])

   const FetchTotalNumberOfEquipments= async()=>{
    try{
        const response = await axios.get('http://localhost:7000/api/deviceRegistration');
        console.log('the analytical data', response.data.length);
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
            }
        );
        setCostcounter(cost) ;

    }catch(error){
        console.error('the error message', error);
    }
   }


   const FetchTotalNumberOfRequests= async()=>{
    try{
        const response = await axios.get('http://localhost:7000/api/requestOptions');
        console.log('the analytical data', response.data.length);
        setRequestcounter(response.data.length);
        console.log('main', response.data)


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
    return ( 
        <div className="main-analysis">
            <div className="individual-data"><MdDevices className="analytical-icons1"/>{devicecounter}<h4>Total Devices </h4></div>
            <div  className="individual-data"><FaSackDollar className="analytical-icons2"/>{Costcounter}<h4>Spent Cost </h4></div>
            <div  className="individual-data"><BsFillChatSquareQuoteFill className="analytical-icons3"/>{Requestcounter}<h4>Total Requests </h4></div>
            <div  className="individual-data"><BiSolidSave className="analytical-icons4"/>{RequestAcceptedcounter}<h4>Accepted Requests </h4></div>
            <div  className="individual-data"><MdOutlinePendingActions className="analytical-icons5"/>{RequestPendingcounter}<h4>Pending Requests </h4></div>
            <div  className="individual-data"><FaRegCalendarCheck className="analytical-icons6"/>{RequestCompletedcounter}<h4>Completed Requests </h4></div>
        </div>
     );
}
 
export default AnalyticalData;