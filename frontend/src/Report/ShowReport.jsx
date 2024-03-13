import axios from "axios";
import React, { useEffect, useState } from "react";
import './ShowReport.css';
import Home from "../pages/Home/Home";
import { useSelector } from 'react-redux';
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const SortByReportType = () => {
    const [reportType, setReportType] = useState('');
    const [handleReport, setHandleReport] = useState([]);
    const { user } = useSelector(state => state.user);
    const [showAllColumns, setShowAllColumns] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    

    useEffect(() => {
        if (!reportType) {
            defaultReportList();
        } else if (reportType) {
            handleGetReportsByType();
        }
    }, [reportType]);

    const defaultReportList = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/reportOptions');
            setHandleReport(response.data.reverse());
            console.log('received:', response);
        } catch (error) {
            console.error('error fetching the report', error);
        }
    }

    const handleGetReportsByType = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/reportOptions/getByReportType?reportType=${reportType}`);
            setHandleReport(response.data);
            console.log('received:', response);
        } catch (error) {
            console.error('error fetching the report', error);
        }
    };

    const handleReportType = (e) => {
        setReportType(e.target.value);
    };

    const formatColumnName = (columnName) => {
        return columnName.replace(/([a-z])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + columnName.slice(1);
    };

    const desiredColumns = ['equipmentName', 'Model', 'department', 'reportType', 'doneBy', 'reportDate', 'replacementCostInETB', 'durationInHours'];

    const handleExportCSV = () => {
        const columnsToExport = showAllColumns ? Object.keys(searchQuery ? filteredReport[0] || {} : handleReport[0] || {}) : desiredColumns;
        const dataToExport = searchQuery ? filteredReport : handleReport;

        const csvData = dataToExport.map((row) => columnsToExport.map((col) => row[col] !== null ? row[col] : 'null'));
        const csvHeaders = columnsToExport.map((col) => formatColumnName(col));
        const csvArray = [csvHeaders, ...csvData];
        const csvContent = csvArray.map((row) => row.join(',')).join('\n');

        const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const csvUrl = URL.createObjectURL(csvBlob);
        const link = document.createElement('a');
        link.href = csvUrl;
        link.setAttribute('download', 'report_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportPDF = () => {
        const pdf = new jsPDF();
        const columnsToExport = showAllColumns ? Object.keys(searchQuery ? filteredReport[0] || {} : handleReport[0] || {}) : desiredColumns;
        const dataToExport = searchQuery ? filteredReport : handleReport;

        const tableData = dataToExport.map((row) =>
            columnsToExport.map((col) => (row[col] !== null ? row[col] : 'null'))
        );

        pdf.autoTable({
            head: [columnsToExport.map(col => formatColumnName(col))],
            body: tableData,
        });

        pdf.save('report_data.pdf');
    };


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredReport = handleReport.filter((report) => {
        const searchString = searchQuery.toLowerCase();
        return Object.values(report).some((value) =>
            value !== null && value.toString().toLowerCase().includes(searchString)
        );
    });
   

    return (
        <div className="sort-by-reportType-main-report">
            <div className="home-and-sort-title-report"><Home /><h2>Report</h2></div>
            <div className="select-and-body-report">
                <select className="sort-by-reportType-input-report" required type='text' value={reportType} onChange={handleReportType}>
                    <option value=""> All Reports</option>
                    <option value="calibration">Calibration</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="specification">Specification</option>
                    <option value="installation">Installation</option>
                </select>
                <div className="sort-by-reportType-output-report">
                    <div className="button-container">
                        <button className="export-btn-csv" onClick={handleExportCSV}>Export to CSV</button>
                        <button className="export-btn-pdf" onClick={handleExportPDF}>Export to PDF</button>
                        <button className="toggle-columns-btn" onClick={() => setShowAllColumns(!showAllColumns)}>
                            {showAllColumns ? 'Show Specific Columns' : 'Show All Columns'}
                        </button>
                       
                    </div>
                    <div className="search-container1">
                        <label className="search-label" htmlFor="searchInput">
                            Search Report
                        </label>
                        <input
                            id="searchInput"
                            className="search-input"
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <table className="report-table-report">
                    <thead>
                        <tr>
                            {showAllColumns ? Object.keys(filteredReport[0] || {}).map((columnName) => (
                                <th key={columnName}>{formatColumnName(columnName)}</th>
                            )) : desiredColumns.map((columnName) => (
                                <th key={columnName}>{formatColumnName(columnName)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReport.map((ReportByType) => (
                            <tr key={ReportByType.id}>
                                {showAllColumns ? Object.keys(filteredReport[0] || {}).map((columnName) => (
                                    <td key={columnName}>{ReportByType[columnName] !== null ? ReportByType[columnName] : 'null'}</td>
                                )) : desiredColumns.map((columnName) => (
                                    <td key={columnName}>{ReportByType[columnName] !== null ? ReportByType[columnName] : 'null'}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default SortByReportType;