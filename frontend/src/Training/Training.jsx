import axios from "axios";
import React, { useEffect, useState } from "react";
import './Training.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { IoSearchSharp } from "react-icons/io5";
import Home from "../pages/Home/Home";


const TrainingManagement = () => {
    const [handleTraining, setHandleTraining] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTraining, setSelectedTraining] = useState(null);
   
    
    

    useEffect(() => {
      fetchInventory();
      defaultTrainingList();
      console.log('the inventory schema',inventory)
  }, []);

  const fetchInventory = async () => {
    try {
        const response = await axios.get('http://localhost:7000/api/contract/inventory');
        setInventory(response.data);
        console.log('inventory data',response.data)
    } catch (error) {
        console.error('Error fetching inventory:', error);
    }
  };
  



const defaultTrainingList = async () => {
  try {
    const response = await axios.get('http://localhost:7000/api/contract/training');
    
    // Reverse the response data array
    const reversedTrainings = response.data.reverse();
    
    // Update state with the formatted data
    setHandleTraining(reversedTrainings);
    console.log('received:',reversedTrainings );
  } catch (error) {
    console.error('error fetching the training', error);
  }
}




    const formatColumnName = (columnName) => {
        return columnName.replace(/([a-z])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + columnName.slice(1);
    };

    const handleExportCSV = () => {
      const dataToExport = searchQuery ? filteredTraining : handleTraining;
  
      // Extract column names
      const columnsToExport = Object.keys(dataToExport[0]);
  
      // Prepare CSV data
      const csvData = dataToExport.map((row) => columnsToExport.map((col) => row[col] !== null ? row[col] : 'null'));
  
      // Prepare CSV headers
      const csvHeaders = columnsToExport.map((col) => formatColumnName(col));
  
      // Combine headers and data
      const csvArray = [csvHeaders, ...csvData];
  
      // Convert CSV array to CSV content
      const csvContent = csvArray.map((row) => row.join(',')).join('\n');
  
      // Create a Blob with CSV content
      const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
      // Create a URL for the Blob
      const csvUrl = URL.createObjectURL(csvBlob);
  
      // Create a link element to trigger download
      const link = document.createElement('a');
      link.href = csvUrl;
      link.setAttribute('download', 'training_data.csv');
  
      // Append link to document and trigger click event
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      document.body.removeChild(link);
  };
  
  const desiredColumns = ['equipmentName', 'model', 'startDate', 'endDate', 'trainingType', 'location'];

  const handleExportPDF = () => {
    const pdf = new jsPDF();
    const dataToExport = searchQuery ? filteredTraining : handleTraining;

    const tableData = dataToExport.map((row) =>
        Object.values(row).map((value) => (value !== null ? value.toString() : 'null'))
    );

    pdf.autoTable({
        head: [Object.keys(dataToExport[0]).map(col => formatColumnName(col))],
        body: tableData,
    });

    pdf.save('training_data.pdf');
};


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDetailClick = (training) => {
        setSelectedTraining(training);
    };

    const filteredTraining = handleTraining.filter((training) => {
        const searchString = searchQuery.toLowerCase();
        return Object.values(training).some((value) =>
            value !== null && value.toString().toLowerCase().includes(searchString)
        );
    });

    const handleClose = () => {
      setSelectedTraining(null);
  };


  return (
    <div className="training-containerr">
      <div className="training-home-and-sort-titlehead">
       <div className="invent"> <Home />
        <h2>Training Management</h2></div>
      </div>
      <div className="training-search-and-export">
        <div className="training-export-buttons">
          <button className="export-btn-csv-training" onClick={handleExportCSV}>Export to CSV</button>
          <button className="export-btn-pdf-training" onClick={handleExportPDF}>Export to PDF</button>
        </div>
        <div className="search-container">
          <IoSearchSharp className="search-icon1" />
          <input
            id="searchInput"
            className="training-search-input"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="training-table-containerrr">
      <table className="main-training-management-table">
                <thead>
                    <tr>
                        <th className="training-management-thead-admin">Training </th>
                        <th className="training-management-thead-admin">Equipment </th>
                        <th className="training-management-thead-admin">Location</th>
                        <th className="training-management-thead-admin">Department</th>
                        <th className="training-management-thead-admin">Length</th>
                        <th className="training-management-thead-admin">Start Date</th>
                        <th className="training-management-thead-admin">End Date</th>
                        <th className="training-management-thead-admin">Training Type</th>
                        <th className="training-management-thead-admin">Training Level</th>
                        <th className="training-management-thead-admin">Details</th>

                    </tr>
                </thead>
                <tbody>
                    {filteredTraining.map((training) => (
                        <tr key={training.id}>
                            <td className="training-management-table-fieldss">{training.trainingName}</td>
                            <td className="training-management-table-fieldss">{training.equipmentName}</td>
                            <td className="training-management-table-fieldss">{training.location}</td>
                            <td className="training-management-table-fieldss">{training.department}</td>
                            <td className="training-management-table-fieldss">{training.length}</td>
                            <td className="training-management-table-fieldss">{new Date(training.startDate).toLocaleString('en-US', {
                                                  year: 'numeric',
                                                  month: '2-digit',
                                                  day: '2-digit',
                                                  hour: '2-digit',
                                                  minute: '2-digit',
                                                  second: '2-digit',
                                                  hour12: true,
                            })}
                            
                            </td>
                            <td className="training-management-table-fieldss">{new Date(training.endDate).toLocaleString('en-US', {
                                                  year: 'numeric',
                                                  month: '2-digit',
                                                  day: '2-digit',
                                                  hour: '2-digit',
                                                  minute: '2-digit',
                                                  second: '2-digit',
                                                  hour12: true,
                            })}
                            
                            
                            
                            </td>
                            <td className="training-management-table-fieldss">{training.trainingType}</td>
                            <td className="training-management-table-fieldss">{training.trainingLevel}</td>
                            <td className="training-management-table-fieldss"><button className="training-detail-button" onClick={() => handleDetailClick(training)}>Detail</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedTraining && (
                <div className='detailed-view-1-Training-detail'>
                    <div className='detail-description-detailed-Training-detail'>
                      <div className="Training-agreement-detail">Training Agreement Detail</div>
                        <div className='device-description-detailed-Training-detail'>
                            
                                {Object.entries(selectedTraining).map(([columnName, value]) => {
                                    if (columnName !== 'id' && columnName !== 'createdAt' && columnName !== 'updatedAt') {
                                        if (value != null) {
                                            const formattedColumnName = columnName.charAt(0).toUpperCase() + columnName.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');


                                                return (
                                                <div className="sort-by-Training-detail" key={columnName}>
                                                    <div className="columnName-Training-detail">{formattedColumnName}</div>
                                                    <div className='columnValue-Training-detail'>{value}</div>
                                                </div>
                                                );
                                        }
                                    }
                                    return null;
                                })}

                                                            
                                           </div>
                                        <button onClick={handleClose} className='detail-close-button-Training-detail'>Close</button>
                                      </div>
                                   </div>
            )}
      </div>
    </div>
  );
      };
  export default TrainingManagement; 