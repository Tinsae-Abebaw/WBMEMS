import axios from "axios";
import React, { useEffect, useState } from "react";
import './RequestForEngineer.css';
import EngineerSidebar from "../EngineerSidebar";






const RequestForEngineer = () => {
    const [RequestType, setRequestType] = useState('');
    const [handleRequest, setHandlerequest] = useState([]);
    const [idHolder, setIdHolder] = useState(false);
    const [user, setUser] = useState(() => {
        // Retrieve user data from local storage on component mount
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : null;
      });
    const [detailed, setDetailed] = useState(null);
    const [reportDetail,setReportDetail]=useState(null);
    const [displayMaintenance, setDisplayMaintenance] = useState(false);
    const [displayCalibration, setDisplayCalibration] = useState(false);
    const [displaySpecification, setDisplaySpecification] = useState(false);
    const [displayInstallation, setDisplayInstallation] = useState(false);
    const [maintenanceFormData, setMaintenanceFormData] = useState({
        id:'',
        equipmentName:'',
        equipmentType:'',
        department:'',
        Model:'',
        serialNumber: '',
        manufacturer: '',
        reportType:'',
        requestedBy:'',
        location: '',
        maintenanceDescription: '',
        tasksPerformed: '',
        repair: false,
        natureOfBreakage: '',
        replacement: false,
        replacementCost: '',
        replacedSparePart: '',
        complianceWithGuidelines: false,
        verifyFunctionality: false,
        durationInHours:0,
        majorComplaint: '',
        recommendation: '',
        doneBy:'',
        reportDate:'',
      });

      const [calibrationFormData, setCalibrationFormData] = useState({
        id:'',
        equipmentName:'',
        equipmentType:'',
        department:'',
        Model:'',
        manufacturer: '',
        serialNumber: '',
        reportType:'',
        requestedBy:'',
        location: '',
        visualInspection: false,
        visibleDamageBefore: false,
        partsReplacedOrRepaired: '',
        replacementCost: 0,
        environmentalConditions: false,
        referenceStandards: '',
        proceduresDescription: '',
        complianceWithGuidelines: false,
        adjustmentsMade: false,
        adjustments: '',
        deviationFromStandard: '',
        correctiveAction: '',
        calibrationResultsSummary: '',
        verifyFunctionality: false,
        durationInHours: 0,
        recommendation: '',
        doneBy:'',
        reportDate:'',
      });

      const [specificationFormData, setSpecificationFormData] = useState({
        id:'',
        equipmentName:'',
        equipmentType:'',
        department:'',
        Model:'',
        serialNumber: '',
        manufacturer: '',
        reportType:'',
        requestedBy:'',
        purpose: '',
        specificationDetail:'',
        durationInHours:0,
        majorComplaint: '',
        recommendation: '',
        doneBy:'',
        reportDate:'',
      
      });

      const [installationFormData, setInstallationFormData] = useState({
        id:'',
        equipmentName:'',
        equipmentType:'',
        department:'',
        Model:'',
        serialNumber: '',
        manufacturer: '',
        reportType:'',
        requestedBy:'',
        location: '',
        visualInspection: false,
        visibleDamageBefore: false,
        partsReplacedOrRepaired: '',
        replacementCost: 0,
        accessoriesPresent: false,
        modificationsDuringInstallation: false,
        adjustmentsMade: '',
        complianceWithGuidelines: false,
        challengesOrIssuesEncountered: false,
        issuesAddressed: '',
        verifyFunctionality: false,
        safetyStandardsCompliance: false,
        durationInHours: 0,
        recommendation: '',
        doneBy:'',
        reportDate:'',
      });
    

      const handleDisplayForm = (id) => {
        //handleAction(id);
        const today = new Date();
      const formattedDate = today.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        
      });
    
        // Find the request by id in the request list
        const selectedRequest = handleRequest.find((request) => request.id === id);
    
        // If the request type is "maintenance," update the form data
        if (selectedRequest && selectedRequest.requestType === 'maintenance') {
          setDisplayMaintenance(true);  
          setMaintenanceFormData((prevData) => ({
            ...prevData,
            id: selectedRequest.id,
            equipmentName: selectedRequest.equipmentName,
            equipmentType: selectedRequest.equipmentType,
            department: selectedRequest.department,
            Model: selectedRequest.Model,
            requestedBy:selectedRequest.requestedBy,
            reportType:selectedRequest.requestType,
            doneBy:`${user.name} ${user.lastName}`,
            reportDate:formattedDate,
          }));
          
          
        }
        else if(selectedRequest && selectedRequest.requestType === 'calibration') {
            setDisplayCalibration(true);  
            setCalibrationFormData((prevData) => ({
              ...prevData,
              id: selectedRequest.id,
              equipmentName: selectedRequest.equipmentName,
              equipmentType: selectedRequest.equipmentType,
              department: selectedRequest.department,
              Model: selectedRequest.Model,
              requestedBy:selectedRequest.requestedBy,
              reportType:selectedRequest.requestType,
              doneBy:`${user.name} ${user.lastName}`,
              reportDate:formattedDate,
            }));
            console.log({displayCalibration});

        }
        else if(selectedRequest && selectedRequest.requestType === 'specification') {
            setDisplaySpecification(true);  
            setSpecificationFormData((prevData) => ({
              ...prevData,
              id: selectedRequest.id,
              equipmentName: selectedRequest.equipmentName,
              equipmentType: selectedRequest.equipmentType,
              department: selectedRequest.department,
              Model: selectedRequest.Model,
              requestedBy:selectedRequest.requestedBy,
              reportType:selectedRequest.requestType,
              doneBy:`${user.name} ${user.lastName}`,
              reportDate:formattedDate,
            }));


        }

        else if(selectedRequest && selectedRequest.requestType === 'installation') {
          setDisplayInstallation(true);  
          setInstallationFormData((prevData) => ({
            ...prevData,
            id: selectedRequest.id,
            equipmentName: selectedRequest.equipmentName,
            equipmentType: selectedRequest.equipmentType,
            department: selectedRequest.department,
            Model: selectedRequest.Model,
            requestedBy:selectedRequest.requestedBy,
            reportType:selectedRequest.requestType,
            doneBy:`${user.name} ${user.lastName}`,
            reportDate:formattedDate,
          }));

      }
      };




      const maintenanceHandleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setMaintenanceFormData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };

      const calibrationHandleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCalibrationFormData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };
    

      const specificationHandleChange = (e) => {
        const { name, value } = e.target;
        setSpecificationFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      
      const installationHandleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInstallationFormData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };
    
      const handleFormSubmitMaintenance = async () => {
        // Perform form validation
        if (!maintenanceFormData.serialNumber ||
           !maintenanceFormData.manufacturer ||
           !maintenanceFormData.location || 
           !maintenanceFormData.maintenanceDescription || 
           !maintenanceFormData.tasksPerformed || 
           !maintenanceFormData.durationInHours
           ) {
          // Display an error message or handle validation failure
          alert(' Please fill in all required fields.');
          return;
        }
      
        try {
          // Send form data to the API endpoint
          const response = await axios.post('http://localhost:7000/api/reportOptions/maintenaceReport', maintenanceFormData);
          console.log('API response:', response.data);
      
          // Update state values after successful form submission
          setDisplayMaintenance(false);
          setIdHolder((prevIdHolder) => !prevIdHolder); // Toggle idHolder, you may need to adjust this logic based on your use case
      
          // Clear the form data or reset it as needed
          setMaintenanceFormData({
            id: '',
            equipmentName: '',
            equipmentType: '',
            department: '',
            Model: '',
            serialNumber: '',
            manufacturer: '',
            reportType: '',
            requestedBy: '',
            location: '',
            maintenanceDescription: '',
            tasksPerformed: '',
            repair: false,
            natureOfBreakage: '',
            replacement: false,
            replacementCost: '',
            replacedSparePart: '',
            complianceWithGuidelines: false,
            verifyFunctionality: false,
            durationInHours: 0,
            majorComplaint: '',
            recommendation: '',
            doneBy: '',
            reportDate: '',
          });
      
        } catch (error) {
          console.error('Error submitting the form:', error);
          // Handle the error, display a message, etc.
        }
      };
      
      const handleFormSubmitCalibration = async () => {
        // Perform form validation
        if (
          !calibrationFormData.manufacturer ||
          !calibrationFormData.serialNumber ||
          !calibrationFormData.location ||
          !calibrationFormData.proceduresDescription||
          !calibrationFormData.calibrationResultsSummary||
          !calibrationFormData.durationInHours

          
          // Add other required fields for validation
        ) {
          // Display an error message or handle validation failure
          alert('Please fill in all required fields.');
          return;
        }
      
        try {
          // Send form data to the API endpoint
          const response = await axios.post('http://localhost:7000/api/reportOptions/calibrationReport', calibrationFormData);
          console.log('API response:', response.data);
      
          // Update state values after successful form submission
          setDisplayCalibration(false);
          setIdHolder((prevIdHolder) => !prevIdHolder); // Toggle idHolder, you may need to adjust this logic based on your use case
      
          // Clear the form data or reset it as needed
          setCalibrationFormData({
            id: '',
            equipmentName: '',
            equipmentType: '',
            department: '',
            Model: '',
            manufacturer: '',
            serialNumber: '',
            reportType: '',
            requestedBy: '',
            location: '',
            visualInspection: false,
            visibleDamageBefore: false,
            partsReplacedOrRepaired: '',
            replacementCost: 0,
            environmentalConditions: false,
            referenceStandards: '',
            proceduresDescription: '',
            complianceWithGuidelines: false,
            adjustmentsMade: false,
            adjustments: '',
            deviationFromStandard: '',
            correctiveAction: '',
            calibrationResultsSummary: '',
            verifyFunctionality: false,
            durationInHours: 0,
            recommendation: '',
            doneBy: '',
            reportDate: '',
          });
      
        } catch (error) {
          console.error('Error submitting the calibration form:', error);
          // Handle the error, display a message, etc.
        }
      };
      
     

      const handleFormSubmitSpecification = async () => {
        // Perform form validation
        if (
          
          !specificationFormData.manufacturer ||
          !specificationFormData.serialNumber ||
          !specificationFormData.purpose||
          !specificationFormData.specificationDetail||
          !specificationFormData.majorComplaint||
          !specificationFormData.durationInHours||
          !specificationFormData.recommendation
        ) {
          // Display an error message or handle validation failure
          alert(' Please fill in all required fields.');
          return;
        }
      
        try {
          // Send form data to the API endpoint
          const response = await axios.post('http://localhost:7000/api/reportOptions/specificationReport', specificationFormData);
          console.log('API response:', response.data);
      
          // Update state values after successful form submission
          setDisplaySpecification(false);
          setIdHolder((prevIdHolder) => !prevIdHolder); // Toggle idHolder, you may need to adjust this logic based on your use case
      
          // Clear the form data or reset it as needed
          setSpecificationFormData({
            id: '',
            equipmentName: '',
            equipmentType: '',
            department: '',
            Model: '',
            serialNumber: '',
            manufacturer: '',
            reportType: '',
            requestedBy: '',
            purpose: '',
            specificationDetail: '',
            durationInHours: 0,
            majorComplaint: '',
            recommendation: '',
            doneBy: '',
            reportDate: '',
          });
      
        } catch (error) {
          console.error('Error submitting the specification form:', error);
          // Handle the error, display a message, etc.
        }
      };
      
      const handleFormSubmitInstallation = async () => {
        // Perform form validation
        if (
         
          !installationFormData.manufacturer ||
          !installationFormData.serialNumber ||
          !installationFormData.location ||
          !installationFormData.recommendation||
          !installationFormData.doneBy||
          !installationFormData.reportDate
          // Add other required fields for validation
        ) {
          // Display an error message or handle validation failure
          alert('Please fill in all required fields.');
          return;
        }
      
        try {
          // Send form data to the API endpoint
          const response = await axios.post('http://localhost:7000/api/reportOptions/installationReport', installationFormData);
          console.log('API response:', response.data);
      
          // Update state values after successful form submission
          setDisplayInstallation(false);
          setIdHolder((prevIdHolder) => !prevIdHolder); // Toggle idHolder, you may need to adjust this logic based on your use case
      
          // Clear the form data or reset it as needed
          setInstallationFormData({
            id: '',
            equipmentName: '',
            equipmentType: '',
            department: '',
            Model: '',
            serialNumber: '',
            manufacturer: '',
            reportType: '',
            requestedBy: '',
            location: '',
            visualInspection: false,
            visibleDamageBefore: false,
            partsReplacedOrRepaired: '',
            replacementCost: 0,
            accessoriesPresent: false,
            modificationsDuringInstallation: false,
            adjustmentsMade: '',
            complianceWithGuidelines: false,
            challengesOrIssuesEncountered: false,
            issuesAddressed: '',
            verifyFunctionality: false,
            safetyStandardsCompliance: false,
            durationInHours: 0,
            recommendation: '',
            doneBy: '',
            reportDate: '',
          });
      
        } catch (error) {
          console.error('Error submitting the installation form:', error);
          // Handle the error, display a message, etc.
        }
      };
      

    const handleRequestType = (e) => {
        setRequestType(e.target.value);
    };


    

  

    useEffect(() => {
        if (!RequestType) {
            defaultRequestList();
        } else if (RequestType) {
            handleGetRequestsByType();
        }
        
    }, [RequestType, idHolder]);

    const defaultRequestList = async () => {
        try {
            console.log(user.id);
            const response = await axios.get(`http://localhost:7000/api/requestOptions/occupation?fullName=${user.name} ${user.lastName}`);
            setHandlerequest(response.data.reverse());
            console.log('received:', response);
            
        } catch (error) {
            console.error('error fetching the request', error);
        }
    }

    const handleGetRequestsByType = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/requestOptions/occupation/getByRequestType?requestType=${RequestType}&fullName=${user.name} ${user.lastName}`);
            setHandlerequest(response.data);
            console.log('received:', response);
        } catch (error) {
            console.error('error fetching the request', error);
        }
    };

    
    const getById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:7000/api/requestOptions/getById?id=${id}`);
            setDetailed(response.data.find(request => request.id === id));
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const getByIdReport = async (id) => {
      try {
          const response = await axios.get(`http://localhost:7000/api/reportOptions/getById?id=${id}`);
          setReportDetail(response.data.find(report => report.id === id));
          console.log('mmm',response.data);
      } catch (error) {
          console.error('Error fetching reports:', error);
      }
  };

    const handleClose = () => {
        setDetailed(null);
    };

    const handleCloseReport = () => {
      setReportDetail(null);
    };
    

    

    return (
        <div className='show-request-body-maintenance'>
            <div className="sort-by-requestType-main-maintenance">
                <div className="home-and-sort-title-maintenance"><EngineerSidebar /><h2>Request</h2></div>
                <div className="select-and-body-maintenance">
                    <select className="sort-by-requestType-input-maintenance" required type='text' value={RequestType} onChange={handleRequestType}>
                        <option value=""> All Requests</option>
                        <option value="calibration">Calibration</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="specification">Specification</option>
                        <option value="installation">Installation</option>
                    </select>
                    <div className="sort-by-requestType-output-maintenance">
                        {handleRequest.map((RequestByType) => (
                            <div className="request-whole-maintenance" key={RequestByType.id}>
                                
                                    <div  onClick={() => getById(RequestByType.id)}>
                                        <div className="header-maintenance">
                                            <strong> {RequestByType.requestType}</strong> <strong> {RequestByType.requestDate} </strong>
                                        </div>
                                       <div className="sort-by-requestType-description-maintenance">
                                        <div className="body-item-maintenance" key={RequestByType}>
                                                {Object.entries(RequestByType).map(([columnName, value]) => {
                                                    if (columnName === 'equipmentName' || columnName === 'department' ) {
                                                        return (
                                                            <div className='department-color-maintenance'>
                                                                 
                                                                {value}
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </div>

                                       </div>
                                        <div className="footer-maintenance">
                                            <strong> Status :</strong>{RequestByType.status}<br/>
                                            <strong> Assigned To:</strong>{RequestByType.action}<br/>
                                            <strong> Requested By:</strong>{RequestByType.requestedBy}<br/>

                                        </div>
                                    </div>
                                    <button
                                        onClick={()=>handleDisplayForm(RequestByType.id)}
                                        className={RequestByType.status === 'Completed' ? 'deleteButton' : 'action-button-maintenance'}
                                    >
                                        Action
                                    </button>
                                    <button
                                        onClick={()=>getByIdReport(RequestByType.id)}
                                        className={RequestByType.status === 'Completed' ? 'viewReportButton-maintenance' : 'deleteButton'}
                                    >
                                        View Report
                                    </button>
                            </div>
                                
                            
                        ))}
                    </div>
                </div>
            </div>
            {detailed && (
                <div className='detailed-view-1-maintenance'>
                    <div className='detail-description-maintenance'>
                        <div className='device-description-maintenance'>
                            
                                {Object.entries(detailed).map(([columnName, value]) => {
                                    if (columnName !== 'id' && columnName !== 'createdAt' && columnName !== 'updatedAt') {
                                        if (value != null) {
                                            const formattedColumnName = columnName.charAt(0).toUpperCase() + columnName.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');

                                            return (
                                                <div className="sort-by-request-maintenance" key={columnName}>
                                                    <div className="columnName-maintenance">{formattedColumnName}</div>
                                                    <div className='columnValue-maintenance'>{value}</div>
                                                </div>
                                            );
                                        }
                                    }
                                    return null;
                                })}
                            </div>
                            <button onClick={handleClose} className='detail-close-button-maintenance'>Close</button>
                        </div>
                    </div>
                
            )}
    {reportDetail && (
                <div className='detailed-view-1-maintenance'>
                    <div className='detail-description-maintenance'>
                        <div className='device-description-maintenance'>
                            
                                {Object.entries(reportDetail).map(([columnName, value]) => {
                                    if (columnName !== 'id' && columnName !== 'createdAt' && columnName !== 'updatedAt') {
                                        if (value != null) {
                                            const formattedColumnName = columnName.charAt(0).toUpperCase() + columnName.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');

                                            return (
                                                <div className="sort-by-request-maintenance" key={columnName}>
                                                    <div className="columnName-maintenance">{formattedColumnName}</div>
                                                    <div className='columnValue-maintenance'>{value}</div>
                                                </div>
                                            );
                                        }
                                    }
                                    return null;
                                })}
                        </div>
                        <button onClick={handleCloseReport} className='detail-close-button-maintenance'>Close</button>
                    </div>
                </div>
            )}


        
{displayMaintenance && (
  <div className="detailed-view-maintenanceReport">
    <div className="detailed-description-maintenanceReport"> 
    <div className="maintenanceReport">
      <label className="maintenance-label">
      <div className='maintenancelabel'>Serial Number</div> 
        <input
          type="text"
          name="serialNumber"
          value={maintenanceFormData.serialNumber}
          onChange={maintenanceHandleChange}
          className="maintenance-input-report"
          required
        />
      </label>

      <label className="maintenance-label">
      <div className='maintenancelabel'>Manufacturer</div> 
        <input
          type="text"
          name="manufacturer"
          value={maintenanceFormData.manufacturer}
          onChange={maintenanceHandleChange}
          className="maintenance-input-report"
          required
        />
      </label>

      <label className="maintenance-label">
      <div className='maintenancelabel'>Location </div>
        <input
          type="text"
          name="location"
          value={maintenanceFormData.location}
          onChange={maintenanceHandleChange}
          className="maintenance-input-report"
          required
        />
      </label>

      <label className="maintenance-label">
      <div className='maintenancelabel'>Brief Description of Maintenance </div>  
        <textarea
          name="maintenanceDescription"
          value={maintenanceFormData.maintenanceDescription}
          onChange={maintenanceHandleChange}
          className="maintenance-textarea"
          required
        />
      </label>

      <label className="maintenance-label">
      <div className='maintenancelabel'>Task performed during Maintenance Work</div> 
        <textarea
          name="tasksPerformed"
          value={maintenanceFormData.tasksPerformed}
          onChange={maintenanceHandleChange}
          className="maintenance-textarea"
          required
        />
      </label>

      <label className="maintenance-label">
      <div className='maintenancelabel'>Any Repair of breakage</div>
        <input
          type="checkbox"
          name="repair"
          checked={maintenanceFormData.repair}
          onChange={maintenanceHandleChange}
          className="maintenance-checkbox"
        />
      </label>

      {maintenanceFormData.repair && (
        <label className="maintenance-label">
          <div className='maintenancelabel'>Nature of breakage</div>
          <textarea
            name="natureOfBreakage"
            value={maintenanceFormData.natureOfBreakage}
            onChange={maintenanceHandleChange}
            className="maintenance-textarea"
          />
        </label>
      )}

      <label className="maintenance-label">
        <div className="maintenancelabel">Any replacement</div>
        <input
          type="checkbox"
          name="replacement"
          checked={maintenanceFormData.replacement}
          onChange={maintenanceHandleChange}
          className="maintenance-checkbox"
        />
      </label>

      {maintenanceFormData.replacement && (
        <div className="maintenance-replacement-section">
          
          <label className="maintenance-label">
            <div className='maintenancelabel'>Replaced spare part</div>
            <textarea
              name="replacedSparePart"
              value={maintenanceFormData.replacedSparePart}
              onChange={maintenanceHandleChange}
              className="maintenance-textarea"
            />
          </label>
          <label className="maintenance-label">
          <div className='maintenancelabel'>Cost of replacement</div>
            <input
              type="number"
              name="replacementCost"
              value={maintenanceFormData.replacementCost}
              onChange={maintenanceHandleChange}
              className="maintenance-input-report"
            />
          </label>
        </div>
      )}

      <label className="maintenance-label">
      <div className='maintenancelabel'>Compliance with Manufacturer's Guidelines and Specifications</div>
        <input
          type="checkbox"
          name="complianceWithGuidelines"
          checked={maintenanceFormData.complianceWithGuidelines}
          onChange={maintenanceHandleChange}
          className="maintenance-checkbox"
        />
      </label>

      <label className="maintenance-label">
      <div className='maintenancelabel'>Verify Functionality</div>
        <input
          type="checkbox"
          name="verifyFunctionality"
          checked={maintenanceFormData.verifyFunctionality}
          onChange={maintenanceHandleChange}
          className="maintenance-checkbox"
        />
      </label>

      <label className="maintenance-label">
      <div className='maintenancelabel'>Duration in Hours</div>
        <input
          type="number"
          name="durationInHours"
          value={maintenanceFormData.durationInHours}
          onChange={maintenanceHandleChange}
          className="maintenance-input-report"
          required
        />
      </label>

      <label className="maintenance-label">
      <div className='maintenancelabel'>Any major complaint found</div>
        <textarea
          name="majorComplaint"
          value={maintenanceFormData.majorComplaint}
          onChange={maintenanceHandleChange}
          className="maintenance-textarea"
        />
      </label>

      <label className="maintenance-label">
      <div className='maintenancelabel'>Recommendation</div>
        <textarea
          name="recommendation"
          value={maintenanceFormData.recommendation}
          onChange={maintenanceHandleChange}
          className="maintenance-textarea"
        />
      </label>

      
    </div>
    <button onClick={handleFormSubmitMaintenance} className="maintenance-submit-button" >Submit</button>
    <button onClick={() => setDisplayMaintenance(false)} className="maintenance-cancel-button">Cancel</button>
    </div>
    </div>
)}


{displayCalibration && (
  <div className="detailed-view-calibrationReport">
  <div className="detailed-description-calibrationReport">
    <div className="calibration-report">
      <label className="calibration-label">
        <div className='calibration-label-text'>Manufacturer</div>
        <input
          type="text"
          name="manufacturer"
          value={calibrationFormData.manufacturer}
          onChange={calibrationHandleChange}
          required
          className="calibration-input-report"
        />
      </label>

      <label className="calibration-label">
        <div className='calibration-label-text'>Serial Number</div>
        <input
          type="text"
          name="serialNumber"
          value={calibrationFormData.serialNumber}
          onChange={calibrationHandleChange}
          required
          className="calibration-input-report"
        />
      </label>

      <label className="calibration-label">
        <div className='calibration-label-text'>Location</div>
        <input
          type="text"
          name="location"
          value={calibrationFormData.location}
          onChange={calibrationHandleChange}
          required
          className="calibration-input-report"
        />
      </label>

      <label className="calibration-label">
        <div className='calibration-label-text'>Visual inspection of the Equipment for any Damage or Wear</div>
        <input
          type="checkbox"
          name="visualInspection"
          checked={calibrationFormData.visualInspection}
          onChange={calibrationHandleChange}
          className="calibration-input-report"
        />
      </label>

      {calibrationFormData.visualInspection && (
        <div className="calibration-visual-inspection-details">
          <label className="calibration-label">
            <div className='calibration-label-text'>Any visible damage before</div>
            <input
              type="checkbox"
              name="visibleDamageBefore"
              checked={calibrationFormData.visibleDamageBefore}
              onChange={calibrationHandleChange}
              className="calibration-input-report"
            />
          </label>

          {calibrationFormData.visibleDamageBefore && (
            <div className="calibration-replacement-details">
              <label className="calibration-label">
                <div className='calibration-label-text'>Parts replaced or repaired</div>
                <input
                  type="text"
                  name="partsReplacedOrRepaired"
                  value={calibrationFormData.partsReplacedOrRepaired}
                  onChange={calibrationHandleChange}
                  className="calibration-input-report"
                />
              </label>

              <label className="calibration-label">
                <div className='calibration-label-text'>Cost of replacement in ETB</div>
                <input
                  type="number"
                  name="replacementCost"
                  value={calibrationFormData.replacementCost}
                  onChange={calibrationHandleChange}
                  className="calibration-input-report"
                />
              </label>
            </div>
          )}
        </div>
      )}
      <label className="calibration-label">
      <div className='calibration-label-text'>Verification of environmental conditions</div>
      <input
        type="checkbox"
        name="environmentalConditions"
        checked={calibrationFormData.environmentalConditions}
        onChange={calibrationHandleChange}
        className="calibration-input-report"
      />
    </label>

    <label className="calibration-label">
    <div className='calibration-label-text'>Reference standards</div>
      <input
        type="text"
        name="referenceStandards"
        value={calibrationFormData.referenceStandards}
        onChange={calibrationHandleChange}
        className="calibration-input-report"
      />
    </label>

    <label className="calibration-label">
    <div className='calibration-label-text'>Detailed description of procedures followed</div>
      <textarea
        name="proceduresDescription"
        value={calibrationFormData.proceduresDescription}
        onChange={calibrationHandleChange}
        className="calibration-input-report"
      />
    </label>

    <label className="calibration-label">
    <div className='calibration-label-text'>Compliance with Manufacturer's Guidelines and Specifications</div>
      <input
        type="checkbox"
        name="complianceWithGuidelines"
        checked={calibrationFormData.complianceWithGuidelines}
        onChange={calibrationHandleChange}
        className="calibration-input-report"
      />
    </label>

    <label className="calibration-label">
    <div className='calibration-label-text'>Any changes or adjustments made to Instrument Settings</div>
      <input
        type="checkbox"
        name="adjustmentsMade"
        checked={calibrationFormData.adjustmentsMade}
        onChange={calibrationHandleChange}
        className="calibration-input-report"
      />
    </label>

    {calibrationFormData.adjustmentsMade && (
      <label className="calibration-label">
        <div className='calibration-label-text'>Adjustments</div>
        <input
          type="text"
          name="adjustments"
          value={calibrationFormData.adjustments}
          onChange={calibrationHandleChange}
          className="calibration-input-report"
        />
      </label>
    )}

    <label className="calibration-label">
    <div className='calibration-label-text'>Deviation from the Reference Standard (if any)</div>
      <input
        type="text"
        name="deviationFromStandard"
        value={calibrationFormData.deviationFromStandard}
        onChange={calibrationHandleChange}
        className="calibration-input-report"
      />
    </label>

    <label className="calibration-label">
    <div className='calibration-label-text'>Corrective Action</div>
      <textarea
        name="correctiveAction"
        value={calibrationFormData.correctiveAction}
        onChange={calibrationHandleChange}
        className="calibration-input-report"
      />
    </label>

    <label className="calibration-label">
    <div className='calibration-label-text'>Summary of Calibration Results</div>
      <textarea
        name="calibrationResultsSummary"
        value={calibrationFormData.calibrationResultsSummary}
        onChange={calibrationHandleChange}
        className="calibration-input-report"
      />
    </label>

    <label className="calibration-label">
    <div className='calibration-label-text'>Verify Functionality</div>
      <input
        type="checkbox"
        name="verifyFunctionality"
        checked={calibrationFormData.verifyFunctionality}
        onChange={calibrationHandleChange}
        className="calibration-input-report"
      />
    </label>

    <label className="calibration-label">
    <div className='calibration-label-text'>Duration in Hours</div>
      <input
        type="number"
        name="durationInHours"
        value={calibrationFormData.durationInHours}
        onChange={calibrationHandleChange}
        className="calibration-input-report"
      />
    </label>
      <label className="calibration-label">
        <div className='calibration-label-text'>Recommendation</div>
        <textarea
          name="recommendation"
          value={calibrationFormData.recommendation}
          onChange={calibrationHandleChange}
          className="calibration-textarea"
        />
      </label>
    </div>
    
        <button onClick={handleFormSubmitCalibration} className="calibration-submit-button">Submit</button>
        <button onClick={() => setDisplayCalibration(false)} className="calibration-cancel-button">Cancel</button>
      
  </div>
  </div>
)}


{displaySpecification &&
  <div className="detailed-view-specificationReport">
    <div className="detailed-description-specificationReport">
      <div className="specification-report">
        <label className="specification-label">
          <div className='specification-label-text'>Serial Number</div>
          <input
            type="text"
            name="serialNumber"
            value={specificationFormData.serialNumber}
            onChange={specificationHandleChange}
            required
            className="specification-input-report"
          />
        </label>

        <label className="specification-label">
          <div className='specification-label-text'>Manufacturer</div>
          <input
            type="text"
            name="manufacturer"
            value={specificationFormData.manufacturer}
            onChange={specificationHandleChange}
            required
            className="specification-input-report"
          />
        </label>

        <label className="specification-label">
          <div className='specification-label-text'>Location</div>
          <input
            type="text"
            name="location"
            value={specificationFormData.location}
            onChange={specificationHandleChange}
            required
            className="specification-input-report"
          />
        </label>

        <label className="specification-label">
          <div className='specification-label-text'>Purpose</div>
          <input
            type="text"
            name="purpose"
            value={specificationFormData.purpose}
            onChange={specificationHandleChange}
            className="specification-input-report"
          />
        </label>

        <label className="specification-label">
          <div className='specification-label-text'>Technical Specification Detail</div>
          <input
            type="text"
            name="specificationDetail"
            value={specificationFormData.specificationDetail}
            onChange={specificationHandleChange}
            className="specification-input-report"
          />
        </label>

        <label className="specification-label">
          <div className='specification-label-text'>Duration in Hours</div>
          <input
            type="number"
            name="durationInHours"
            value={specificationFormData.durationInHours}
            onChange={specificationHandleChange}
            required
            className="specification-input-report"
          />
        </label>

        <label className="specification-label">
          <div className='specification-label-text'>Any major complaint found</div>
          <textarea
            name="majorComplaint"
            value={specificationFormData.majorComplaint}
            onChange={specificationHandleChange}
            className="specification-input-report"
          />
        </label>

        <label className="specification-label">
          <div className='specification-label-text'>Recommendation</div>
          <textarea
            name="recommendation"
            value={specificationFormData.recommendation}
            onChange={specificationHandleChange}
            className="specification-input-report"
          />
        </label>
      </div>
      <button onClick={handleFormSubmitSpecification} className="specification-submit-button">Submit</button>
      <button onClick={() => setDisplaySpecification(false)} className="specification-cancel-button">Cancel</button>
    </div>
  </div>
}


{displayInstallation &&
  <div className="detailed-view-installationReport">
    <div className="detailed-description-installationReport">
      <div className="installation-report">
        <label className="installation-label">
          <div className='installation-label-text'>Manufacturer</div>
          <input
            type="text"
            name="manufacturer"
            value={installationFormData.manufacturer}
            onChange={(e) => installationHandleChange(e)}
            className="installation-input-report"
          />
        </label>

        <label className="installation-label">
          <div className='installation-label-text'>Serial Number</div>
          <input
            type="text"
            name="serialNumber"
            value={installationFormData.serialNumber}
            onChange={(e) => installationHandleChange(e)}
            className="installation-input-report"
          />
        </label>

        <label className="installation-label">
          <div className='installation-label-text'>Location</div>
          <input
            type="text"
            name="location"
            value={installationFormData.location}
            onChange={(e) => installationHandleChange(e)}
            className="installation-input-report"
          />
        </label>

        <label className="installation-label">
          <div className='installation-label-text'>Visual inspection of the Equipment</div>
          <input
            type="checkbox"
            name="visualInspection"
            checked={installationFormData.visualInspection}
            onChange={(e) => installationHandleChange(e)}
            className="installation-input-report"
          />
        </label>

        {installationFormData.visualInspection && (
          <div>
            <label className="installation-label">
              <div className='installation-label-text'>Any Visible Damage Before installation</div>
              <input
                type="checkbox"
                name="visibleDamageBefore"
                checked={installationFormData.visibleDamageBefore}
                onChange={(e) => installationHandleChange(e)}
                className="installation-input-report"
              />
            </label>

            {installationFormData.visibleDamageBefore && (
              <div>
                <label className="installation-label">
                  <div className='installation-label-text'>Parts replaced or repaired</div>
                  <input
                    type="text"
                    name="partsReplacedOrRepaired"
                    value={installationFormData.partsReplacedOrRepaired}
                    onChange={(e) => installationHandleChange(e)}
                    className="installation-input-report"
                  />
                </label>

                <label className="installation-label">
                  <div className='installation-label-text'>Cost of replacement in ETB</div>
                  <input
                    type="number"
                    name="replacementCost"
                    value={installationFormData.replacementCost}
                    onChange={(e) => installationHandleChange(e)}
                    className="installation-input-report"
                  />
                </label>
              </div>
            )}
          </div>
        )}

        <label className="installation-label">
          <div className='installation-label-text'>All Accessories Present</div>
          <input
            type="checkbox"
            name="accessoriesPresent"
            checked={installationFormData.accessoriesPresent}
            onChange={(e) => installationHandleChange(e)}
            className="installation-input-report"
          />
        </label>

        <label className="installation-label">
          <div className='installation-label-text'>Any modification during Installation</div>
          <input
            type="checkbox"
            name="modificationsDuringInstallation"
            checked={installationFormData.modificationsDuringInstallation}
            onChange={(e) => installationHandleChange(e)}
            className="installation-input-report"
          />
        </label>

        {installationFormData.modificationsDuringInstallation && (
          <div>
            <label className="installation-label">
              <div className='installation-label-text'>Adjustment made</div>
              <input
                type="text"
                name="adjustmentsMade"
                value={installationFormData.adjustmentsMade}
                onChange={(e) => installationHandleChange(e)}
                className="installation-input-report"
              />
            </label>
          </div>
        )}

        <label className="installation-label">
          <div className='installation-label-text'>Compliance With Guidelines</div>
          <input
            type="checkbox"
            name="complianceWithGuidelines"
            checked={installationFormData.complianceWithGuidelines}
            onChange={(e) => installationHandleChange(e)}
            className="installation-input-report"
          />
        </label>

        <label className="installation-label">
          <div className='installation-label-text'>Any challenges Or issues encountered</div>
          <input
            type="checkbox"
            name="challengesOrIssuesEncountered"
            checked={installationFormData.challengesOrIssuesEncountered}
            onChange={(e) => installationHandleChange(e)}
            className="installation-input-report"
          />
        </label>

        {installationFormData.challengesOrIssuesEncountered && (
          <div>
            <label className="installation-label">
              <div className='installation-label-text'>Issue addressed</div>
              <input
                type="text"
                name="issuesAddressed"
                value={installationFormData.issuesAddressed}
                onChange={(e) => installationHandleChange(e)}
                className="installation-input-report"
              />
            </label>
          </div>
        )}

        <label className="installation-label">
          <div className='installation-label-text'>Verify Functionality</div>
          <input
            type="checkbox"
            name="verifyFunctionality"
            checked={installationFormData.verifyFunctionality}
            onChange={(e) => installationHandleChange(e)}
            className="installation-input-report"
          />
        </label>

        <label className="installation-label">
          <div className='installation-label-text'>Safety Standards Compliance</div>
          <input
            type="checkbox"
            name="safetyStandardsCompliance"
            checked={installationFormData.safetyStandardsCompliance}
            onChange={(e) => installationHandleChange(e)}
            className="installation-input-report"
          />
        </label>

        <label className="installation-label">
          <div className='installation-label-text'>Duration in Hours</div>
          <input
            type="number"
            name="durationInHours"
            value={installationFormData.durationInHours}
            onChange={(e) => installationHandleChange(e)}
            className="installation-input-report"
          />
        </label>

        <label className="installation-label">
          <div className='installation-label-text'>Recommendation</div>
          <input
            type="text"
            name="recommendation"
            value={installationFormData.recommendation}
            onChange={(e) => installationHandleChange(e)}
            className="installation-input-report"
          />
        </label>
      </div>
      <button type="submit" onClick={handleFormSubmitInstallation} className="installation-submit-button">Submit</button>
      <button onClick={() => setDisplayInstallation(false)} className="installation-cancel-button">Cancel</button>
    </div>
  </div>
}
        </div>
    );
}

export default RequestForEngineer;
